import React, { useState, useEffect, ReactEventHandler } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const [cookies] = useCookies();
  const navigate = useNavigate();
  useEffect(() => {
    if (cookies.jwt) {
      navigate("/");
    }
  }, [cookies, navigate]);

  const [values, setValues] = useState({ email: "", password: "" });
  const generateError = (error: String) =>
    toast.error(error, {
      position: "bottom-right",
    });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        {
          ...values,
        },
        { withCredentials: true }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="h-screen flex flex-col justify-center items-center">
    <img src="/twitterLogo.png" alt="Twitter Logo" className="max-h-12 max-w-12 m-5" />
    <div className="bg-white px-3 py-3 pb-2 rounded-md border-t-4 border-t-blue-500 w-full max-w-md">
      <h2 className="text-2xl font-weight-light font-inter mx-2 my-2">Register Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
              className="w-full p-3 border border-gray-300 rounded-md font-inter"
            />
          </div>
            <div className="flex flex-col gap-0.5">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md font-inter"
              />
            </div>
            </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md font-inter mt-4 my-4"
          >
            Submit
          </button>
          <span className="mt-10 text-center">
            Already have an account ?<Link to="/login" className="text-blue-500 font-inter"> Login</Link>
          </span>
      </form>
      <ToastContainer />
    </div>
  </div>
  );
}

export default Register;
