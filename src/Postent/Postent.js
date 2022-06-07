import React, { useEffect, useRef } from "react";
import * as postent from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "./utilis";

function App() {
  const refweb = useRef();
  const refcanvas = useRef();

  const runPostent = async () => {
    const net = await postent.load({
      inputResolution: {
        width: 840,
        height: 600,
      },
    });
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
      const video = refweb.current.video;
      const videoWidth = refweb.current.video.videoWidth;
      const videoHeight = refweb.current.video.videoHeight;

      refcanvas.current.width = videoWidth;
      refcanvas.current.height = videoHeight;

      const pose = await net.estimateSinglePose(video);
      const ctx = refcanvas.current.getContext("2d");

      drawKeypoints(pose["keypoints"], 0.5, ctx);
      drawSkeleton(pose["keypoints"], 0.5, ctx);
    }
  };
  useEffect(() => {
    runPostent();

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
