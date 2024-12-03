import "./ChatBox.css"
export const ChatBox = (props) => {
    const resultArr = [];
    if (props.message2.slice(0,4) === "\/9j\/"){
      resultArr.push(<img src={`data:image/jpeg;base64,${props.message2}`} width="256" height="256" style={{"display":"block" ,"marginLeft":"auto" ,"marginRight":"auto"}}/>);
    }
    else{
      const arr = props.message2.split(/<br \/>/);
      arr.forEach((item, i) => {
        resultArr.push(item);
        resultArr.push(<br />);     
      });
    }
    
    //console.log(resultArr)
    return (
      <div className="chatmain">
        <div className="chatuser" >{props.message}</div>
        <div className="chatmachine">{resultArr}</div>
      </div>
    );
  };