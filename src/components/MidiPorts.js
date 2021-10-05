import React, { useState, useEffect } from 'react';
import WebMidi from 'webmidi';
import '../App.css';
const MidiPorts = props => {
    WebMidi.enable(function (err) {
        // If midi ports aren't found, log error
        if (err) alert('WebMidi could not be enabled.', err);
        let inputPort = WebMidi.inputs[0]; //WebMidi.getInputByName(inputEl.value);
        let outputPort = WebMidi.outputs[0];
        props.setAll([[...WebMidi.inputs], [...WebMidi.outputs]]);

        props.setInput(inputPort);
        props.setOutput(outputPort);
    }, true);

    // useEffect(() => {
    //     console.log('effect');
    //     console.log(totalPorts);
    //     return () => {
    //         console.log('cleanup');
    //     };
    // }, [totalPorts]);

    return (
        <div className='midi-ports'>
            <div>
                <span className='port-label'>Input Port: </span>
                <select
                    className='ports input-ports'
                    onChange={e => {
                        props.setInput(WebMidi.getInputByName(e.target.value));
                    }}
                >
                    {WebMidi.inputs.map(port => (
                        <option key={port.id} id={port.id}>
                            {port.name}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <span className='port-label'>Output Port: </span>
                <select
                    className='ports output-ports'
                    onChange={e => {
                        props.setOutput(WebMidi.getOutputByName(e.target.value));
                    }}
                >
                    {WebMidi.outputs.map(port => (
                        <option key={port.id}>{port.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default MidiPorts;
