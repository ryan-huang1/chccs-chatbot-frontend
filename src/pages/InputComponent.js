import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const InputComponent = ({ onTranslate, isLoading }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(window.innerWidth < 700);
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsNarrowScreen(window.innerWidth < 700);
      adjustTextareaHeight();
    };

    window.addEventListener("resize", handleResize);
    adjustTextareaHeight();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const fetchRandomPhrase = () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/random`;

    axios
      .get(apiUrl)
      .then((response) => {
        setInputValue(response.data.phrase);
        setTimeout(adjustTextareaHeight, 0);
      })
      .catch((error) => {
        console.error("Failed to fetch random phrase:", error);
      });
  };

  const getDynamicStyles = () => ({
    inputContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      borderRadius: "30px",
      boxShadow: isFocused
        ? "0px -2px 4px rgba(0, 0, 0, 0.02), 0px 4px 8px rgba(0, 0, 0, 0.2)"
        : "0px 4px 6px rgba(0, 0, 0, 0.1)",
      padding: "10px",
      backgroundColor: "white",
      border: "0.5px solid #d6d6d6",
      transition: "box-shadow 0.3s ease",
      width: "100%",
      minHeight: "50px",
      paddingBottom: "0px",
    },
    textareaField: {
      flexGrow: 1,
      marginRight: "10px",
      border: "none",
      outline: "none",
      borderRadius: "10px",
      padding: "5px",
      resize: "none",
      fontSize: isNarrowScreen ? ".8rem" : "1.1rem",
      minHeight: "20px",
      overflow: "hidden",
      paddingTop: "10px",
      backgroundColor: "transparent",
      fontFamily: "Georgia",
      lineHeight: "30px",
      paddingLeft: "10px",
    },
    button: {
      display: "flex",
      alignItems: "center",
      color: "white",
      border: "none",
      outline: "none",
      borderRadius: "20px",
      padding: "10px 20px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      fontWeight: "bold",
      transition: "transform 0.2s ease",
      marginTop: "5px",
      marginRight: "5px",
    },
    randomButton: {
      background: "orange",
      cursor: "pointer",
    },
    translateButton: {
      background: "orange",
      cursor: isLoading ? "not-allowed" : "pointer",
      position: "relative",
      overflow: "hidden",
    },
    tint: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(128, 128, 128, 0.5)",
      pointerEvents: "none",
      animation: isLoading ? "pulse 1.5s infinite" : "none",
    },
  });

  const styles = getDynamicStyles();

  return (
    <div style={styles.inputContainer}>
      <textarea
        ref={textareaRef}
        placeholder="What can I help you with?"
        style={styles.textareaField}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={inputValue}
        onChange={handleInputChange}
        rows="1"
      />
      <button
        style={{ ...styles.button, ...styles.randomButton }}
        onClick={fetchRandomPhrase}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
        title="Fetch Random Phrase"
      >
        <div
          style={{
            marginRight: "7px",
            paddingTop: "2px",
            height: "22px",
            width: "15px",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-shuffle"
            viewBox="0 0 16 16"
            strokeWidth="2"
            style={{ marginLeft: "1px" }}
          >
            <path
              fillRule="evenodd"
              d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"
            />
            <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192" />
          </svg>
        </div>
      </button>
      <button
        style={{ ...styles.button, ...styles.translateButton }}
        onMouseOver={(e) =>
          !isLoading && (e.currentTarget.style.transform = "scale(1.08)")
        }
        onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
        onClick={() => !isLoading && onTranslate(inputValue)}
        disabled={isLoading}
      >
        <div style={{ marginRight: "7px", paddingTop: "2px" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            fill="currentColor"
            viewBox="0 0 16 16"
            stroke="white"
            strokeWidth="1"
          >
            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
          </svg>
        </div>
        {!isNarrowScreen && (
          <span style={{ fontSize: "1.1rem" }}>Translate</span>
        )}
        {isLoading && <div style={styles.tint} />}
      </button>
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.6;
          }
          100% {
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};

export default InputComponent;
