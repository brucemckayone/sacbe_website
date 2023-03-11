"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
function ToastContainerClient() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <div>
      {domLoaded && (
        <ToastContainer
          // theme="dark"
          toastStyle={{
            backgroundColor: "beige",
            color: "black",
            fontFamily: "marcellus",
            accentColor: "orange",
            alignItems: "center",
          }}
          progressStyle={{
            accentColor: "orange",
            backgroundColor: "orange",
            fill: "orange",
          }}
        />
      )}
    </div>
  );
}

export default ToastContainerClient;
