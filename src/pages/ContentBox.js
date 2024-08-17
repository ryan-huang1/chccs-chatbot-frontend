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

  const markdownComponents = {
    p: ({ node, ...props }) => <p style={styles.text} {...props} />,
    // eslint-disable-next-line jsx-a11y/heading-has-content
    h1: ({ node, ...props }) => (
      <h1
        style={{ ...styles.text, fontSize: "24px", fontWeight: "bold" }}
        {...props}
      />
    ),
    // eslint-disable-next-line jsx-a11y/heading-has-content
    h2: ({ node, ...props }) => (
      <h2
        style={{ ...styles.text, fontSize: "22px", fontWeight: "bold" }}
        {...props}
      />
    ),
    // eslint-disable-next-line jsx-a11y/heading-has-content
    h3: ({ node, ...props }) => (
      <h3
        style={{ ...styles.text, fontSize: "20px", fontWeight: "bold" }}
        {...props}
      />
    ),
    ul: ({ node, ...props }) => (
      <ul
        style={{ ...styles.text, listStyleType: "disc", paddingLeft: "20px" }}
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        style={{
          ...styles.text,
          listStyleType: "decimal",
          paddingLeft: "20px",
        }}
        {...props}
      />
    ),
    li: ({ node, ...props }) => <li style={styles.text} {...props} />,
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    a: ({ node, ...props }) => (
      <a
        style={{ ...styles.text, color: "blue", textDecoration: "underline" }}
        {...props}
      />
    ),
    em: ({ node, ...props }) => (
      <em style={{ ...styles.text, fontStyle: "italic" }} {...props} />
    ),
    strong: ({ node, ...props }) => (
      <strong style={{ ...styles.text, fontWeight: "bold" }} {...props} />
    ),
  };

  return (
    <div style={styles.box}>
      <ReactMarkdown components={markdownComponents}>{text}</ReactMarkdown>
    </div>
  );
}

export default ContentBox;
