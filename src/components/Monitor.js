import React, { useEffect, useState } from 'react';
import noteTranslator from './NoteTranslator';

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
                // const name = e.target.name;
                allMessages.push({ port: e.target.name, time: timestamp, message: reply });
                // setLog([...allMessages]);

                // console.table(allMessages);
                setLog([...allMessages]);
                // console.log(allMessages);
                // console.log(allMessages);
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
        // for (const [key, value] of Object.entries(grouped)) {
        //     // console.log(`${key}: ${value}`);
        //     result.push({ name: key, messages: value });
        // }
        // console.log(result);
        console.log(grouped);
        // setLog(grouped);
        // console.log(names);
        // setLog(grouped);
    }

    // Makes the log scroll to the bottom automatically
    function logScroll() {
        let logEl = document.querySelectorAll('.monitor-column');
        logEl.forEach(col => (col.scrollTop = col.scrollHeight));
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
            <div className='monitor-title'>MIDI MONITOR</div>

            <div className='monitor-content'>
                {/* 
                The following maps all available midi ports and creates a column 
                of messages if the message's port property matches one of the inputs
                
            
                */}
                {allInputs.map(port => (
                    <div key={port.id} className='monitor-column'>
                        {log.map(msg => {
                            if (msg.port === port.name) {
                                return (
                                    <div className='midi-message' key={msg.time}>
                                        <div>{msg.port}</div>
                                        <div>{msg.message}</div>
                                        <div>{`(${noteTranslator(msg.message[1])})`}</div>
                                        <div>{msg.time}</div>
                                    </div>
                                );
                            }
                            return '';
                        })}
                    </div>
                ))}

                {/* <div className='monitor-column'>
                    {log.map(msg => (
                        <div className='midi-message' key={msg.time}>
                            <div>{msg.port}</div>
                            <div>{msg.message}</div>
                            <div>{`(${msg.message[1]})`}</div>
                            <div>{msg.time}</div>
                        </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
}

export default Monitor;
