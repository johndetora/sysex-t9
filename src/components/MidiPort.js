import React from 'react';
import WebMidi from 'webmidi';
import '../App.css';
const MidiPorts = props => {
    const inputEl = document.querySelector('.input-ports');

    WebMidi.enable(function (err) {
        // If midi ports aren't found, log error
        if (err) alert('WebMidi could not be enabled.', err);
        let inputPort = WebMidi.inputs[0]; //WebMidi.getInputByName(inputEl.value);
        let outputPort = WebMidi.outputs[0];

        props.setInput(inputPort);
        props.setOutput(outputPort);
    }, true);

    return (
        <div className='midi-ports'>
            <span>Input Port: </span>
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

            <span className='output'>Output Port: </span>
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
    );
};

export default MidiPorts;
