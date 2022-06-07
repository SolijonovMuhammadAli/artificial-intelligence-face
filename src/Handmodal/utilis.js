// Points for fingers
const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

// Infinity Gauntlet Style
const style = {
  0: { color: "red", size: 15 },
  1: { color: "gold", size: 5 },
  2: { color: "blue", size: 10 },
  3: { color: "gold", size: 5 },
  4: { color: "gold", size: 5 },
  5: { color: "blue", size: 10 },
  6: { color: "gold", size: 5 },
  7: { color: "gold", size: 5 },
  8: { color: "gold", size: 5 },
  9: { color: "blue", size: 10 },
  10: { color: "gold", size: 5 },
  11: { color: "gold", size: 5 },
  12: { color: "gold", size: 5 },
  13: { color: "blue", size: 10 },
  14: { color: "gold", size: 5 },
  15: { color: "gold", size: 5 },
  16: { color: "gold", size: 5 },
  17: { color: "blue", size: 10 },
  18: { color: "gold", size: 5 },
  19: { color: "gold", size: 5 },
  20: { color: "gold", size: 5 },
};

export const drawHand = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach(prediction => {
      const landmarks = prediction.landmarks;

      // barmoqlar uchun tsikl
      for (let i = 0; i < Object.keys(fingerJoints).length; i++) {
        let finger = Object.keys(fingerJoints)[i];
        // bog'imlar uchun tsikl
        for (let j = 0; j < fingerJoints[finger].length - 1; j++) {
          const firstJointIndex = fingerJoints[finger][j];
          const secondJointIndex = fingerJoints[finger][j + 1];

          // chirish yo'li
          ctx.beginPath();
          ctx.moveTo(
            landmarks[firstJointIndex][0],
            landmarks[firstJointIndex][1],
          );
          ctx.lineTo(
            landmarks[secondJointIndex][0],
            landmarks[secondJointIndex][1],
          );
          ctx.strokeStyle = "aqua";
          ctx.lineWidth = 4;
          ctx.stroke();
        }
      }

      for (let k = 0; k < landmarks.length; k++) {
        // x va y topish
        const x = landmarks[k][0];
        const y = landmarks[k][1];

        // chizish aytana
        ctx.beginPath();
        ctx.arc(x, y, style[k]["size"], 0, 3 * Math.PI);

        // rang kiritish
        ctx.fillStyle = style[k]["color"];
        ctx.fill();
      }
    });
  }
};
