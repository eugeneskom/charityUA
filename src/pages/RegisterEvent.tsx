import React, { SyntheticEvent, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validEmailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

function RegisterEvent() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  console.log("formData", formData);

  const validate = () => {
    let errors: any = {};

    if (!formData.firstName) {
      // errors.firstName = "First name required";
      setErrors((prev) => ({ ...prev, firstName: "First name required" }));
    }

    if (!formData.lastName) {
      setErrors((prev) => ({ ...prev, lastName: "Last name required" }));

      // errors.lastName = "Last name required";
    }

    // Email validation
    if (!validEmailRegex.test(formData.email)) {
      // errors.email = "Invalid email";
      setErrors((prev) => ({ ...prev, email: "Invalid email" }));
    }

    // Password validation
    if (formData.password.length < 8) {
      // errors.password = "Password must be at least 8 characters";
      setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters" }));
    }

    if (formData.password !== formData.confirmPassword) {
      // errors.confirmPassword = "Passwords do not match";
      setErrors((prev) => ({ ...prev, confirmPassword: "Passwords do not match" }));
    }

    return errors;
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    console.log("formData", formData);
    // If no errors, submit form
    // submitRegistration(formData);
    //  STARTED WORKING ON REGISTRATION PROCESS, NEED TO LEARN HOW TO USE JWT FOR WORDPRESS,
    // BEFORE REGISTRATION FOR THE EVENT, NEED TO EATHER VALIDATE THE TOKEN OR TO SEND EMAIL
    // WITH LINK TO GET TOKEN CONFIRMATION

    const resp = await axios.post("http://charity-ua.eugeneskom.com/?rest_route=/simple-jwt-login/v1/users&email=eugeawneskom@gmail.com&password=NEW_USER_PASSWORD");

    console.log(resp.data, 'response_login_auth')
    // const response = await axios.post("/wp-json/wp/v2/users", {
    //   username: formData.firstName + " " + formData.lastName,
    //   password: formData.password,
    //   email: formData.email,
    //   // other details
    // });

    // console.log("response", response.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <main className="max-w-5xl mx-auto my-8 px-6">
      <Breadcrumbs currentPage="Registration" />
      <section className="bg-white p-8 rounded shadow-md">
        <h2 className="text-lg font-medium mb-6">Register to Attend</h2>

        <div>
          <form className="bg-white p-6 rounded-lg shadow-md max-w-lg" onSubmit={handleSubmit}>
            <h2 className="text-lg font-medium mb-4">Attendee Registration</h2>

            <div className="mb-4">
              {errors.firstName ? <p className="error text-red-500">{errors.firstName}</p> : ""}
              <label className="block text-gray-700 font-medium mb-2">First Name</label>
              <input className="border p-2 w-full rounded-lg" onChange={handleChange} type="text" name="firstName" />
            </div>

            <div className="mb-4">
              {errors.lastName ? <p className="error text-red-500">{errors.lastName}</p> : ""}
              <label className="block text-gray-700 font-medium mb-2">Last Name</label>
              <input className="border p-2 w-full rounded-lg" onChange={handleChange} type="text" name="lastName" />
            </div>

            <div className="mb-4">
              {errors.email ? <p className="error text-red-500">{errors.email}</p> : ""}
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input className="border p-2 w-full rounded-lg" onChange={handleChange} type="email" name="email" />
            </div>

            <div className="mb-4">
              {errors.password ? <p className="error text-red-500">{errors.password}</p> : ""}
              <label className="block text-gray-700 font-medium mb-2">Password</label>
              <input className="border p-2 w-full rounded-lg" onChange={handleChange} type="password" />
            </div>

            <div className="mb-6">
              {errors.confirmPassword ? <p className="error text-red-500">{errors.confirmPassword}</p> : ""}
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input className="border p-2 w-full rounded-lg" onChange={handleChange} type="password" name="confirmPassword" />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Register
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default RegisterEvent;
