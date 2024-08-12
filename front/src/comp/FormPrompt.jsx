import Form from "react-bootstrap/Form"
import InputGroup from 'react-bootstrap/InputGroup'
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button"
import axios from 'axios';
import {useRef,useState} from "react";

const FormPrompt = (props) =>{
    const ref=useRef(null);
    const [disable,setDisable]=useState(false);
    const submitHandler= async (event)=>{
        event.preventDefault();
        const form = event.currentTarget;
        setDisable(true);
        if (form.checkValidity()===true){ 
            const prompt=[event.target.elements.forminput.value,0];
            props.ontouch([prompt[0],"Thinking..."]);
            const response=await axios.post('/text',JSON.stringify(prompt),{
              headers: {
                'Content-Type':'application/json',
              }
            });
            console.log(response.data);
            props.ontouch([prompt[0],response.data]);
        }
        setDisable(false);
        ref.current.value="";
      }
      return (
        <Form noValidate onSubmit={submitHandler} style={{"display":"inline"}}>
          <Form.Group as={Col} md="4" style={{"margin": "0.5rem auto 0% auto","display":"inline-block"}} controlId="validationCustomUsername">
          <InputGroup hasValidation>
            <Form.Control
              ref={ref}
              type="text"
              placeholder="Your Prompt"
              name="forminput"
              aria-describedby="inputGroupPrepend"
              required
              style={{"box-shadow":"none"}}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a prompt.
            </Form.Control.Feedback>
            <Button variant="outline-light" type="submit" disabled={disable} style={{"box-shadow":"none"}}>Submit</Button>
          </InputGroup>
        </Form.Group>
          {props.children}
        </Form>
        );
};
export default FormPrompt;