import React, { useState } from "react";
import './App.css'
import { Button } from "./comp/Button";
import { ChatBox } from "./comp/ChatBox";
import { ScrollContainer } from "./comp/ScrollContainer";

export default function App() {
  const [numItems, setNumItems] = useState(5);

  return (
    <div style={{"padding":"1.25rem","width":"100%","height":"100vh","backgroundColor":"#111827"}}>
      <div className="box">
        <ScrollContainer scrollCta="New message!">
          {Array.from(Array(numItems).keys()).map((n) => (
            <ChatBox message={`Message ${n + 1}`} key={`message-${n}`} />
          ))}
        </ScrollContainer>
      </div>
      <div style={{"marginTop":"0.5rem"}}>
        <Button onClick={() => setNumItems(numItems + 1)}>Add Item</Button>
      </div>
    </div>
  );
}

