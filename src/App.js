import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Typography, Button, Box } from '@mui/material';

function App() {
  const [values,setValues] = React.useState("Click on the start button and start speaking.");
  const [disabledButton,setDisabledButton] = React.useState(false);
  var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  var recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.onspeechend = function(event){
    setDisabledButton(false)
  }
  recognition.onresult = function(event) {
    console.log("Value is "+event.results[0][0].transcript)
    setValues(event.results[0][0].transcript)
  }


  return (
    <React.Fragment>
      <Typography align='center' variant="h1">
        Filler word helper
      </Typography>

      <Box sx={{
        backgroundColor:'gray',
        maxWidth:'md',
        margin:'auto',
        minHeight:200,
      }}>
        <Typography style={{
          paddingLeft:'2%',
          paddingRight:'2%'
        }} color="white">
          {values}
        </Typography>
      </Box>

      <Box sx={{
        display:'flex',
        justifyContent:'space-around',
        paddingTop:'2%'
      }}>
        <Button 
        onClick={()=>{
          recognition.start()
          setDisabledButton(true)
        }}
        color={'success'}
        variant="contained"
        >Start</Button>

        <Button 
        onClick={()=>{
          setValues("Click on the start button and start speaking.")
        }}
        variant="contained"
        >Clear</Button>

        <Button 
        disabled={disabledButton}
        onClick={()=>{
          recognition.abort()
          recognition.stop()
          console.log("Stop pressed")
        }}
        color={'error'}
        variant="outlined"
        >Stop</Button>

      </Box>
    </React.Fragment>
  );
}

export default App;
