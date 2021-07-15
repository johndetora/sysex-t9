import React, { useState } from 'react';
import MidiPorts from './components/MidiPort';
import ExcelReader from './components/ReadExcel';
import Collection from './components/Collection';
import ExportExcel from './components/ExportExcel';
import HelpButton from './components/HelpButton';
import Window from './components/Window';
import './Header.css';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [collection, setCollection] = useState([]);
    const [viewHelp, setViewHelp] = useState(true);

    function addToCollection(e) {
        const value = e.target.value;
        const match = items.filter(item => item.sysex.includes(value));
        setCollection([...collection, match[0]]);
    }

    function clickHandler(e) {
        // console.log(e.target.id);
        console.log(e);
        const target = parseInt(e.target.id);
        // TODO: I should be able to just filter based on the target value and not worry about IDs or changing the function to fit the Collection input
        // Finds cell sysex message based on the target ID, which matches the index
        const value = items
            .filter(cell => cell.index === target)
            .map(cell => cell.sysex)
            .join(' ') // converts it into string
            .split(' '); // converts it into array, but seperated by byte
        value.splice(0, 1); // Removes statusbyte, as that is handled by output.send

        // converts bytes into integer that's readable by computer,
        const message = value.map(el => {
            el = '0x' + el;
            return parseInt(Number(el, 10));
        });
        console.log('sent: (RAW)', message);
        // Send the sysex

        if (output) {
            output.send(0xf0, message);
            receiveSysex(target);
        } else {
            alert('No MIDI output port selected');
        }
    }

    function receiveSysex(target) {
        input.addListener('sysex', 'all', function (e) {
            const reply = [...e.data];
            console.log('received (RAW):', reply);
            console.log('response length is', reply.length);
            // compare length function goes here

            updateData(target, decimalToHex(reply));
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

    // const resultTest = response => {
    //     console.log('RESPONSE TEST :');
    //     console.log(response.length);
    // };

    // Adds response to the items state
    function updateData(target, response) {
        const result = items.map(item => {
            if (item.index === target) {
                // So that the response isn't appended into the cell every time it's retested
                if (item.response.indexOf('F0') === -1) {
                    item.response += response;
                }
                //TODO: this function is doing multiple things not described by it's name.  consider breaking up
                // Sets expected length
                if (!item.expectedLength) {
                    item.expectedLength += item.expected.split(' ').length;
                }

                if (!item.responseLength) {
                    item.responseLength += byteComparison(response);
                }

                if (item.responseLength === item.expectedLength) {
                    item.passFail = 'pass';
                    console.table(item);
                }
            }
            return item;
        });

        console.log('sysex response: ' + response.join(''));
        setItems(result);
    }

    return (
        <div className='container'>
            <p className='title'>Sysex T9</p>
            <div className='utilities'>
                <ExcelReader setItems={setItems} help={setViewHelp} />
                {/* <ExportExcel data={items} /> */}
                <MidiPorts setInput={setInput} setOutput={setOutput} input={input} output={output} />
                <ExportExcel data={items} />
                <HelpButton help={viewHelp} setHelp={setViewHelp} />
            </div>
            {viewHelp ? <Window /> : ''}
            <div className='main-container'>
                <table className='table-container'>
                    <thead>
                        <tr className={items.length > 2 ? 'table-header' : 'invisible'}>
                            {/*TODO: make these propereties that show up only once loaded */}
                            <th className='header__item'>Name</th>
                            <th>Port</th>
                            <th>Sysex Message</th>
                            <th>Expected</th>
                            <th>Response</th>
                            {/* <th>Pass/Fail</th> */}
                            {/* <th>Notes</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(data => (
                            <tr key={data.index} className='table_row'>
                                <td className='msg_name'>{data.name}</td>
                                <td className='port'>{data.port}</td>
                                {/* Sysex Column */}
                                <td className='sysex-container'>
                                    <div className='sysex-cell'>
                                        {data.sysex}
                                        <button className='send-button' id={data.index} value={data.sysex} onClick={clickHandler}>
                                            send{' '}
                                        </button>
                                        {/*  Collection Button
                                        <button onClick={addToCollection} value={data.sysex}>
                                            Add
                                        </button> */}
                                    </div>
                                </td>

                                {/* Expected */}
                                <td className='response'>
                                    {data.expected} {data.expectedLength}
                                </td>
                                {/*the regex is to eliminate the commas */}
                                <td className='response'>{data.response.match(/[^,*]/gm)}</td>
                                <br />
                                <div className={data.passFail === 'pass' ? 'pass' : 'fail'}>
                                    {data.responseLength ? `Response: ${data.responseLength} bytes` : ''}
                                </div>
                                {/* <td>
                                    <input type='textarea' wrap='hard' className='notes'></input>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* <Collection collection={collection} setCollection={setCollection} fn={addToCollection} sendSys={clickHandler} /> */}
            </div>
            <footer>© Copyright 2021 John DeTora. All rights reserved.</footer>
        </div>
    );
}

export default App;
