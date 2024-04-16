"use client";
import Lottie from "lottie-react";
import React from "react";
import loader from "../../assets/loaderSchema.json";

function Loader() {
  return <Lottie animationData={loader} loop={true} />;
}

export default Loader;
