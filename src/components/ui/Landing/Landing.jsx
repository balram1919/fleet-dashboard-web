"use client";

import Image from "next/image";
// import CircularProgress from "@mui/material/CircularProgress";
import "./Landing.css";

import bgUrl from "../../../../public/images/BG.svg";
import logoUrl from "../../../../public/images/Logo.svg";
import starLogo from "../../../../public/images/starLogo.svg";

import { ViewWidth, ViewHeight } from "@/lib/constants";

const Landing = () => {
  const progressValue = 60;

  return (
    <div className="landing-wrapper" role="dialog" aria-label="Splash screen">
      
      {/* Background (keep as <img> – better for full-screen) */}
      <img src={bgUrl.src} alt="Background" className="landing-bg" />

      {/* Content */}
      <div className="landing-content">

        {/* Logo */}
        <div className="landing-logo">
          <Image
            src={logoUrl}
            alt="App Logo"
            width={150}
            height={150}
            style={{
              width: ViewWidth(150),
              height: "auto",
            }}
            priority
          />
        </div>

        {/* Headline */}
        <p
          className="gradient-text"
          style={{
            fontSize: ViewWidth(62),
            marginTop: ViewHeight(104),
          }}
        >
          Safer. Smarter. Faster.
        </p>

        {/* Subheading */}
        <p
          className="landing-subheading"
          style={{
            fontSize: ViewWidth(22),
          }}
        >
          The Future of Motorcycling
        </p>

        {/* Description */}
        <p
          className="landing-description"
          style={{
            fontSize: ViewWidth(18),
            maxWidth: ViewWidth(865),
          }}
        >
          Welcome to the{" "}
          <strong style={{ fontWeight: 600 }}>
            future of motorcycling. Startec Intelligent
          </strong>{" "}
          connects your motorbike to your phone, transforming your driving
          experience with features like an SOS emergency response system,
          keyless ignition, geo-tracking anti-theft, and a smart dashboard.
        </p>

        {/* Loader */}
        <div className="landing-loader">
          {/* <CircularProgress
            variant="determinate"
            value={progressValue}
            size={30}
            sx={{ color: "#F53799" }}
          /> */}
          <p
            style={{
              marginTop: "10px",
              color: "#2B3674",
              fontFamily: "RobotoRegular",
            }}
            aria-live="polite"
          >
            Loading {progressValue}%
          </p>
        </div>

        {/* Footer Logo */}
        <div className="landing-footer">
          <Image
            src={starLogo}
            alt="Startec Dynamics"
            width={239}
            height={98}
            style={{
              width: ViewWidth(239),
              height: ViewHeight(98),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
