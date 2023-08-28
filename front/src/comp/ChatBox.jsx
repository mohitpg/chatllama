export const ChatBox = (props) => {
    return (
      <div style={{"paddingTop":"0.5rem","paddingBottom":"0.5rem","paddingLeft":"0.5rem","paddingRight":"1.25rem"}}>
        <div style={{"padding":"0.5rem","borderRadius":"0.5rem","color":"#ffffff","backgroundColor":"#047857"}}>{props.message}</div>
        <div style={{"padding":"0.5rem","borderRadius":"0.5rem","color":"#ffffff","backgroundColor":"#047857"}}>{props.message2}</div>
      </div>
    );
  };