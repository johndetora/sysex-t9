import React from 'react';
import WebMidi from 'webmidi';
import '../App.css';
const MidiPorts = props => {
    WebMidi.enable(function (err) {
        // If midi ports aren't found, log error
        if (err) alert('WebMidi could not be enabled.', err);
        // Otherwise log available midi ports

        let inputPort = WebMidi.inputs[0];
        let outputPort = WebMidi.outputs[0];
        console.log(err);
        props.setInput(inputPort);
        props.setOutput(outputPort);
    }, true);
    return (
        <div className='midi-ports'>
            <span>Input Port: </span>
            <select className='ports' onChange={e => console.log(e)}>
                {WebMidi.inputs.map(port => (
                    <option key={port.id}>{port.name}</option>
                ))}
            </select>

            <span className='output'>Output Port: </span>
            <select className='ports'>
                {WebMidi.outputs.map(port => (
                    <option key={port.id}>{port.name}</option>
                ))}
            </select>
        </div>
    );
};

export default MidiPorts;
