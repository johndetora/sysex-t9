import React, { useState } from 'react';
import MidiPorts from './components/MidiPorts';
import ExcelReader from './components/ReadExcel';
import ExportExcel from './components/ExportExcel';
import HelpButton from './components/HelpButton';
import Window from './components/Window';
import CopyButton from './components/CopyButton';
import SendButton from './components/SendButton';
import Monitor from './components/Monitor';
import './Header.css';
import './App.css';
import './Monitor.css';

//TODO: move button styling to own file, change import order to remove !important flags
//TODO: error handling for if no sysex, or remove sysex button if no data
//TODO: clear response and reset sent state

function App() {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [viewHelp, setViewHelp] = useState(true);

    function clickHandler(e) {
        console.log('test', e);
        const target = parseInt(e.target.id);

        // e.target.innerText = 'sent';
        // e.target.classList.add('sent');
        // e.target.classList.add('sent');

        // console.log('click target', target);

        // Finds cell sysex message based on the target ID, which matches the index
        let msg = items[target].sysex;
        let byteArray = msg.split(' ');

        // Converts proper hex format, then to decimal so that message can be read by the computer
        const message = byteArray.map(el => {
            el = '0x' + el;
            return parseInt(Number(el, 10));
        });

        // Get the status byte and remove it from the message while storing it in this variable
        const statusByte = message.splice(0, 1);
        const fullMsg = `${statusByte},${message}`;

        // Do not send if output does not include the terminator byte
        // if (!message.includes(247)) {
        // return alert('Not a valid SysEx message');
        // }
        // Send to output if one is available

        if (output) {
            output.send(statusByte, message);
            receiveSysex(target); // Full message is sent for easy logging
            console.group('LOG');
            console.log(`SENT ${fullMsg} (${fullMsg.length} bytes) to ${output.name} port`);
        } else {
            alert('No MIDI output port selected');
        }
    }

    function receiveSysex(target) {
        input.addListener('sysex', 'all', e => {
            console.log(e);
            const reply = [...e.data];
            // Log I/O
            if (!reply) alert('No SysEx received. Check MIDI Port');
            // console.group('Success');
            console.log(`RECEIVED ${reply} (${reply.length} bytes) at ${input.name} port`);
            console.groupEnd('LOG');

            if (reply) {
                updateData(target, decimalToHex(reply));
            }
        });
    }

    function decimalToHex(reply) {
        const converter = reply.map(el => {
            el = el.toString(16) + ' ';
            if (el.length === 2) el = '0' + el;
            return el.toUpperCase();
        });
        return converter;
    }

    function byteComparison(message) {
        return message.length;
    }

    function updateData(target, response) {
        input.removeListener('sysex', 'all'); // Remove the event listener so that they aren't created every button press

        setItems(prev => {
            const newitems = prev.map(entry => {
                if (entry.index === target) {
                    entry.response = response;
                    entry.expectedLength = entry.expected.split(' ').length;
                    entry.responseLength = byteComparison(response);
                }
                if (entry.responseLength === entry.expectedLength) {
                    entry.passFail = 'pass';
                }
                if (entry.responseLength !== entry.expectedLength) {
                    entry.passFail = 'fail';
                }
                return entry;
            });
            target = null;
            return newitems;
        });
    }

    return (
        <div className='container'>
            <p className='title'>Sysex Tester v0.2.0</p>
            <div className='utilities'>
                <ExcelReader setItems={setItems} setHelp={setViewHelp} help={viewHelp} />
                <ExportExcel data={items} />
                <MidiPorts setInput={setInput} setOutput={setOutput} input={input} output={output} />
                <HelpButton help={viewHelp} setHelp={setViewHelp} />
            </div>
            {viewHelp ? <Window /> : ''}
            <div className='main-container'>
                <table className='table-container'>
                    <thead>
                        <tr className={items.length > 2 ? 'table-header' : 'invisible'}>
                            <th className='header__item'>Message Type</th>
                            <th>Port</th>
                            <th>Test</th>
                            <th>Expected Behavior</th>
                            <th>SysEx to Send</th>
                            <th>Expected Response</th>
                            <th>Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((data, index) => (
                            <tr key={index} className={data.port === undefined ? 'table_section' : 'table_row'}>
                                <td className='msg_name'>{data.name}</td>
                                <td className='port'>{data.port}</td>
                                {/* Sysex Column */}
                                <td className='description'>{data.test}</td>
                                <td className='behavior'>{data.behavior}</td>
                                <td className='sysex-container'>
                                    <div className={data.sysex ? 'sysex-cell' : 'invisible'}>
                                        {data.sysex}
                                        <SendButton id={index} onClick={clickHandler} />
                                        {/* <button className={data.sysex ? 'send-button button' : 'invisible'} id={index} onClick={clickHandler}>
                                            send{' '}
                                        </button> */}
                                    </div>
                                </td>

                                <td className='long expected'>
                                    <div className='overflow'>
                                        {data.expected}
                                        <div className={data.passFail === 'pass' ? 'pass' : 'fail'}>
                                            {data.expectedLength ? `Expected: ${data.expectedLength} bytes` : ''}
                                        </div>
                                    </div>
                                </td>
                                <td className='long response'>
                                    <div className='overflow'>
                                        {data.response}
                                        <div className={data.passFail === 'pass' ? 'pass' : 'fail'}>
                                            {data.responseLength ? `Response: ${data.responseLength} bytes` : ''}
                                        </div>
                                    </div>
                                    {data.responseLength > 1 ? <CopyButton data={data.response} dataLength={data.responseLength} /> : undefined}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {input ? <Monitor input={input} output={output} hex={decimalToHex} /> : ''}
            <footer>© Copyright 2021 John DeTora. All rights reserved.</footer>
        </div>
    );
}

export default App;
