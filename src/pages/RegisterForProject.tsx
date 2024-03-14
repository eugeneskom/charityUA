import React, { SyntheticEvent, useState } from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import axios from "axios";
import { websiteURL } from "../config";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validEmailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

interface RegisterForProjectProps {
  jwtToken: string | null;
}
function RegisterForProject({ jwtToken }: RegisterForProjectProps) {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const [authStatus, setAuthStatus] = useState("register");

  const [registeringLoading, setRegisteringLoading] = useState(false);

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

  const registerUser = async (userData: FormData) => {
    try {
      const { email, password } = userData;
      const url = "http://charity-ua.eugeneskom.com/?rest_route=/simple-jwt-login/v1/users";
      const payload = { ...userData, event_id: id };

      const response = await axios.post(url, payload);
      console.log("registerUser", response, response.data);
      const { data } = response;
      if (data.success) {
        loginUser(email, password);
      } else {
        alert(data.message);
      }
    } catch (error) {}
  };

  const loginUser = async (username: string, password: string) => {
    try {
      let formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      const url = `${websiteURL}?rest_route=/simple-jwt-login/v1/auth`;

      const response = await axios.post(url, formData);
      let jwt = null;
      console.log("response", response);
      if (response.status === 200) {
        jwt = response.data.data.jwt;
        localStorage.setItem("jwt", jwt);
      }

      const loginResponse = await axios.get(`http://charity-ua.eugeneskom.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=${jwt}`);
    } catch (error) {}
  };

  const handleRegistrationSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const errors = validate();

      if (Object.keys(errors).length) {
        setErrors(errors);
        return;
      }

      console.log("formData", formData);
      setRegisteringLoading(true);
      // await registerUser(formData)
      const credentials = {
        username: formData.firstName + " " + formData.lastName,
        email: formData.email,
        password: formData.password,
        // event_id: 117
      };
      const response = await axios.post(`${websiteURL}wp-json/custom/v1/register-user/`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        username: formData.firstName + " " + formData.lastName,
        password: formData.password,
        email: formData.email,
        event_ids: [Number(id)],
      });

      const urlToken = `${websiteURL}wp-json/jwt-auth/v1/token`;

      const responseToken = await axios.post(urlToken, credentials);
      localStorage.setItem("token", responseToken.data.token);

      // const token = response.data.data.token;
      const isSuccess = response.data.success;
      // localStorage.setItem("token", token);

      if (isSuccess) {
        navigate(`/success-page/${id}`);
        setRegisteringLoading(false);
      } else {
        setRegisteringLoading(false);
      }
    } catch (error) {
      setRegisteringLoading(false);
      console.error("Registration error:", error);
    }

    // console.log("response", response.data);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleLoginSubmit = () => {};

  const handleResetSubmit = async (e:SyntheticEvent) => {
    e.preventDefault();
    const sendResetPassword = async () =>  {
    const response = await axios.post(`${websiteURL}wp-json/bdpwr/v1/reset-password`, {
      email: formData.email,
    });
    console.log('response', response.data);
    return response.data
    }
    const resetPassword = await sendResetPassword();
    // console.log('response', response.data);
  };

  return (
    <main className="max-w-5xl mx-auto my-8 px-6 relative w-full">
      {registeringLoading && <LoadingOverlay />}
      <section className="max-w-lg mx-auto bg-white p-8 rounded shadow-md ">
        {authStatus === "login" ? (
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-lg font-medium mb-4">Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Email</label>
                <input
                  className="border p-2 w-full rounded-lg"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Password</label>
                <input
                  className="border p-2 w-full rounded-lg"
                  type="password"
                  name="password"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              {/* {loginError && <p className="text-red-500 mb-4">{loginError}</p>} */}
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4">
                Login
              </button>
            </form>
            <button className="text-blue-500 hover:underline" onClick={() => setAuthStatus("register")}>
              Don't have an account? Register here.
            </button>
            <button className="text-blue-500 hover:underline" onClick={() => setAuthStatus("reset")}>
              Forgot Password? Reset here.
            </button>
          </div>
        ) : (
          ""
        )}

        {authStatus === "reset" ? (
          <form
            onSubmit={handleResetSubmit}
            className="mt-4"
          >
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                className="border p-2 w-full rounded-lg"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Reset Password
            </button>
          </form>
        ) : (
          ""
        )}

        {authStatus === "register" ? (
          <form className="bg-white p-6 rounded-lg shadow-md mt-4" onSubmit={handleRegistrationSubmit}>
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
              <input className="border p-2 w-full rounded-lg" onChange={handleChange} type="password" name="password" />
            </div>

            <div className="mb-6">
              {errors.confirmPassword ? <p className="error text-red-500">{errors.confirmPassword}</p> : ""}
              <label className="block text-gray-700 font-medium mb-2">Confirm Password</label>
              <input className="border p-2 w-full rounded-lg" onChange={handleChange} type="password" name="confirmPassword" />
            </div>

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
              Register
            </button>
            <div className="mt-5">
              <a className="text-blue-500 hover:underline cursor-pointer" onClick={() => setAuthStatus("login")}>
                Have an account? Login here.
              </a>
            </div>
          </form>
        ) : (
          ""
        )}
      </section>
    </main>
  );
}

export default RegisterForProject;
