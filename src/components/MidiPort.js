import React from 'react';
import WebMidi from 'webmidi';
import '../App.css';
const MidiPorts = props => {
    WebMidi.enable(function (err) {
        // If midi ports aren't found, log error
        if (err) console.log('WebMidi could not be enabled.', err);
        // Otherwise log available midi ports
        // console.log(WebMidi.inputs);
        // console.log(WebMidi.outputs);
        let inputPort = WebMidi.inputs[0];
        let outputPort = WebMidi.outputs[0];
        props.setInput(inputPort);
        props.setOutput(outputPort);
    }, true);
    return (
        <div>
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
