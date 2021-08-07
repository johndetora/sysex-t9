import React, { useEffect, useState } from 'react';

//TODO: make the monitor show every midi device and port then have them clickable to show or hide different ports
// I can filter out the log data based on port name, and it matching the columns
function Monitor({ input, output, hex, allPorts }) {
    const [log, setLog] = useState([]);
    const allMessages = [];
    const allInputs = allPorts[0];
    const allOutputs = allPorts[1];

    function logData() {
        allInputs.forEach((inp, index) => {
            inp.addListener('midimessage', 'all', e => {
                const reply = hex([...e.data]);
                const timestamp = parseInt(e.timestamp);
                const name = e.target.name;
                allMessages.push({ port: e.target.name, time: timestamp, message: reply });
                // setLog([...allMessages]);

                // console.table(allMessages);
                setLog([...allMessages]);
                console.log(allMessages);
                logScroll();
                // setGroups();
            });
        });
    }
    function setGroups() {
        const result = [];
        const grouped = allMessages.reduce((groupedPorts, message) => {
            const name = message.port;
            if (groupedPorts[name] == null) groupedPorts[name] = [];
            groupedPorts[name].push({ time: message.time, message: message.message });
            return groupedPorts;
        }, {});

        // names.map(el => {
        for (const [key, value] of Object.entries(grouped)) {
            // console.log(`${key}: ${value}`);
            result.push({ name: key, messages: value });
        }
        console.log(result);
        setLog(result);
        // console.log(names);
        // setLog(grouped);
    }

    // Makes the log scroll to the bottom automatically
    function logScroll() {
        let logEl = document.querySelector('.monitor-content');
        logEl.scrollTop = logEl.scrollHeight;
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

    // console.log(allPorts);
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
                {}

                {/* {log.map(msg => (
                    <div className='midi-message' key={msg.time}>
                        <div>{msg.port}</div>
                        <div>{msg.message}</div>
                        <div>{msg.time}</div>
                    </div>
                ))} */}
            </div>
        </div>
    );
}

export default Monitor;
