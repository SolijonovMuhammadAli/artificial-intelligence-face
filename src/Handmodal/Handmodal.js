import React, { useEffect, useRef } from "react";
import * as handepose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "./utilis";

export default function Handmodal() {
  const refweb = useRef();
  const refcanvas = useRef();

  const runHandpose = async () => {
    const net = await handepose.load();
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
      const face = await net.estimateHands(video);
      //ctx get from canvas
      const ctx = refcanvas.current.getContext("2d");

      drawHand(face, ctx);
    }
  };

  useEffect(() => {
    runHandpose();

    //eslint-disable-next-line
  }, []);
  return (
    <div className="block">
      <Webcam ref={refweb} className="webref"></Webcam>
      <canvas ref={refcanvas} className="canvas"></canvas>
    </div>
  );
}
