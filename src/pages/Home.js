import React, { useState, useEffect } from "react";
import axios from "axios";
import TitleCard from "./TitleCard";
import InputComponent from "./InputComponent";
import ContentBox from "./ContentBox";

function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
  const [showContentBox, setShowContentBox] = useState(false);
  const [contentBoxOpacity, setContentBoxOpacity] = useState(0);
  const [modelResponse, setModelResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = (input) => {
    setShowContentBox(true);
    setIsLoading(true);
    setContentBoxOpacity(0);

    const apiUrl = `${process.env.REACT_APP_API_URL}/chat`;
    axios
      .post(
        apiUrl,
        { message: input },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setModelResponse(response.data.response);
        setContentBoxOpacity(1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error with the chat API:", error);
        setModelResponse("Failed to get a response. Please try again.");
        setContentBoxOpacity(1);
        setIsLoading(false);
      });
  };

  const styles = {
    container: {
      width: "100vw",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: "40px",
      backgroundColor: "#fafaf0",
      marginRight: "20px",
    },
    titleCard: {
      width: isSmallScreen ? "80%" : "50%",
      marginBottom: "20px",
    },
    inputComponent: {
      width: isSmallScreen ? "80%" : "50%",
      marginBottom: "20px",
    },
    contentBox: {
      width: isSmallScreen ? "80%" : "50%",
      marginBottom: "20px",
      opacity: contentBoxOpacity,
      transition: "opacity 0.3s ease-out",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleCard}>
        <TitleCard />
      </div>
      <div style={styles.inputComponent}>
        <InputComponent onSubmit={handleSubmit} isLoading={isLoading} />
      </div>
      {showContentBox && (
        <div style={{ ...styles.contentBox, opacity: contentBoxOpacity }}>
          <ContentBox text={modelResponse} />
        </div>
      )}
    </div>
  );
}

export default Home;
