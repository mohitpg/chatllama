import { useState, useRef } from "react";
import axios from "axios"
import Button from "react-bootstrap/Button"
import "./Audiobar.css"

const Audiobar = (props) => {
    const mimeType = "audio/mp3";
    const [permission, setPermission] = useState(false);
    const mediaRecorder = useRef(null);
    const [recordingStatus, setRecordingStatus] = useState("inactive");
    const [stream, setStream] = useState(null);
    const [audioChunks, setAudioChunks] = useState([]);
    const [audio, setAudio] = useState(null);
    const [load, setLoad] = useState(false);

    const sendAudioFile = async (file) => {
        const formData = new FormData();
        formData.append('audio-file', file);
        const response=await axios.post('/sound',formData);
        console.log(response.data);
        const prompt=[response.data.text,0];
        props.ontouch([prompt[0],"Thinking..."]);
        const res=await axios.post('/text',JSON.stringify(prompt),{
          headers: {
            'Content-Type':'application/json',
          }
        });
        setLoad(false);
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
           setLoad(true);
           const audioUrl = URL.createObjectURL(audioBlob);
           setAudio(audioUrl);
           setAudioChunks([]);
        };
    };
    return (
        <div className="audio-controls" style={{"display":"inline-block"}}>
            {!permission ? (
            <Button onClick={getMicrophonePermission} className="record" type="button">
                Record Audio
            </Button>
            ) : null}
            {permission && recordingStatus === "inactive" ? (
            <Button onClick={startRecording} type="button" className="record" disabled={load}>
                Start Recording
            </Button>
            ) : null}
            {recordingStatus === "recording" ? (
            <Button onClick={stopRecording} className="record" type="button">
                Stop Recording
            </Button>
            ) : null}
            {load===true ? (
                <img src="https://raw.githubusercontent.com/mohitpg/chatllama/17cfa53ca740a2573e51f34699bbbff5037c03d7/front/public/loader.gif?token=GHSAT0AAAAAACFNUYK5G3BFZWGDGN4HTHWCZHO6S6Q" alt="Loading" style={{"height": "1rem","width": "1rem","margin-left":"0.5rem"}} />
            ) : null}
        </div>
    );
};
export default Audiobar;