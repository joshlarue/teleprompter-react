import './App.css'

function App() {
  // adapted from https://www.geeksforgeeks.org/how-to-open-web-cam-in-javascript/
  document.addEventListener("DOMContentLoaded", () => {
    let camStream = document.querySelector(".camera-stream");
    let playBtn = document.querySelector(".camera-start");
    let recBtn = document.querySelector(".record-btn");
    let stopBtn = document.querySelector(".stop-btn");
    let mediaDevices = navigator.mediaDevices;
    camStream.muted = true;

    playBtn.addEventListener("click", () => {
      mediaDevices
        .getUserMedia({video: true, audio: true,})
        .then((stream) => {
          camStream.srcObject = stream;
          camStream.addEventListener("loadedmetadata", () => {
            camStream.play();
          });
          const mediaRecorder = new MediaRecorder(stream);

          recBtn.addEventListener("click", () => {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            recBtn.style.background="red";
          });


          // based on https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API
          let chunks = [];

          mediaRecorder.ondataavailable = (e) => {
            chunks.push(e.data);
          }

          stopBtn.addEventListener("click", () => {
            mediaRecorder.stop()
            console.log(mediaRecorder.state);
            recBtn.style.background = '';
          });

          mediaRecorder.onstop = (e) => {
            console.log("recorder stopped.");

            const clip = prompt("filename for clip: ");

            const clipContainer = document.createElement("article");
            const clipLabel = document.createElement("p");
            const audio = document.createElement("audio");
            const displayVid = document.createElement("video");
            const delBtn = document.createElement("button");

            clipContainer.classList.add("clip");
            delBtn.textValue = 'delete';
            clipLabel.textValue = clip;

            clipContainer.appendChild(displayVid);
            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(delBtn);

            const blob = new Blob(chunks, { type: "video/mp4"});
            chunks = [];
            const vidURL = window.URL.createObjectURL(blob);
            displayVid.src = vidURL;
          }

        })
        .catch((alert) => {
          console.log(`The following error occured: ${alert}`);
        });
    });

  });



  return (
    <>
      <video className="camera-stream"></video>
      <button className="camera-start" autoPlay>
        Start Webcam
      </button>
      <button className="record-btn">
        Record
      </button>
      <button className="stop-btn">
        Stop
      </button>
    </>
  )
}

export default App
