import React from "react";

function DescriptionBox() {
  const styles = {
    box: {
      width: "calc(100% + 20px)",
      minHeight: "100px",
      border: "1px solid lightblue",
      background:
        "linear-gradient(180deg, rgba(250,250,240,1) 0%, rgba(247, 247, 213,1) 100%)",
      boxSizing: "border-box",
      borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    text: {
      width: "100%",
      marginTop: "20px",
      marginBottom: "5px",
      textAlign: "center",
      fontFamily: "Georgia, serif",
      fontSize: "25px",
      color: "#424242",
    },
    list: {
      width: "90%",
      textAlign: "left",
      listStyleType: "none",
      fontFamily: "Georgia, serif",
      color: "#5c5c5c",
      fontSize: "16px",
    },
    listItem: {
      marginBottom: "10px",
    },
    emojiBell: {
      fontSize: "20px", // Example size for the bell emoji
      marginLeft: "5px",
    },
    emojiSave: {
      fontSize: "18px", // Different size for the save icon emoji
      marginLeft: "5px",
    },
    emojiLock: {
      fontSize: "25px", // Different size for the lock emoji
    },
  };

  return (
    <div style={styles.box}>
      <p style={styles.text}>Technical Demo - Chatbot for Policy Manual</p>
      <ul style={styles.list}>
        <li style={styles.listItem}>
          <span style={styles.emojiBell}>🔔</span>
          <span>
            {" "}
            - This is a technical demo and should not be used for important
            information.
          </span>
        </li>
        <li style={styles.listItem}>
          <span style={styles.emojiSave}>💾</span>
          <span>
            {" "}
            - The data you input may be used for further training and
            improvement of the model.
          </span>
        </li>
        <li style={styles.listItem}>
          <span style={styles.emojiLock}>🔒</span>
          <span>
            {" "}
            - Do not input any sensitive or personal information into the
            website.
          </span>
        </li>
      </ul>
    </div>
  );
}

export default DescriptionBox;
