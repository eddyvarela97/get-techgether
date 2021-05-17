// credits for the timer functionality https://www.youtube.com/watch?v=ZVOGPvo08zM
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#000000',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#FFF',
    fontFamily: 'IBM Plex Mono',
    fontSize: '16',
  },
});

const App = () => {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('May 20, 2021 19:00:00').getTime();
    interval = setInterval(()=>{
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
      const minutes = Math.floor(distance % (1000 * 60 * 60) / (1000 * 60));
      const seconds = Math.floor(distance % (1000 * 60) / (1000));

      if(distance < 0) { 
        //stop out timer
        clearInterval(interval.current);
      } else {
        //update timer
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  //component did mount
  useEffect(()=> {
    startTimer();
    return() =>{
      clearInterval(interval.current)
    }
  })

  const classes = useStyles();
  return (
    <div className={classes.container}>
      <h1 className={classes.text}>Hola mundo</h1>
      <h2 className={classes.text}>Esto es Get Techgether!</h2>
      <h3 className={classes.text}>{`days: ${timerDays} | hours: ${timerHours} | minutes: ${timerMinutes} | seconds: ${timerSeconds}`}</h3>
    </div>
  );
};

export default App;
