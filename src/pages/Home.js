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
  const [loadingProgress, setLoadingProgress] = useState(0); // State for loading progress

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
    setLoadingProgress(0); // Reset loading progress

    const estimatedTime = 1000 * (text.length * 0.019 + 1.366);
    const maxProgress = 85 + Math.random() * 10; // Randomly select a maximum progress between 85 and 95
    const increment = maxProgress / (estimatedTime / 100); // Adjust increment to reach the random maxProgress

    let progressInterval = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress >= maxProgress) {
          clearInterval(progressInterval);
          return prevProgress;
        }
        return prevProgress + increment;
      });
    }, 100);

    const apiUrl = `${process.env.REACT_APP_API_URL}/translate`;
    axios.post(apiUrl, { text: text }, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        clearInterval(progressInterval);
        setLoadingProgress(100); // Finish loading
        setTimeout(() => {
          setTranslatedText(response.data);
          setContentBoxOpacity(1);
        }, 50);
      })
      .catch((error) => {
        console.error("There was an error with the translation API:", error);
        clearInterval(progressInterval);
        setLoadingProgress(100); // Ensure loading bar completes even on error
        setTranslatedText("Failed to translate. Please try again.");
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
    loadingBarContainer: {
      width: "80%",
      height: "20px",
      backgroundColor: "#e0e0e0",
      borderRadius: "10px",
      overflow: "hidden",
      marginBottom: "20px", // Ensures consistent margin
    },
    loadingBar: {
      height: "100%",
      backgroundColor: "#4caf50",
      width: `${loadingProgress}%`,
      transition: "width 0.1s ease-out",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.titleCard}>
        <TitleCard />
      </div>
      <div style={styles.inputComponent}>
        <InputComponent onTranslate={handleTranslateText} />
      </div>
      {showDescriptionBox && (
        <div style={{ ...styles.descriptionBox, opacity }}>
          <DescriptionBox />
        </div>
      )}
      <div style={styles.loadingBarContainer}>
        <div style={styles.loadingBar}></div>
      </div>
      {showContentBox && (
        <div style={{ ...styles.contentBox, opacity: contentBoxOpacity }}>
          <ContentBox text={translatedText || "Loading..."} />
        </div>
      )}
    </div>
  );
}

export default Home;
