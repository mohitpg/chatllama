import React, { useState } from "react";
import './App.css'
import FormPrompt from "./comp/FormPrompt";
import Audiobar from "./comp/Audiobar"
import FileUpload from "./comp/FileUpload"
import { ChatBox } from "./comp/ChatBox";
import { ScrollContainer } from "./comp/ScrollContainer";
import Button from "react-bootstrap/esm/Button";

export default function App() {
  const [numItems, setNumItems] = useState([]);
  const additem=(data) => {
    setNumItems(prev =>{
      let arrtemp=structuredClone(prev);
      let n=arrtemp.length
      if(n>0 && arrtemp[n-1][1]==="Thinking..."){
        arrtemp[n-1][1]=data[1];
      } 
      else arrtemp=[...prev,data];
      return arrtemp;
    }
    );
  };
  return (
    <div className="main">
      <h2 id="heading">Enter a prompt or record it to get started!</h2>
      <div className="box">
        <ScrollContainer scrollCta="New message!">
          {
            numItems.map(([user,machine]) =>(
              <ChatBox message={user} message2={machine} key={user} />
            ))
          }
        </ScrollContainer>
      </div>
      <FileUpload />
      <FormPrompt ontouch={additem} />
      <Button className="or" style={{"display":"inline-block"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OR&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
      <Audiobar ontouch={additem} />
    </div>
  );
}

