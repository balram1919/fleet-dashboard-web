"use client";

import React from "react";
import Image from "next/image";

import sms from "../../../public/images/sms.svg";
import "./SearchBar.css";
import { ViewHeight, ViewWidth } from "@/lib/constants";

const SearchBar = () => {
  return (
    <div
      className="email-container"
      style={{ width: ViewWidth(396) }}
    >
      <label
        style={{
          fontSize: ViewWidth(16),
          fontFamily: "PoppinsSemiBold",
        }}
      >
        Email
      </label>

      <div
        className="input-wrapper"
        style={{
          height: ViewHeight(48),
          borderRadius: ViewWidth(10),
          paddingLeft: ViewWidth(10),
          paddingRight: ViewWidth(10),
          borderWidth: ViewWidth(0.5),
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            fontSize: ViewWidth(14),
            fontFamily: "RobotoRegular",
          }}
        />

        {/* Icon */}
        <Image
          src={sms}
          alt="sms"
          width={24}
          height={24}
          style={{
            width: ViewWidth(24),
            height: ViewHeight(24),
          }}
        />
      </div>
    </div>
  );
};

export default SearchBar;
