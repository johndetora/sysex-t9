import React, { useEffect, useState } from 'react';
import noteTranslator from './NoteTranslator';

//TODO: make the monitor show every midi device and port then have them clickable to show or hide different ports
// I can filter out the log data based on port name, and it matching the columns
function Monitor({ input, output, hex, allPorts, showMonitor, setShowMonitor }) {
    const [log, setLog] = useState([]);
    const [inputPorts, setInputPorts] = useState(allPorts[0]);
    const [availablePorts, setAvailablePorts] = useState(allPorts[0]);
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
    // function setGroups() {
    //     const result = [];
    //     const grouped = allMessages.reduce((groupedPorts, message) => {
    //         const name = message.port;
    //         if (groupedPorts[name] == null) groupedPorts[name] = [];
    //         groupedPorts[name].push({ time: message.time, message: message.message });
    //         return groupedPorts;
    //     }, {});
    // }

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

    function clickHandler(e) {
        console.log(e.target.id);
        const target = e.target.id;
        setInputPorts(prev => prev.filter(port => port.name !== target));
        console.log(inputPorts);
    }

    function selectHandler(e) {
        console.log(e.target.value);
        console.log(allPorts);
        const target = e.target.value;
        setInputPorts(
            prev => [...prev],
            allInputs.filter(port => port.name === target)
        );
    }

    const classColors = ['cyan', 'violet', 'magenta', 'orange'];
    // console.log(allPorts);
    return (
        <div className='monitor-container'>
            <button className='button monitor-title' onClick={() => setShowMonitor(!showMonitor)}>
                MIDI Monitor <span className='orange'> x</span>
            </button>

            {/* <span className='port-select-container'>
                Add Port:
                <select className='port-select' onChange={selectHandler}>
                    {availablePorts.map(port => (
                        <option key={port.id}>{port.name}</option>
                    ))}
                </select>
            </span> */}
            <div className='monitor-content'>
                {/* 
                The following maps all available midi ports and creates a column 
                of messages if the message's port property matches one of the inputs
                
                */}
                {inputPorts.map((port, index) => (
                    <div key={port.id} className='columns-container'>
                        <div id={port.name} className={`midi-port ${classColors[index]}`}>
                            {port.name}
                        </div>
                        <div key={port.id} className={`monitor-column`}>
                            {log.map(msg => {
                                if (msg.port === port.name) {
                                    return (
                                        <div className='midi-message' key={msg.time}>
                                            {/* <div>{msg.port}</div> */}
                                            <div id='midi-input-msg'>{msg.message}</div>
                                            {msg.message.length === 3 ? (
                                                <div id='midi-input-note'>{`( ${noteTranslator(msg.message[1])} )`}</div>
                                            ) : (
                                                <div></div>
                                            )}
                                            <div id='midi-input-time'>{msg.time}</div>
                                        </div>
                                    );
                                }
                                return '';
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Monitor;
