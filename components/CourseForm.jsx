// Import necessary libraries and components
"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { BsCheck2Circle } from "react-icons/bs";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/firebase/config";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase/config";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Loader from "./Loader";
import { Toast } from "./ui/toast";
import { Toaster } from "./ui/toaster";
import { useTheme } from "next-themes";
import { useToast } from "./ui/use-toast";

// Helper function to get file extension
function getFileExtension(fileName) {
  return fileName.split(".").pop().toLowerCase();
}

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters."),
  //   date: z
  //     .string()
  //     .refine(
  //       (dateString) => {
  //         // Validate the date format (DD-MM-YYYY)
  //         const dateRegex = /^(0[1-9]|[1-2][0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/;
  //         return dateRegex.test(dateString);
  //       },
  //       { message: "Please enter a date in DD-MM-YYYY format." }
  //     )
  //     .refine(
  //       (dateString) => {
  //         // Attempt to parse the string into a Date object
  //         const [day, month, year] = dateString.split("-").map(Number);
  //         const parsedDate = new Date(year, month - 1, day);

  //         // Check if the parsing was successful and the result is a valid Date object
  //         return !isNaN(parsedDate.getTime());
  //       },
  //       { message: "Please enter a valid date." }
  //     )
  //     .refine(
  //       (dateString) => {
  //         // Ensure the parsed date is not in the past (optional, adjust as needed)
  //         const [day, month, year] = dateString.split("-").map(Number);
  //         const parsedDate = new Date(year, month - 1, day);
  //         const currentDate = new Date();
  //         parsedDate.setHours(23, 59, 59, 999);

  //         console.log("Parsed Date:", parsedDate);
  //         console.log("Current Date:", currentDate);

  //         return parsedDate >= currentDate;
  //       },
  //       { message: "Please enter a future date." }
  //     ),
  venue: z.string().min(2, "Please enter a valid venue."),
  email: z.string().email("Please enter a valid contact email."),
  fees: z.coerce.number().min(0, "Please enter a valid course fees."),
  image: z
    .unknown()
    .refine(
      (file) => {
        // Check if the file is nullable
        if (file === null || file === undefined) {
          return true;
        }

        // Check if the file is an instance of File
        if (!(file instanceof File)) {
          return false;
        }

        // Additional validation logic for the file types
        const allowedExtensions = ["png", "jpg", "jpeg", "mp4"];
        const fileExtension = getFileExtension(file.name);

        return allowedExtensions.includes(fileExtension);
      },
      {
        message:
          "Please upload a valid image file (png, jpg, jpeg) or video file (mp4).",
      }
    )
    .nullable(),
  link: z.string().optional(),
  prizes: z.string().min(2, "Please enter a valid prize."),
  category: z.string().min(2, "Please enter a valid category."),
  startDate: z.string().optional(),
  time: z.string().optional(),
  timeOfEachClass: z.string().optional(),
  expiry: z.coerce.number().min(1, "course duration must more than be 1day"),
  batches: z.array(
    z.object({
      date: z.string().optional(),
      time: z.string().optional(),
    })
  ),
  musicCost: z.coerce
    .number()
    .min(1, "music cost after free access cannot be unfilled"),
  musicFreeDuration: z.coerce
    .number()
    .min(
      1,
      "free music duration after the user has taken the course (in months)"
    ),
});

// Function to handle Firestore operation
async function addMessageToFirestore({ formData }) {
  const timestamp = new Date().getTime();

  try {
    const imageFile = formData.image;

    if (imageFile.size === 0) {
      console.warn("File size is 0 bytes. Skipping upload.");
      return false;
    }

    const storageRef = ref(storage, `courses/${imageFile.name}_${timestamp}`);

    try {
      await uploadBytes(storageRef, imageFile);
    } catch (uploadError) {
      console.error("Error uploading to Storage:", uploadError);
      throw uploadError;
    }

    let downloadURL;
    try {
      downloadURL = await getDownloadURL(storageRef);
    } catch (downloadError) {
      console.error("Error getting Download URL:", downloadError);
      throw downloadError;
    }

    const docData = {
      ...formData,
      timestamp: Date.now(),
      image: downloadURL,
    };

    docData.batches = formData.batches;

    const collectionRef = collection(db, "courses");
    const docRef = await addDoc(collectionRef, docData);

    return true;
  } catch (error) {
    console.error("Error in Firestore operation:", error);
    return false;
  }
}

