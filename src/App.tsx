import React, { useState } from 'react';
import './App.css'

type Pin = {
  id: number;
  state: boolean;
}

function App() {
  // Set the initial state of the pins
  const [pins, setPins] = useState(() => {
    let pins: Pin[] = [];
    for(let i = 0; i < 40; i ++) {
      pins.push({
        id: i,
        state: true,
      })
    }

    return pins;
  });

  // Function to toggle the color of a pin
  const handlePinClick = (id: any) => {
    setPins(prevPins => prevPins.map(pin => {
      if (pin.id === id) {
        return { ...pin, color: pin.state = !pin.state };
      }
      return pin;
    }));
  };

  return (
      <div className={'raspberry-pi'}>
        <h1 style={{opacity: 0}}>Raspberry Pi Model</h1>
        <div className="pin-container">
          {pins.map(pin => (
              <div
                  key={pin.id}
                  className={`pin pin-${pin.id} pin-${pin.state ? 'green' : 'red'}`}
                  onClick={() => handlePinClick(pin.id)}
              />
          ))}
        </div>
      </div>
  );
}

export default App;
