import React, { useState } from "react";
import './App.css'
import { Button } from "./Components/Button";
import { ChatMessage } from "./Components/ChatMessage";
import { ScrollContainer } from "./Components/ScrollContainer";

export default function App() {
  const [numItems, setNumItems] = useState(5);

  return (
    <div className="h-screen w-full bg-gray-900 p-5">
      <div className="border-2 border-white h-48 w-48 rounded-lg">
        <ScrollContainer scrollCta="New message!">
          {Array.from(Array(numItems).keys()).map((n) => (
            <ChatMessage message={`Message ${n + 1}`} key={`message-${n}`} />
          ))}
        </ScrollContainer>
      </div>
      <div className="mt-2">
        <Button onClick={() => setNumItems(numItems + 1)}>Add Item</Button>
      </div>
    </div>
  );
}

