import { useState, useRef } from "react";
import axios from "axios"
const Audiobar = (props) => {
    const mimeType = "audio/mp3";
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);

    const sendAudioFile = async (file) => {
        const formData = new FormData();
        formData.append('audio-file', file);
        const response=await axios.post('http://localhost:5000/sound',formData);
        console.log(response.data);
        const prompt=[response.data.text,0];
        props.ontouch([prompt[0],"Thinking..."]);
        const res=await axios.post('http://localhost:5000/',JSON.stringify(prompt),{
          headers: {
            'Content-Type':'application/json',
          }
        });
        console.log(res.data);
        props.ontouch([prompt[0],res.data]);
      };
    const getMicrophonePermission = async () => {
        if("MediaRecorder" in window) {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false,
            });
            setPermission(true);
            setStream(streamData);
        } else {
            alert("The MediaRecorder API is not supported in your browser.");
        }
    };
    const startRecording = async () => {
        setRecordingStatus("recording");
        const media = new MediaRecorder(stream, { type: mimeType });
        mediaRecorder.current = media;
        mediaRecorder.current.start();
        let localAudioChunks = [];
        mediaRecorder.current.ondataavailable = (event) => {
           if (typeof event.data === "undefined") return;
           if (event.data.size === 0) return;
           localAudioChunks.push(event.data);
        };
        setAudioChunks(localAudioChunks);
    };
    const stopRecording = () => {
        setRecordingStatus("inactive");
        mediaRecorder.current.stop();
        mediaRecorder.current.onstop = () => {
           const audioBlob = new Blob(audioChunks, { type: mimeType });
           sendAudioFile(audioBlob);
           const audioUrl = URL.createObjectURL(audioBlob);
           setAudio(audioUrl);
           setAudioChunks([]);
        };
    };
    return (
        <div>
            <main>
                <div className="audio-controls">
                    {!permission ? (
                    <button onClick={getMicrophonePermission} type="button">
                        Get Microphone
                    </button>
                    ) : null}
                    {permission && recordingStatus === "inactive" ? (
                    <button onClick={startRecording} type="button">
                        Start Recording
                    </button>
                    ) : null}
                    {recordingStatus === "recording" ? (
                    <button onClick={stopRecording} type="button">
                        Stop Recording
                    </button>
                    ) : null}
                </div>
            </main>
        </div>
    );
};
export default Audiobar;