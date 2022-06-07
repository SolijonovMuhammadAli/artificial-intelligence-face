import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import getusermedia from "getusermedia";
//import Webcam from "react-webcam";
// import { drawMesh } from "./utilis";

function FaceApi() {
  const W = 840,
    H = 600;
  const refweb = useRef();
  const refcanvas = useRef();

  const runFacemash = async () => {
    const Model_Url = process.env.PUBLIC_URL + "/models";

    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(Model_Url),
      faceapi.nets.faceLandmark68Net.loadFromUri(Model_Url),
      faceapi.nets.faceRecognitionNet.loadFromUri(Model_Url),
      faceapi.nets.faceExpressionNet.loadFromUri(Model_Url),
    ]).then(startVideo);
  };
  const startVideo = () => {
    getusermedia(
      {
        video: {},
      },
      (err, stream) => {
        refweb.current.srcObject = stream;
      },
    );
  };

  const handlePlay = () => {
    setInterval(async () => {
      refcanvas.current.innerHTML = faceapi.createCanvasFromMedia(
        refweb.current,
      );
      const displaySize = {
        width: W,
        height: H,
      };
      faceapi.matchDimensions(refcanvas.current, displaySize);
      const detect = await faceapi
        .detectAllFaces(refweb.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      const resizeDetections = faceapi.resizeResults(detect, displaySize);
      refcanvas.current.getContext("2d").clearRect(0, 0, W, H);
      faceapi.draw.drawDetections(refcanvas.current, resizeDetections);
      faceapi.draw.drawFaceExpressions(refcanvas.current, resizeDetections);
      faceapi.draw.drawFaceLandmarks(refcanvas.current, resizeDetections);
    }, 100);
  };
  useEffect(() => {
    runFacemash();

    //eslint-disable-next-line
  }, []);

  return (
    <div className="block">
      <video
        ref={refweb}
        autoPlay={true}
        muted
        className="webref"
        width={W}
        height={H}
        onPlay={handlePlay}
      ></video>
      <canvas ref={refcanvas} className="canvas"></canvas>
    </div>
  );
}

export default FaceApi;
