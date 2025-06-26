import React from 'react';
import useTrafficLightFSM from '../fsm/useTrafficLightFSM';

export default function TrafficLight() {
  const {
    currentState,
    secondsLeft,
    isRunning,
    toggleStartPause,
    handleReset,
  } = useTrafficLightFSM();

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <div style={{ width: 60, margin: '0 auto' }}>
        {['red', 'yellow', 'green'].map(color => (
          <div
            key={color}
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              marginBottom: 10,
              backgroundColor: currentState === color ? color : '#ddd',
            }}
          />
        ))}
      </div>

      <div style={{ fontSize: 24, marginTop: 10 }}>
        {secondsLeft}s left
      </div>

      <div style={{ marginTop: 20 }}>
        <button onClick={toggleStartPause}>{isRunning ? 'Pause' : 'Start'}</button>
        <button style={{ marginLeft: 10 }} onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
