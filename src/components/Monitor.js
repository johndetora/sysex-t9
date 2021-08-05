import React, { useEffect, useState } from 'react';

//TODO: make the monitor show every midi device and port then have them clickable to show or hide different ports
// I can filter out the log data based on port name, and it matching the columns
function Monitor({ input, output, hex, allPorts }) {
    const [log, setLog] = useState([]);
    const allMessages = [];
    const allInputs = allPorts[0];
    const allOutputs = allPorts[1];

    function logData() {
        input.addListener('midimessage', 'all', e => {
            const reply = hex([...e.data]);
            const timestamp = parseInt(e.timestamp);
            allMessages.push({ time: timestamp, message: reply, port: e.target.name });
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

    console.log(allPorts);
    return (
        <div className='monitor-container'>
            <span className='monitor-title'>MIDI MONITOR</span>
            <div className='monitor-ports'>
                {allInputs.map(port => (
                    <div className='midi-port' key={port.id}>
                        {port.name}
                    </div>
                ))}
                {/* <span>{log}</span> */}
            </div>
            <div className='monitor-content'>
                {log.map(msg => (
                    <div className='midi-message' key={msg.time}>
                        <div>{msg.port}</div>
                        <div>{msg.message}</div>

                        <div>{msg.time}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Monitor;
