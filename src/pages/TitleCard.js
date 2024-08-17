import React, { useState, useEffect } from "react";
import logo from "../logo.png";

function TitleCard() {
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column", // Stack items vertically
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = {
    fontFamily: "Georgia",
    fontSize: isNarrowScreen ? "35px" : "50px", // Smaller font size when screen is narrow
    fontWeight: "500",
    color: "black",
    textAlign: "center",
    marginTop: isNarrowScreen ? "5px" : "10px", // Smaller margin top when screen is narrow
  };

  const logoStyle = {
    width: "auto", // Adjust width as needed or keep it auto for intrinsic size
    height: isNarrowScreen ? "25px" : "40px", // Smaller height when screen is narrow
  };

  return (
    <div style={containerStyle}>
      <a
        href="https://ryanhuang.xyz"
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...textStyle, fontSize: "20px", marginBottom: "20px" }}
      >
        Back to Ryan's Homepage
      </a>
      <div style={textStyle}>CHCCS Policy Manual - Chatbot</div>
    </div>
  );
}

export default TitleCard;
