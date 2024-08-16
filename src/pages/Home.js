import React, { useState, useEffect } from "react";
import axios from "axios";
import TitleCard from "./TitleCard";
import InputComponent from "./InputComponent";
import DescriptionBox from "./DescriptionBox";
import ContentBox from "./ContentBox";

function Home() {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1200);
  const [showDescriptionBox, setShowDescriptionBox] = useState(true);
  const [showContentBox, setShowContentBox] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [contentBoxOpacity, setContentBoxOpacity] = useState(0);
  const [translatedText, setTranslatedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1200);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTranslateText = (text) => {
    setOpacity(0);
    setShowDescriptionBox(false);
    setShowContentBox(true);
    setIsLoading(true);
    setContentBoxOpacity(0);

    const apiUrl = `${process.env.REACT_APP_API_URL}/translate`;
    axios
      .post(
        apiUrl,
        { text: text },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        setTranslatedText(response.data);
        setContentBoxOpacity(1);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("There was an error with the translation API:", error);
        setTranslatedText("Failed to translate. Please try again.");
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
    descriptionBox: {
      width: isSmallScreen ? "80%" : "50%",
      marginBottom: "20px",
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
        <InputComponent
          onTranslate={handleTranslateText}
          isLoading={isLoading}
        />
      </div>
      {showDescriptionBox && (
        <div style={{ ...styles.descriptionBox, opacity }}>
          <DescriptionBox />
        </div>
      )}
      {showContentBox && (
        <div style={{ ...styles.contentBox, opacity: contentBoxOpacity }}>
          <ContentBox text={translatedText} />
        </div>
      )}
    </div>
  );
}

export default Home;
