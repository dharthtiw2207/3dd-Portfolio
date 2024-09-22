import React, { useState, Suspense } from "react";
import emailjs from '@emailjs/browser';
import { Canvas } from "@react-three/fiber";
import Fox from "../Models/Fox";
import Loader from "../Components/Loader";
import useAlert from "../hooks/useAlert";
import Alert from "../Components/Alert";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState({ show: false, type: "", text: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading state

    const serviceId = "service_67vep3n";
    const templateId = "template_u39ca6b";
    const publicKey = "LgJvRXiMjHl5kiiTT";

    const templateparams = {
      from_name: name,
      from_email: email,
      to_name: "Siddhartha Tiwari",
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateparams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response);
        setAlert({ show: true, type: "success", text: "Email sent successfully!" });
        setIsLoading(false); // Stop loading state
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setAlert({ show: true, type: "danger", text: "Failed to send email. Please try again." });
        setIsLoading(false); // Stop loading state
      });
  };

  return (
    <section className="relative flex lg:flex-row flex-col max-container bg-gray-900 text-gray-100">
      {alert.show && <Alert type={alert.type} text={alert.text} />} {/* Display Alert */}
      <div className="flex-1 min-w-[50%] flex flex-col p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="head-text text-gray-100">Get in Touch.</h1>

        <form className="w-full flex flex-col gap-7 mt-8" onSubmit={handleSubmit}>
          <label className="text-gray-300 font-semibold">
            Name
            <input
              type="text"
              name="name"
              className="input bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600"
              placeholder="Your Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className="text-gray-300 font-semibold">
            Email
            <input
              type="email"
              name="email"
              className="input bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600"
              placeholder="Your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label className="text-gray-300 font-semibold">
            Your Message
            <textarea
              name="message"
              rows={4}
              className="textarea bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600"
              placeholder="Let me know how I can help you!"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="btn bg-blue-600 text-gray-200 hover:bg-blue-500"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>

      <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.3} />
          <Suspense fallback={<Loader />}>
            <Fox
              position={[0.5, 0.35, 0]}
              rotation={[12.6, -0.9, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
