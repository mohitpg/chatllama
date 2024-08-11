import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Store } from 'react-notifications-component'
import axios from 'axios';
import 'react-notifications-component/dist/theme.css'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload() {
    const uploadfile = async(event) =>{
        const formData = new FormData();
        if(event.target.files.length===1){
          formData.append('pdf',event.target.files[0]);
          Store.addNotification({
            message: "Please wait while file is being uploaded",
            type: "warning",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
          const response=await axios.post('http://localhost:5000/fupload',formData);
          Store.addNotification({
            message: "File Uploaded Successfully!",
            type: "success",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
          });
        }
    }
  return (
      <Button
        component="label"
        variant="contained"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
        style={{"margin": "0% 2% 0.25rem 20%","background":"black","fontFamily":"Arial"}}
        sx={{ textTransform: 'none' }}
      >
        Upload file
        <VisuallyHiddenInput type="file" accept="application/pdf" onChange={uploadfile}/>
      </Button>
  );
}