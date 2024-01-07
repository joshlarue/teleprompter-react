import './App.css'

function App() {
  // adapted from https://www.geeksforgeeks.org/how-to-open-web-cam-in-javascript/
  document.addEventListener("DOMContentLoaded", () => {
    let camStream = document.querySelector(".camera-stream");
    let playBtn = document.querySelector(".camera-start");
    let mediaDevices = navigator.mediaDevices;
    camStream.muted = true;

    playBtn.addEventListener("click", () => {
      mediaDevices
        .getUserMedia({video: true, audio: true,})
        .then((stream) => {
          camStream.srcObject = stream;
          camStream.addEventListener("loadedmetadata", () => {
            camStream.play();
          })
        })
        .catch(alert);
    });
  });

  return (
    <>
      <video className="camera-stream"></video>
      <button className="camera-start" autoPlay>
        Start Webcam
      </button>
    </>
  )
}

export default App
