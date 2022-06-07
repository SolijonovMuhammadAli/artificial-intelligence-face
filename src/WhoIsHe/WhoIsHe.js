import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

export default function WhoIsHe() {
  const imageUpload = useRef();
  const body = useRef();
  const start = () => {
    body.current.append("Loading");
  };
  const handleChange = async e => {
    const LabeledFaceDescriptors = await loadLabel();
    const faceMatcher = new faceapi.FaceMatcher(LabeledFaceDescriptors, 0.6);
    const image = await faceapi.bufferToImage(e.target.files[0]);

    const canvas = faceapi.createCanvasFromMedia(image);
    const displaySize = { width: 1200, height: 700 };

    faceapi.matchDimensions(canvas, displaySize);
    body.current.appendChild(canvas);
    body.current.appendChild(image);

    const detect = await faceapi
      .detectAllFaces(image)
      .withFaceLandmarks()
      .withFaceDescriptors();
    const resizeDetections = faceapi.resizeResults(detect, displaySize);
    const results = resizeDetections.map(d =>
      faceMatcher.findBestMatch(d.descriptor),
    );
    results.forEach((res, i) => {
      const box = resizeDetections[i].detection.box;
      const drawBox = new faceapi.draw.DrawBox(box, { label: res.toString() });
      drawBox.draw(canvas);
    });
  };

  const loadLabel = () => {
    const labels = ["Brayen", "Hobs", "Letti", "Taretto", "Deckard"];
    return Promise.all(
      labels.map(async label => {
        const desc = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`/imges/${label}/${i}.jpg`);
          const detect = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          desc.push(detect.descriptor);
        }
        return new faceapi.LabeledFaceDescriptors(label, desc);
      }),
    );
  };
  useEffect(() => {
    const Model_Url = process.env.PUBLIC_URL + "/models";
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri(Model_Url),
      faceapi.nets.faceLandmark68Net.loadFromUri(Model_Url),
      faceapi.nets.ssdMobilenetv1.loadFromUri(Model_Url),
    ]);
    start();
  }, []);
  return (
    <div className="who" ref={body}>
      <input type="file" ref={imageUpload} onChange={handleChange} />
    </div>
  );
}
