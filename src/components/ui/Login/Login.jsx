"use client";

import React from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

import bgUrl from "../../../../public/images/BG1.svg";
import logoUrl from "../../../../public/images/Logo.svg";
import Group1850 from "../../../../public/images/Group1850.svg";

import "./Login.css";
import { ViewHeight, ViewWidth } from "@/lib/constants";
import SearchBar from "@/components/Login/SearchBar";
import SearchBarForgot from "@/components/Login/SearchBarForgot";
import { Button } from "@/components/Login/TouchableButton";
import { login } from "@/lib/api/authService";
import { useRouter } from "next/navigation";


const Login = () => {

  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        toast.loading("Logging in...");

        const user = await login(values.email, values.password);

        toast.dismiss();
        toast.success("Login successful!");

        router.push("/dashboard")
      } catch (error) {
        toast.dismiss();

        const msg =
          error?.response?.data?.message ||
          "Login failed. Please check your credentials.";

        toast.error(msg);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="login-wrapper">

        <img src={bgUrl} alt="background" className="login-bg" />

        <div className="login-content-center">
          <div className="login-card">
            <div className="login-logo-container">
              <Image
                src={logoUrl}
                alt="App Logo"
                width={121}
                height={108}
                style={{ width: ViewWidth(121), height: ViewHeight(108) }}
                priority
              />
            </div>

            <div className="login-title-group">
              <p className="login-title" style={{ fontSize: ViewWidth(32) }}>
                Login
              </p>
              <p className="login-subtitle" style={{ fontSize: ViewWidth(16) }}>
                Enter your Email & Password
              </p>
            </div>

            {/* Inputs */}
            <div className="login-input-group" style={{ gap: ViewHeight(12) }}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="login-input"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && formik.touched.email && (
                <p className="error-text">{formik.errors.email}</p>
              )}

              <input
                type="password"
                name="password"
                placeholder="Password"
                className="login-input"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && formik.touched.password && (
                <p className="error-text">{formik.errors.password}</p>
              )}
            </div>

            <div
              className="login-button-wrapper"
              style={{ marginTop: ViewHeight(30) }}
            >
              <button className="btn-main" type="submit">
                Login
              </button>
            </div>

            <div className="login-footer">
              <Image
                src={Group1850}
                alt="Startec Dynamics"
                width={239}
                height={85}
                className="login-footer-img"
                style={{
                  width: ViewWidth(239),
                  height: ViewHeight(85),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
