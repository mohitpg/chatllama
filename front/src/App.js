import React, { useState } from "react";
import './App.css'
import FormPrompt from "./comp/FormPrompt";
import Audiobar from "./comp/Audiobar"
import { ChatBox } from "./comp/ChatBox";
import { ScrollContainer } from "./comp/ScrollContainer";

export default function App() {
  const [numItems, setNumItems] = useState([["testin","attention please"],[2,3]]);
  const additem=(data) => {
    setNumItems(prev =>{
      let arrtemp=structuredClone(prev);
      let n=arrtemp.length
      if(arrtemp[n-1][1]==="Thinking..."){
        arrtemp[n-1][1]=data[1];
      } 
      else arrtemp=[...prev,data];
      return arrtemp;
    }
    );
  };
  return (
    <div className="main">
      <div className="box">
        <ScrollContainer scrollCta="New message!">
          {
            numItems.map(([user,machine]) =>(
              <ChatBox message={user} message2={machine} key={user} />
            ))
          }
        </ScrollContainer>
      </div>
      <FormPrompt ontouch={additem} />
      <Audiobar ontouch={additem} />
    </div>
  );
}

