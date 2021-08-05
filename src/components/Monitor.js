import React, { useEffect, useState } from 'react';

function Monitor({ input, output, hex, allPorts }) {
    const [log, setLog] = useState([]);
    const allMessages = [];

    function logData() {
        input.addListener('midimessage', 'all', e => {
            const reply = hex([...e.data]);
            allMessages.push({ time: e.timestamp, message: reply, port: e.target.name });
            setLog([...allMessages]);
        });
    }

    // input.removeListener('midimessage', 'all');
    useEffect(() => {
        console.log('render');
        logData();
        return () => {
            input.removeListener('midimessage', 'all');
            console.log('unmount');
        };
    }, [input]);

    return (
        <div className='monitor-container'>
            <span className='monitor-title'>MIDI MONITOR</span>
            <div className='monitor-ports'>
                <span>Port: {input.name}</span>
                {/* <span>{log}</span> */}
            </div>
            <div className='monitor-content'>
                {log.map(msg => (
                    <div className='midi-message' key={msg.time}>
                        <div>{msg.port}</div>
                        <div>{msg.message}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Monitor;
