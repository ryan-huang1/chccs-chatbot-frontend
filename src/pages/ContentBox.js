import React from "react";
import ReactMarkdown from "react-markdown";

function ContentBox({ text }) {
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
      alignItems: "flex-start",
      padding: "10px 20px 10px 20px",
    },
    text: {
      width: "100%",
      textAlign: "left",
      fontFamily: "Georgia, serif",
      fontSize: "19px",
      lineHeight: "24px",
      color: "#424242",
      marginTop: "10px",
    },
  };

  return (
    <div style={styles.box}>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => <p style={styles.text} {...props} />,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
}

export default ContentBox;
