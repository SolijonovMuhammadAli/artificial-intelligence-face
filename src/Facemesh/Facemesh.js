import React, { useEffect, useRef } from "react";
import * as facemash from "@tensorflow-models/face-landmarks-detection";
import Webcam from "react-webcam";
import { drawMesh } from "./utilis";

function App() {
  const refweb = useRef();
  const refcanvas = useRef();

  const runFacemash = async () => {
    const net = await facemash.load(
      facemash.SupportedPackages.mediapipeFacemesh,
    );
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async net => {
    if (
      refweb.current !== "undefined" &&
      refweb.current !== null &&
      refweb.current.video.readyState === 4
    ) {
      //get video properties
      const video = refweb.current.video;
      const videoWidth = refweb.current.video.videoWidth;
      const videoHeight = refweb.current.video.videoHeight;

      //set canvas width
      refcanvas.current.width = videoWidth;
      refcanvas.current.height = videoHeight;

      //detection
      const face = await net.estimateFaces({ input: video });

      //ctx get from canvas
      const ctx = refcanvas.current.getContext("2d");
      requestAnimationFrame(() => {
        drawMesh(face, ctx);
      });
    }
  };

  useEffect(() => {
    runFacemash();

    //eslint-disable-next-line
  }, []);

  return (
    <div className="block">
      <Webcam ref={refweb} className="webref"></Webcam>
      <canvas ref={refcanvas} className="canvas"></canvas>
    </div>
  );
}

export default App;
