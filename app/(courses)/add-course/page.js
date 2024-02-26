"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import data from "@/app/data";
import CourseForm from "@/components/CourseForm";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

function page() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  return (
    <section className="flex justify-center">
      <div className="container mt-24 pb-10 flex justify-center flex-col items-center">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl lg:text-4xl text-primary font-semibold">
            Add a Course!
          </h1>

          <p className="text-muted-foreground mt-2">
            Add a course on the website, by filling in the below information
          </p>
        </div>
        <div className="max-w-[800px] w-full  mt-6 ">
          <CourseForm />
        </div>
      </div>
    </section>
  );
}

export default page;
