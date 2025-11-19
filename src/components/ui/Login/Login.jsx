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
import { login } from "@/lib/api/authService";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
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

        router.push("/dashboard");
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
        <Image
          src={"/images/BG1.svg"}
          alt="background"
          fill
          className="login-bg"
        />

        <div className="login-content-center">
          <div className="login-card">
            {/* Logo */}
            <div className="login-logo-container">
              <Image
                src={logoUrl}
                alt="SI Fleet Management"
                width={80}
                height={80}
                priority
              />
            </div>

            {/* Title & Subtitle */}
            <div className="login-title-group">
              <p className="login-title">Login</p>
              <p className="login-subtitle">Enter your Email & Password</p>
            </div>

            {/* Inputs */}
            <div className="login-input-group">
              {/* Email Input */}
              <div className="input-wrapper">
                <label className="input-label">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="login-input"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.email && formik.touched.email && (
                <p className="error-text">{formik.errors.email}</p>
              )}

              {/* Password Input */}
              <div className="input-wrapper">
                <label className="input-label">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="login-input"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="error-text">{formik.errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="forgot-password-wrapper">
              <a href="#" className="forgot-password-link">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <div className="login-button-wrapper">
              <button className="btn-main" type="submit">
                Login
              </button>
            </div>

            {/* Footer */}
            <div className="login-footer">
              <Image
                src={Group1850}
                alt="Startec Dynamics"
                width={160}
                height={57}
                className="login-footer-img"
              />
              <p className="login-footer-text">
                © 2025 Startec Dynamics Inc. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
