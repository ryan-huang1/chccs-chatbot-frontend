import React from "react";

function ContentBox({ text }) {
  // Check if text is an object and render accordingly
  const renderText = () => {
    // If text is an object and not empty
    if (typeof text === "object" && text !== null) {
      return (
        <>
          <p style={styles.text}>
            <strong>Literal Translation:</strong> {text.literal_translation}
          </p>
          <p style={styles.text}>
            <strong>Non-Literal Translation:</strong>{" "}
            {text.non_literal_translation}
          </p>
        </>
      );
    } else {
      // Fallback or initial text
      return <p style={styles.text}>{text}</p>;
    }
  };

  const styles = {
    box: {
      width: "calc(100% + 20px)",
      minHeight: "100px",
      border: "1px solid lightgray",
      background:
        "linear-gradient(180deg, rgba(250,250,240,1) 0%, rgba(247, 247, 213,1) 100%)",
      boxSizing: "border-box",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start", // Align items to the start (left) instead of center
      padding: "10px 20px 10px 20px", // Added top and bottom padding of 10px
    },
    text: {
      width: "100%",
      textAlign: "left", // Ensure text is left-aligned
      fontFamily: "Georgia, serif",
      fontSize: "19px", // Adjust font size as needed
      lineHeight: "24px",
      color: "#424242",
      marginTop: "10px", // Add some space between paragraphs
    },
  };

  return <div style={styles.box}>{renderText()}</div>;
}

export default ContentBox;
