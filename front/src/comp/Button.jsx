import "./Button.css"
export const Button = (props) => {
  const submitHandler=(e)=>{
    e.preventDefault();
    props.ontouch([1,2]);
  }
  return (
      <button
        type="button"
        onClick={submitHandler}
        className="submitButton">
        {props.children}
      </button>
    );
  };