import React from "react";
// import "@tensorflow/tfjs";
// import Facemesh from "./Facemesh/Facemesh";
import FaceApi from "./Face-api/FaceApi";
// import Handmodal from "./Handmodal/Handmodal";
// import WhoIsHe from "./WhoIsHe/WhoIsHe";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <Facemesh /> */}
      {/* <Handmodal /> */}
      <FaceApi />
      {/* <WhoIsHe /> */}
    </div>
  );
}

export default App;
