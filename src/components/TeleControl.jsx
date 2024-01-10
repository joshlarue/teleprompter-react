
function TeleControl() {
  document.addEventListener("DOMContentLoaded", () => {
    let recBtn = document.querySelector(".record-btn");
    let stopBtn = document.querySelector(".stop-btn");
    let startCam = document.querySelector(".camera-start");
    let camStream = document.querySelector(".camera-stream");
    let mediaRecorder;
    let mediaDevices = navigator.mediaDevices;
    camStream.muted = true;

    let chunks = [];

    startCam.addEventListener("click", () => {
      mediaDevices.getUserMedia({video: true, audio: true,})
      .then((stream) => {
        camStream.srcObject = stream;
        camStream.addEventListener("loadedmetadata", () => {
          camStream.play();
        })
        mediaRecorder = new MediaRecorder(stream);
      });
    })
  
    recBtn.addEventListener("click", () => {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      recBtn.style.background="red";
      chunks = [];
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      }
    });
  
    stopBtn.addEventListener("click", () => {
      mediaRecorder.stop()
      console.log(mediaRecorder.state);
      recBtn.style.background = '';
      mediaRecorder.onstop = () => {
        console.log("recorder stopped.");
    
        const clipLabel = document.createElement("p");
        const displayVid = document.createElement("video");
        displayVid.controls = true;
        const dlLink = document.createElement("a");
        clipContainer.appendChild(displayVid);
        clipContainer.appendChild(clipLabel);
        clipContainer.appendChild(dlLink);
    
        const blob = new Blob(chunks, { type: "video/mp4" });
        console.log(blob);
        chunks = [];
        const vidURL = window.URL.createObjectURL(blob);
        displayVid.src = vidURL;
        clipLabel.textContent = vidURL;
  
        dlLink.href = vidURL;
        dlLink.download = `${vidURL}.mp4`;
        dlLink.textContent = 'Download video';
      }
    });
  })




  return (
    <>
      <video className="camera-stream"></video>
      <div className="control-btns">
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
    <div className="clip-container">
    </div>
  </>
  )
}

export default TeleControl;