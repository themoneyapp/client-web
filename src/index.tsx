import React from "react";
import { render } from "react-dom";

import ErrorHandler from "src/containers/ErrorHandler";
import Root from "src/containers/Root";
import reportWebVitals from "src/reportWebVitals";
import * as serviceWorkerRegistration from "src/serviceWorkerRegistration";

// core styles
import "src/styles/volt.scss";

// vendor styles
import "@fortawesome/fontawesome-free/css/all.css";
// import "react-datetime/css/react-datetime.css";

render(
  <React.StrictMode>
    <ErrorHandler>
      <Root />
    </ErrorHandler>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
