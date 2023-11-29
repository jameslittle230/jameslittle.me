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
        },
      },
      React.createElement(
        "div",
        {
          style: {
            fontSize: 36,
            fontWeight: 400,
          },
        },
        subtitle
      ),
      React.createElement(
        "div",
        {
          style: {
            marginTop: 20,
            fontSize: 62,
            fontWeight: 600,
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
        height: 100,
      },
    })
  );

module.exports = {
  makeReactImage,
};
