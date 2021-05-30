import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import { FirebaseService, GeocodeService } from "./services";
import { FirebaseContext, GeocodeContext } from "./context";

ReactDOM.render(
  <FirebaseContext.Provider value={new FirebaseService()}>
    <GeocodeContext.Provider value={new GeocodeService()}>
      <App />
    </GeocodeContext.Provider>
  </FirebaseContext.Provider>,
  document.getElementById("root")
);

reportWebVitals();
