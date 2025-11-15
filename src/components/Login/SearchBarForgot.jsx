"use client";

import React, { useState } from "react";
import Image from "next/image";

import eyeSlash from "../../../public/images/eyeSlash.svg";
import eyeOpen from "../../../public/images/eyeSlash.svg"; // add open eye icon if available
import "./SearchBar.css";
import { ViewHeight, ViewWidth } from "@/lib/constants";

const SearchBarForgot = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="email-container"
      style={{
        width: ViewWidth(396),
        height: ViewHeight(90),
      }}
    >
      <label
        style={{
          color: "#2B3674",
          fontSize: ViewWidth(16),
          fontFamily: "PoppinsSemiBold",
        }}
      >
        Password
      </label>

      {/* Password wrapper */}
      <div
        className="input-wrapper"
        style={{
          height: ViewHeight(48),
          borderRadius: ViewWidth(10),
          paddingLeft: ViewWidth(10),
          paddingRight: ViewWidth(10),
          borderWidth: ViewWidth(0.5),
          position: "relative",
        }}
      >
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          style={{
            fontSize: ViewWidth(14),
            fontFamily: "RobotoRegular",
          }}
        />

        {/* Eye icon */}
        <Image
          src={showPassword ? eyeOpen : eyeSlash}
          alt="toggle password"
          width={24}
          height={24}
          style={{
            width: ViewWidth(24),
            height: ViewHeight(24),
            cursor: "pointer",
          }}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>

      {/* Forgot Password text */}
      <p
        style={{
          fontSize: ViewWidth(14),
          fontFamily: "PoppinsSemiBold",
          color: "#634FF1",
          cursor: "pointer",
          marginTop: ViewHeight(5),
          alignSelf: "flex-end",
        }}
        onClick={() => console.log("Forgot Password clicked")}
      >
        Forgot Password?
      </p>
    </div>
  );
};

export default SearchBarForgot;
