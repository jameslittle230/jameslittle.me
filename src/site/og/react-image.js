const React = require("react");

const makeReactImage = (subtitle, title) =>
  React.createElement(
    "div",
    {
      style: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        backgroundColor: "#fff",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          padding: "5em",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          height: "90%",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 24,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "gray",
          },
        },
        subtitle
      ),
      React.createElement(
        "div",
        {
          style: {
            marginTop: 20,
            fontSize: 64,
            fontWeight: 900,
          },
        },
        title
      )
    ),
    React.createElement("div", {
      style: {
        display: "block",
        backgroundColor: "hsl(144, 46%, 30%)",
        width: "100%",
        height: "10%",
      },
    })
  );

module.exports = {
  makeReactImage,
};
