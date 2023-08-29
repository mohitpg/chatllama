import "./ChatBox.css"
export const ChatBox = (props) => {
    return (
      <div className="chatmain">
        <div className="chatuser" >{props.message}</div>
        <div className="chatmachine">{props.message2}</div>
      </div>
    );
  };