import { db } from "@/firebase/config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React from "react";
import { BiCalendar, BiStar } from "react-icons/bi";
import { MdMarkEmailRead } from "react-icons/md";
import { PiHandCoins } from "react-icons/pi";
import Link from "next/link";
import { FaPhoneAlt, FaLocationDot } from "react-icons/fa";
import globalData from "@/app/data";
import { Separator } from "@/components/ui/separator";
import { RiUserLocationLine } from "react-icons/ri";
import RegisterForm from "@/components/RegisterForm";
import { currentUser } from "@clerk/nextjs";
import { BsFillClockFill } from "react-icons/bs";
import Marquee from "react-fast-marquee";
import SpecialEventTestimonialCard from "@/components/SpecialEventTestimonialCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


async function Course({ params }) {
  const user = await currentUser();
  let courseData;
  try {
    const courseRef = doc(db, "courses", params.id);
    const resp = await getDoc(courseRef);
    courseData = resp.data();
    courseData = { ...courseData, id: resp.id };
    console.log(courseData);
  } catch (err) {
    console.error(err);
  }

  function reverseDateFormat(dateString) {
    if (!dateString) return "Anytime"; // Return "Anytime" if dateString is empty or undefined

    const parts = dateString.split("-"); // Split the date string by "-"
    const reversedDate = parts.reverse().join("-"); // Reverse the order of parts and join them with "-"

    return reversedDate;
  }

  async function getAllRatings() {
    try {
      const ref = query(
        collection(db, "course-ratings"),
        where("courseId", "==", params.id)
      );
      const snapshot = await getDocs(ref);
      let data = [];
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
      return data;
    } catch (err) {
      console.error("Error fetching ratings:", err);
      return [];
    }
  }

  async function calculateAverageRating() {
    const data = await getAllRatings();
    if (data && data?.length === 0) {
      return null;
    }

    let sum = 0;
    data.forEach((doc) => {
      sum += doc?.rating;
    });
    return [sum / data.length, data.length];
  }

  const averageRating = await calculateAverageRating();

  async function getTestimonials() {
    const ref = query(
      collection(db, "course-testimonials"),
      where("courseId", "==", params.id)
    );
    let data = [];
    try {
      const snapshot = await getDocs(ref);
      snapshot.forEach((doc) => {
        data.push(doc.data());
      });
    } catch (err) {
      console.error("Error fetching testimonials" + err);
    }

    return data;
  }

  const testimonailsData = await getTestimonials();
  // console.log(testimonailsData);

  return (
    <>
      <section className="flex flex-wrap container gap-10 mt-12 py-10 justify-center xl:justify-between relative">
        <div className="max-w-[650px] w-full">
          {/* <div className="w-full h-[100px] rounded-md">
            <img
              src={`https://source.unsplash.com/random/?nature`}
              alt="unsplash_image_for_this_event"
              className="w-full h-full object-cover rounded-md bg-muted"
            />
          </div> */}

          <div className="mt-4">
            {courseData?.link && (
              <iframe
                src={courseData?.link}
                controls
                autoPlay
                className="rounded-lg w-full mb-10 aspect-video"
              />
            )}
            <h1 className="text-2xl font-semibold">{courseData?.name}</h1>
            <div className="flex items-center justify-between mt-4">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <RiUserLocationLine />

                  <span className="text-muted-foreground text-sm">
                    {courseData?.venue}
                  </span>
                </div>

                {averageRating ? (
                  <div className="flex gap-2 items-center">
                    <BiStar />
                    <span className="text-muted-foreground text-sm">
                      {averageRating[0]} / 5 ({averageRating[1]})
                    </span>
                  </div>
                ) : (
                  <div className="flex gap-2 items-center">
                    <BiStar />
                    <span className="text-muted-foreground text-sm">
                      {"Premium Course"}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <PiHandCoins />

                  <span className="text-muted-foreground text-sm">
                    Rs {courseData?.fees} /-
                  </span>
                </div>

                <div className="flex gap-2 items-center">
                  <BsFillClockFill />

                  <span className="text-muted-foreground text-sm">
                    {courseData?.expiry
                      ? courseData.expiry + " days"
                      : "Lifetime"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">About the event</h1>
            <p className="text-muted-foreground mt-2 whitespace-pre-wrap">
              {courseData?.description}
            </p>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">
              Batches ({courseData.batches && courseData?.batches.length})
            </h1>
            {courseData.batches &&
              courseData?.batches.map((date, index) => (
                <p
                  key={date}
                  className="text-muted-foreground mt-2 whitespace-pre-wrap"
                >
                  {"Batch " +
                    +(index + 1) +
                    " : " +
                    reverseDateFormat(date?.date) +
                    ", " +
                    date?.time}
                </p>
              ))}
            <p className="mt-2 text-sm text-muted-foreground">
              *each class will be for {courseData?.timeOfEachClass} hours
            </p>
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">Rewards</h1>
            <p className="text-muted-foreground mt-2 whitespace-pre-wrap">
              {courseData?.prizes}
            </p>
          </div>

          <div className={`mt-8 ${courseData?.faqs.length ? "" : "hidden"}`}>
            <h1 className="text-xl font-semibold">FAQs</h1> 
          {courseData && courseData?.faqs?.map((faq) => <Accordion key={faq.question} type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>{faq?.question}</AccordionTrigger>
              <AccordionContent>
                {faq?.answer}
              </AccordionContent>
            </AccordionItem>
          </Accordion>)}
          </div>

          <div className="mt-8">
            <h1 className="text-xl font-semibold">Contact</h1>
            <div className="mt-2 flex gap-2 items-center flex-wrap">
              <p>{globalData?.contactPerson} Phone</p> -
              {globalData?.contactPhone.map((contact) => (
                <Link
                  href={`tel:${contact}`}
                  className="flex items-center gap-2 text-muted-foreground hover:underline underline-offset-4"
                >
                  <FaPhoneAlt />
                  <span>{contact}</span>
                </Link>
              ))}
            </div>

            <div className="mt-2 flex gap-2 items-center">
              <p>{globalData?.contactPerson} Email</p> -
              <Link
                href={`mailto:${globalData?.contactEmail}`}
                className="flex items-center gap-2 text-muted-foreground hover:underline underline-offset-4"
              >
                <MdMarkEmailRead />
                <span>{globalData?.contactEmail}</span>
              </Link>
            </div>

            <div className="w-full mt-10">
              <img
                src={`${courseData?.image}`}
                alt={`${courseData?.name}`}
                className=" object-cover rounded-md bg-muted"
              />
            </div>

            {/* {courseData?.link && (
              <div className="mt-2 flex gap-2 items-center">
                <HeroDialog videoUrl={courseData?.link} />
              </div>
            )} */}
          </div>

          {/* <div className="mt-8 w-full">
            <img
              src={`${courseData?.image}`}
              alt={`${courseData?.name}`}
              className=" object-cover rounded-md bg-muted"
            />
          </div> */}
        </div>

        <div
          className={`max-w-[600px] xl:sticky ${
            user ? "max-h-[850px] sm:max-h-[650px]" : "max-h-[400px]"
          } top-24 right-0 flex flex-col w-full bg-card p-8 py-10 rounded-md border md:overflow-auto`}
        >
          <h1 className="text-3xl font-semibold text-center">
            <span className="text-primary">Register</span> for{" "}
            {courseData?.name}!
          </h1>

          <p className="text-center text-muted-foreground mt-2">
            {globalData?.registerDescription}
          </p>

          <div className="mt-6 pr-4">
            <RegisterForm data={courseData} />
          </div>
        </div>
      </section>

      <Separator className="mt-4" />

      <div className="mt-10">
        <h4 className="text-4xl font-bold text-primary text-center">
          Testimonials
        </h4>
        <p className="mt-2 text-center">
          Here's what others who have taken this course say!
        </p>
      </div>
      <div className="mt-10 w-full flex flex-col gap-6 items-center justify-center overflow-hidden mb-10">
        {testimonailsData.length > 0 ? (
          <>
            <Marquee
              gradient={false}
              speed={50}
              className="flex gap-10 w-full"
              direction="left"
              pauseOnHover
            >
              <div className="flex gap-6">
                {testimonailsData
                  .slice(0, testimonailsData / 2)
                  .map((testimonial, index) => (
                    <SpecialEventTestimonialCard
                      key={index}
                      {...testimonial}
                      name={testimonial?.username}
                      image={testimonial?.imageUrl}
                      date={testimonial?.timestamp}
                    />
                  ))}
              </div>
              <div className="flex gap-6">
                {testimonailsData
                  .slice(0, testimonailsData.length / 2)
                  .map((testimonial, index) => (
                    <SpecialEventTestimonialCard
                      key={index}
                      {...testimonial}
                      name={testimonial?.username}
                      image={testimonial?.imageUrl}
                      date={testimonial?.timestamp}
                    />
                  ))}
              </div>
              <div className="flex gap-6">
                {testimonailsData
                  .slice(0, testimonailsData.length / 2)
                  .map((testimonial, index) => (
                    <SpecialEventTestimonialCard
                      key={index}
                      {...testimonial}
                      name={testimonial?.username}
                      image={testimonial?.imageUrl}
                      date={testimonial?.timestamp}
                    />
                  ))}
              </div>
            </Marquee>

            <Marquee
              gradient={false}
              speed={50}
              className="flex gap-10 w-full"
              direction="right"
              pauseOnHover
            >
              <div className="flex gap-6">
                {testimonailsData
                  .slice(testimonailsData.length / 2)
                  .map((testimonial, index) => (
                    <SpecialEventTestimonialCard
                      key={index}
                      {...testimonial}
                      name={testimonial?.username}
                      image={testimonial?.imageUrl}
                      date={testimonial?.timestamp}
                    />
                  ))}
              </div>
              <div className="flex gap-6">
                {testimonailsData
                  .slice(testimonailsData.length / 2)
                  .map((testimonial, index) => (
                    <SpecialEventTestimonialCard
                      key={index}
                      {...testimonial}
                      name={testimonial?.username}
                      image={testimonial?.imageUrl}
                      date={testimonial?.timestamp}
                    />
                  ))}
              </div>
            </Marquee>
          </>
        ) : (
          <p className="border rounded-lg p-2">
            We are collecting user testimonials, they shall be here soon!
          </p>
        )}
      </div>

      <Separator className="my-4" />
    </>
  );
}

export default Course;
