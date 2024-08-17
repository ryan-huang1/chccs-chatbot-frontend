import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const InputComponent = ({ onSubmit, isLoading }) => {
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

  const fetchRandomQuestion = () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/random_question`;

    axios
      .get(apiUrl)
      .then((response) => {
        setInputValue(response.data.question);
        setTimeout(adjustTextareaHeight, 0);
      })
      .catch((error) => {
        console.error("Failed to fetch random question:", error);
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
      paddingTop: "10px",
      paddingBottom: "10px",
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
      paddingLeft: "20px",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      border: "none",
      outline: "none",
      borderRadius: "20px",
      padding: "10px 20px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      fontWeight: "bold",
      transition: "transform 0.2s ease",
      marginTop: "5px",
      marginRight: "10px",
    },
    randomButton: {
      background: "orange",
      cursor: "pointer",
    },
    submitButton: {
      background: "orange",
      cursor: isLoading ? "not-allowed" : "pointer",
      position: "relative",
      overflow: "hidden",
      paddingRight: "20px",
    },
    iconContainer: {
      width: "24px",
      height: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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

  const LoadingSpinner = () => (
    <svg
      className="spinner"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className="spinner-circle"
        cx="12"
        cy="12"
        r="10"
        fill="none"
        strokeWidth="3"
      />
    </svg>
  );

  const SendIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );

  return (
    <div style={styles.inputContainer}>
      <textarea
        ref={textareaRef}
        placeholder="Ask a question about school board policies"
        style={styles.textareaField}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={inputValue}
        onChange={handleInputChange}
        rows="1"
      />
      <button
        style={{ ...styles.button, ...styles.randomButton }}
        onClick={fetchRandomQuestion}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
        title="Fetch Random Question"
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
        style={{ ...styles.button, ...styles.submitButton }}
        onMouseOver={(e) =>
          !isLoading && (e.currentTarget.style.transform = "scale(1.08)")
        }
        onMouseOut={(e) => (e.currentTarget.style.transform = "none")}
        onClick={() => !isLoading && onSubmit(inputValue)}
        disabled={isLoading}
      >
        <div style={styles.iconContainer}>
          {isLoading ? <LoadingSpinner /> : <SendIcon />}
        </div>
        {!isNarrowScreen && (
          <span style={{ fontSize: "1.1rem", marginLeft: "7px" }}>Submit</span>
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
        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }
        .spinner {
          animation: rotate 2s linear infinite;
        }
        .spinner-circle {
          stroke: white;
          stroke-linecap: round;
          animation: dash 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default InputComponent;
