import React from "react";
import ContactUsForm from "../ContactUsPage/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto ">
      <h1 className="text-center bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent">Get in Touch</h1>
      <p className="text-center text-richblack-500 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="mt-12 mx-auto border border-richblack-900 p-5 rounded-lg bg-white">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactFormSection;
