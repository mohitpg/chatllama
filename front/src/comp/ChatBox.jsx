import "./ChatBox.css"
export const ChatBox = (props) => {
    const arr = props.message2.split(/<br \/>/);
    const resultArr = [];
    arr.forEach((item, i) => {
      resultArr.push(item);
      resultArr.push(<br />);     
    });
    return (
      <div className="chatmain">
        <div className="chatuser" >{props.message}</div>
        <div className="chatmachine">{resultArr}</div>
      </div>
    );
  };