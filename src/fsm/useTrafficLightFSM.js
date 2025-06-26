import { useState, useEffect, useRef } from 'react';
import trafficLightFSM from './trafficLightFSM';

export default function useTrafficLightFSM(initialState = 'red') {
  const [currentState, setCurrentState] = useState(initialState);
  const [secondsLeft, setSecondsLeft] = useState(trafficLightFSM[initialState].duration);
  const [isRunning, setIsRunning] = useState(false);

  const countdownRef = useRef(trafficLightFSM[initialState].duration);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(performance.now());

  const runningFSM = (timestamp) => {
    if (!isRunning) return;

    const elapsed = (timestamp - lastTimeRef.current) / 1000;
    if (elapsed >= 1) {
      const passed = Math.floor(elapsed);
      countdownRef.current -= passed;
      lastTimeRef.current = timestamp;

      if (countdownRef.current <= 0) {
        const next = trafficLightFSM[currentState].next;
        setCurrentState(next);
        countdownRef.current = trafficLightFSM[next].duration;
      }

      setSecondsLeft(countdownRef.current);
    }

    requestRef.current = requestAnimationFrame(runningFSM);
  };

  useEffect(() => {
    if (isRunning) {
      lastTimeRef.current = performance.now();
      requestRef.current = requestAnimationFrame(runningFSM);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning, currentState]);

  const toggleStartPause = () => setIsRunning(prev => !prev);

  const handleReset = () => {
    setIsRunning(false);
    setCurrentState('red');
    setSecondsLeft(trafficLightFSM['red'].duration);
    countdownRef.current = trafficLightFSM['red'].duration;
  };

  return {
    currentState,
    secondsLeft,
    isRunning,
    toggleStartPause,
    handleReset,
  };
}
