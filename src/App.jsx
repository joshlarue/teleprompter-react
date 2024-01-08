import './App.css'

function App() {
  // adapted from https://www.geeksforgeeks.org/how-to-open-web-cam-in-javascript/
  document.addEventListener("DOMContentLoaded", () => {
    let mediaRecorder;
    let body = document.querySelector(".body");
    let camStream = document.querySelector(".camera-stream");
    let playBtn = document.querySelector(".camera-start");
    let recBtn = document.querySelector(".record-btn");
    let stopBtn = document.querySelector(".stop-btn");
    let mediaDevices = navigator.mediaDevices;
    camStream.muted = true;

    mediaDevices.getUserMedia({video: true, audio: true,})
      .then((stream) => {
        camStream.srcObject = stream;
        camStream.addEventListener("loadedmetadata", () => {
          camStream.play();
        })
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        }

        mediaRecorder.onstop = () => {
          console.log("recorder stopped.");
    
          const clip = 'test';
    
          const clipContainer = document.createElement("div");
          const clipLabel = document.createElement("p");
          const audio = document.createElement("audio");
          const displayVid = document.createElement("video");
          const dlLink = document.createElement("a");
    
          clipLabel.textContent = clip;
    
          const blob = new Blob(chunks, { type: "video/mp4" });
          chunks = [];
          const vidURL = window.URL.createObjectURL(blob);
          displayVid.src = vidURL;
    
          dlLink.href = vidURL;
          dlLink.download = `${clip}.mp4`;
          dlLink.textContent = 'Download video';
          clipContainer.appendChild(displayVid);
          clipContainer.appendChild(clipLabel);
          clipContainer.appendChild(dlLink);
          body.appendChild(clipContainer);
        }
      });

    recBtn.addEventListener("click", () => {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      recBtn.style.background="red";
    });
    // based on https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Using_the_MediaStream_Recording_API
    let chunks = [];

    stopBtn.addEventListener("click", () => {
      mediaRecorder.stop()
      console.log(mediaRecorder.state);
      recBtn.style.background = '';
    });

    
  });

  return (
    <div className='body'>
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
    </div>
  )
}

export default App;