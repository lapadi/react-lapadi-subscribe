import React, { Component } from "react";
import { render } from "react-dom";
import GithubCorner from "react-github-corner";

import LapadiSubscribe from "../../src";

const CustomForm = ({ status, message, onValidated }) => {
  console.log("pr", process)
  let email, name;
  const submit = () =>
    email &&
    name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      email: email.value,
      name: name.value
    });

  return (
    <div
      style={{
        borderRadius: 2,
        padding: 10,
        justifyContent: "center"
      }}
    >
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input
        style={{  padding: 5 }}
        ref={node => (name = node)}
        type="text"
        placeholder="Your name"
      />
      <br />
      <input
        style={{  padding: 5 }}
        ref={node => (email = node)}
        type="email"
        placeholder="Your email"
      />
      <br />
      <button style={{  padding: 5 }} onClick={submit}>
        Submit
      </button>
    </div>
  );
};

class Demo extends Component {
  render() {
    const url = `http://localhost:4000/api/v1/subscribe/post?app=${process.env.app_id}&id=${process.env.form_id}`;
    return (
      <div style={{
        justifyContent: "center"
      }}>
        <h1>react-lapadi-subscribe Demo</h1>
        <GithubCorner href="https://github.com/lapadi/react-lapadi-subscribe" />
        <h2>Default Form</h2>
        <LapadiSubscribe url={url} />
        <h2>Custom Form</h2>
        <LapadiSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <CustomForm
              status={status}
              message={message}
              onValidated={formData => subscribe(formData)}
            />
          )}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));