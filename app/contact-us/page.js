"use client";
import { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
import { Separator } from "@/components/ui/separator";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaInstagram,
  FaMapPin,
} from "react-icons/fa";
import Loader from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea";
import data from "@/app/data";
import Link from "next/link";
import Head from "next/head";

const page = () => {
  console.log(data);
  const isDarkMode = true;
  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmit, setisSubmit] = useState("");

  const userCollection = collection(db, "contact-us");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addDoc(userCollection, {
        name: user?.fullName ?? formData.name,
        email: user?.emailAddresses[0]?.emailAddress ?? formData?.email,
        message: formData.message ?? "Not Provided",
        timestamp: Date.now(),
        phone: user?.phoneNumbers[0]?.phoneNumber ?? formData?.phone,
      });
    } catch (err) {
      console.error(err);
    }
    setisSubmit(
      "We recieved your message and will get back to you on the provided phone number and email soon!"
    );
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[100vh] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <main>
      <Head>
        <title>Contact Us</title>
        <meta
          name="description"
          content="Contact Upasana Foundation using our phone number, Email or connect with us on socials like facebook and instagram.
          "
        />
        <meta
          name="keywords"
          content="Indian Mystic, Kundalini Yogi, Spiritual Master, About Sadhguru Shri, Sadhana, Spiritual experience, Shri Upasaka, Upasana foundation, Volunteering, Contact Upasana Foundation"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="upasana foundation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <section className="text-gray-600 body-font relative min-h-screen">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d495352.6655755481!2d77.30323535133468!3d12.954225594601922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka%2C%20India!5e0!3m2!1sen!2sus!4v1711039720290!5m2!1sen!2sus"
            loading="lazy"
            style={{
              filter: isDarkMode
                ? "invert(90%) grayscale(100%)"
                : "grayscale(100%)",
            }}
          ></iframe>
        </div>
        <div className="container px-5 py-24 mx-auto flex">
          <div className=" lg:w-1/3 md:w-1/2 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-9 shadow-md backdrop-filter backdrop-blur-lg bg-primary/20 bg-opacity-30 rounded-lg p-6 mt-10 shadow-inner border-2 dark:text-white">
            <h2 className="text-2xl text-primary font-bold mb-4">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block  text-white-700 text-sm font-bold mb-2"
                >
                  Name:
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  onChange={handleChange}
                  autoComplete="off"
                  disabled={user?.fullName ? true : false}
                  value={user?.fullName ?? null}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white-700 text-sm font-bold mb-2"
                >
                  Email:
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  autoComplete="off"
                  disabled={user?.fullName ? true : false}
                  value={user?.emailAddresses[0].emailAddress ?? null}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-white-700 text-sm font-bold mb-2"
                >
                  Phone:
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  onChange={handleChange}
                  autoComplete="off"
                  disabled={user?.phoneNumbers[0]?.phoneNumber ? true : false}
                  value={user?.phoneNumbers[0]?.phoneNumber ?? null}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-white-700 text-sm font-bold mb-2"
                >
                  Message:
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                ></Textarea>
              </div>
              <p className="">{isSubmit}</p>
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary text-black py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
              </div>
            </form>
            <br />
            <Separator />
            <br />
            <div className="flex items-center justify-evenly">
              <h2>
                <Link
                  className="text-xl"
                  target="_blank"
                  href={data?.instagram || ""}
                >
                  <FaInstagram color="orange" />
                </Link>
              </h2>
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href={data?.linkedin || ""}
                >
                  <FaLinkedin color="orange" />
                </a>
              </h2>
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href={"mailto:" + data?.contactEmail || ""}
                >
                  <FaEnvelope color="orange" />
                </a>
              </h2>
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href={"tel:" + data?.contactPhone[0] || ""}
                >
                  <FaPhone color="orange" />
                </a>
              </h2>
              {/* <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href="https://maps.app.goo.gl/wRGxbWbLiGFSjSH9A"
                >
                  <FaMapPin color="orange" />
                </a>
              </h2> */}
            </div>
          </div>
        </div>
      </section>
      <Separator />
    </main>
  );
};

export default page;
