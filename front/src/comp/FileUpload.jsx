import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios';

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
        formData.append('pdf',event.target.files[0]);
        const response=await axios.post('http://localhost:5000/fupload',formData);
        console.log(response)
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