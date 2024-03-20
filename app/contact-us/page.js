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

const page = () => {
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
    addDoc(userCollection, {
      name: user.fullName ?? "Not Provided",
      email: user.emailAddresses[0].emailAddress,
      message: formData.message,
      timestamp: Date.now(),
      phone: user?.phoneNumbers[0]?.phoneNumber ?? "Not provided",
    });
    setisSubmit(
      "We recieved your message and will get back to you on the provided email soon!"
    );
    setFormData({
      message: "",
    });
    // console.log('Form Data:', formData);
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
      <section className="text-gray-600 body-font relative min-h-screen">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4389.3471894774875!2d77.58387051434795!3d12.975611486485349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1672fcfc6af1%3A0x9c2dc517c9231979!2sUVCE!5e0!3m2!1sen!2sin!4v1702567242179"
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
                  disabled={true}
                  value={user.fullName}
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
                  disabled={true}
                  value={user.emailAddresses[0].emailAddress}
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
                <a
                  className="text-xl"
                  target="_blank"
                  href="https://www.instagram.com/ecelluvce/"
                >
                  <FaInstagram color="orange" />
                </a>
              </h2>
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href="https://www.linkedin.com/company/entrepreneurship-cell-uvce/mycompany/"
                >
                  <FaLinkedin color="orange" />
                </a>
              </h2>
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href="mailto:entrepreneurshipcelluvce@gmail.com"
                >
                  <FaEnvelope color="orange" />
                </a>
              </h2>
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href="tel:+91 98862 25685"
                >
                  <FaPhone color="orange" />
                </a>
              </h2>
              <h2>
                <a
                  className="text-xl"
                  target="_blank"
                  href="https://maps.app.goo.gl/wRGxbWbLiGFSjSH9A"
                >
                  <FaMapPin color="orange" />
                </a>
              </h2>
            </div>
          </div>
        </div>
      </section>
      <Separator />
    </main>
  );
};

export default page;
