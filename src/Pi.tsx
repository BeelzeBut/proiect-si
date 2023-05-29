import React, { useState, useEffect } from "react";
import axios from 'axios'; // Using axios for http requests

type Pin = {
    id: number;
    state: boolean;
}

function Pi() {
    const [pins, setPins] = useState<Pin[]>([]);
    const [loading, setLoading] = useState(false);
    let ws: WebSocket;

    useEffect(() => {
        ws = new WebSocket("wss://localhost:80");

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data && Array.isArray(data)) {
                setPins([...pins, ...data as Pin[]]);
            }
        };

        return () => {
            ws.close();
        };
    }, []);

    const handlePinClick = async (id: number) => {
        setLoading(true);
        const updatedPins = pins.map(pin => pin.id === id ? { ...pin, state: !pin.state } : pin);

        try {
            const response = await axios.post("https://localhost:80/getstate", updatedPins);
            if (response.status === 200) {
                setPins(updatedPins);
            }
        } catch (error) {
            console.error("Error updating pin states: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={'raspberry-pi'}>
            <h1 style={{opacity: 0}}>Raspberry Pi Model</h1>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="pin-container">
                    {pins.map(pin => (
                        <div
                            key={pin.id}
                            className={`pin pin-${pin.id} pin-${pin.state ? 'green' : 'red'}`}
                            onClick={() => handlePinClick(pin.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Pi;
