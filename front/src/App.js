import React, { useState } from "react";
import './App.css'
import { Button } from "./comp/Button";
import { ChatBox } from "./comp/ChatBox";
import { ScrollContainer } from "./comp/ScrollContainer";

export default function App() {
  const [numItems, setNumItems] = useState([["testin","attention please"],[2,3]]);
  const additem=(data) => {
    console.log(data);
    setNumItems(prev =>
      [...prev,data]
    );
    console.log(numItems);
  };
  return (
    <div className="main">
      <div className="box">
        <ScrollContainer scrollCta="New message!">
          {/* {Array.from(Array(numItem).keys()).map((n) => (
            <ChatBox message={`Message ${n + 1}`} key={`message-${n}`} />
          ))} */}
          {console.log(numItems)}
          {
            numItems.map(([user,machine]) =>(
              <ChatBox message={user} message2={machine} key={user} />
            ))
          }
        </ScrollContainer>
      </div>
      <div style={{"textAlign":"center"}}>
        <Button ontouch={additem}>Add Item</Button>
      </div>
    </div>
  );
}