// Main component for the form
export default function CourseForm({ edit, courseData }) {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      venue: "",
      fees: 0,
      image: null,
      link: "",
      prizes: "",
      category: "course",
      startDate: "",
      time: "",
      timeOfEachClass: "",
      batches: [],
      musicCost: null,
      musicFreeDuration: null,
    },
  });

  // Function to handle form submission
  async function onSubmit(values) {
    console.log("Form Values:", values); // Log form values

    setSubmitting(true);

    try {
      const isDocAdded = await addMessageToFirestore({ formData: values });

      if (isDocAdded) {
        setSubmitted(true);
        // reset the form after successful submission
        form.reset();
      } else {
        setSubmitted(false);
      }
    } catch (error) {
      console.error(error);
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  }

  let editData;

  async function getCourseData() {
    const courseRef = doc(db, "courses", courseData.id);
    const resp = await getDoc(courseRef);
    const respData = { ...resp.data(), id: resp.id };
    return respData;
  }

  const handleEdit = async () => {
    setSubmitting(true);
    try {
      const { id, ...editValues } = form.getValues(); // Get form values excluding 'id'
      const isDocEdited = await editCourseInFirestore({
        id,
        formData: editValues,
      });

      if (isDocEdited) {
        // reset the form after successful submission
      } else {
        setSubmitted(false);
      }
      toast({
        title: "Course Updated",
        description: "Course has been updated successfully",
      });
    } catch (error) {
      console.error(error);
      setSubmitted(false);
      toast({
        title: "Course Updation Failed",
        description: error.message,
      });
    } finally {
      setSubmitting(false);
    }
  };

  async function editCourseInFirestore({ id, formData }) {
    try {
      const imageFile = formData.image;

      if (imageFile && imageFile.size === 0) {
        console.warn("File size is 0 bytes. Skipping upload.");
      }

      const timestamp = new Date().getTime();
      const storageRef = ref(storage, `courses/${imageFile.name}_${timestamp}`);

      let downloadURL;
      if (imageFile.name) {
        // If a new image file is provided, upload it to storage
        await uploadBytes(storageRef, imageFile);
        downloadURL = await getDownloadURL(storageRef);
      }

      const updatedData = {
        ...formData,
        // Use the new image URL if available, otherwise keep the existing one
        image: downloadURL || courseData.image,
      };

      // Update batches data in the document
      updatedData.batches = formData.batches || null;

      const courseRef = doc(db, "courses", id);
      await setDoc(courseRef, updatedData, { merge: true });

      return true;
    } catch (error) {
      console.error("Error updating document in Firestore:", error);
      return false;
    }
  }

  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (edit) {
        const data = await getCourseData();
        form.reset(data); // Reset the form with the new data
      }
    };

    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [edit]);

  // Render UI based on form state
  if (submitted) {
    return (
      <div className="text-center h-[45vh] mt-20 mb-12 gap-4 flex flex-col justify-center items-center">
        <BsCheck2Circle size={50} />
        <div className="p-2 rounded-md border">
          <p className="text-center">
            Thanks for filling the form. This course is now live!
          </p>
        </div>
        <div>
          <Button
            variant="secondary"
            onClick={() => {
              form.reset();
              setSubmitted(false);
            }}
          >
            Add another event
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title*</FormLabel>
              <FormControl>
                <Input
                  value={editData?.name}
                  placeholder="Course Title"
                  {...field}
                />
              </FormControl>
              <FormDescription>Keep it innovative and short.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Email"
                  value={editData?.email}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This would be the contact email for this event.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description*</FormLabel>
              <FormControl>
                <Textarea
                  value={editData?.description}
                  placeholder="..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This would be shown on the event card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="prizes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rewards*</FormLabel>
              <FormControl>
                <Textarea
                  value={editData?.prizes}
                  placeholder="what is to be won?"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This would appreciate the participants.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date*</FormLabel>
              <FormControl>
                <Input
                  placeholder="DD-MM-YYYY"
                  onChange={(e) => {
                    const inputDate = new Date(e.target.value);
                    const isValidDate = !isNaN(inputDate.getTime());
                    field.onChange(isValidDate ? inputDate : null);
                  }}
                  {...field}
                />
              </FormControl>
              <FormDescription>The date of the event!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="fees"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fees*</FormLabel>
              <FormControl>
                <Input
                  placeholder="in INR"
                  type="number"
                  value={editData?.fees}
                  {...field}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormDescription>
                The course fees per person, 0 for free.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="venue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Venue*</FormLabel>
              <FormControl>
                <Input
                  value={editData?.venue}
                  placeholder="Senete Hall, UVCE"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The venue if the event is offline, else online.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          onClick={() => {
            form.setValue("batches", [
              ...form.getValues().batches,
              { date: "", time: "" },
            ]);
          }}
        >
          Add Batch
        </Button>

        {form.getValues().batches &&
          form.getValues().batches.map((batch, index) => (
            <div key={index}>
              <FormField
                control={form.control}
                name={`batches[${index}].date`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Batch ${index + 1} Date*`}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`batches[${index}].time`}
                render={({ field }) => (
                  <FormItem className="mt-2">
                    <FormLabel>{`Batch ${index + 1} Time*`}</FormLabel>
                    <FormControl>
                      <Input type="time" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ))}

        {/* <FormField
          control={form.control}
          name="startDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date*</FormLabel>
              <FormControl>
                <Input
                  type={"date"}
                  value={editData?.startDate}
                  placeholder="Senete Hall, UVCE"
                  {...field}
                />
              </FormControl>
              <FormDescription>The start Date for this course.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time*</FormLabel>
              <FormControl>
                <Input
                  type={"time"}
                  value={editData?.time}
                  placeholder="Location / platform"
                  {...field}
                />
              </FormControl>
              <FormDescription>The time for this course.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          name="timeOfEachClass"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time of Each class*</FormLabel>
              <FormControl>
                <Input
                  type={"number"}
                  value={editData?.time}
                  placeholder="Duration of each class in hrs"
                  {...field}
                />
              </FormControl>
              <FormDescription>The duration of each class.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Duration*</FormLabel>
              <FormControl>
                <Input value={editData?.expiry} placeholder="10" {...field} />
              </FormControl>
              <FormDescription>
                The duration of the course in days.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="musicCost"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Music Cost*</FormLabel>
              <FormControl>
                <Input
                  value={editData?.musicCost}
                  placeholder="100"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The cost of music after free duration (in INR)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="musicFreeDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Free music duration*</FormLabel>
              <FormControl>
                <Input
                  value={editData?.musicFreeDuration}
                  placeholder="120"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Free music duration after taking a course (in days)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image*</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  onChange={(e) => {
                    // Ensure that there are files present in the event
                    if (e.target.files && e.target.files.length > 0) {
                      // Use setValue instead of field.onChange
                      form.setValue("image", e.target.files[0]);
                    }
                  }}
                />
              </FormControl>
              <FormDescription>
                {edit
                  ? "Upload an image to replace exisiting."
                  : "Upload a thumbnail for this course."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category*</FormLabel>
              <FormControl>
                <Input
                  value={editData?.course}
                  placeholder="Shibhir"
                  {...field}
                />
              </FormControl>
              <FormDescription>Category this course belong to</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input
                  value={editData?.link}
                  placeholder="https://someimportantlink.com"
                  {...field}
                />
              </FormControl>
              <FormDescription>Some important Link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {edit ? (
          <Button onClick={handleEdit} disabled={submitting}>
            {submitting ? "Editing..." : "Edit this Course Details"}
          </Button>
        ) : (
          <Button type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add this Course"}
          </Button>
        )}
      </form>
    </Form>
  );
}
