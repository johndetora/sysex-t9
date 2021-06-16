import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import WebMidi from 'webmidi';
import MidiPorts from './components/MidiPort';
import ExcelReader from './components/FileReader';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [response, setResponse] = useState(null);

    function clickHandler(e) {
        // const message = [];
        console.log(e.target.id);
        const target = parseInt(e.target.id);
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
        console.log('sent:', message);
        // Send the sysex
        output.send(0xf0, message);
        receiveSysex(target);
    }

    function receiveSysex(target) {
        input.addListener('sysex', 'all', function (e) {
            // console.log('midi received');
            //TODO: add a conditional to check if a response is expected and if successful
            const reply = [...e.data];

            // Convert to hex
            const hex = reply.map(el => {
                el = el.toString(16) + ' ';
                if (el.length === 2) el = '0' + el;
                return el.toUpperCase();
            });

            setResponse(hex);
            findResult(target, hex);
            // resultTest(hex);
            //TODO: make sure this actually means the message was received
            // console.log('message received');
            // hexConversion(response);
        });
    }

    // const resultTest = response => {
    //     console.log('RESPONSE TEST :');
    //     console.log(response.length);
    // };

    function findResult(target, response) {
        const result = items.map(item => {
            if (item.index === target) {
                // So that the response isn't appended
                if (item.result.indexOf('F0') === -1) {
                    item.result += response;
                }
            }
            return item;
        });

        console.log('sysex response: ' + response.join(''));

        setItems(result);

        // let itemsCopy = Object.assign({}, items);
        // itemsCopy[target].result = response;
        // setItems(itemsCopy);
        // console.log(itemsCopy);
        // setItems(itemsCopy);
        // const array = [...obj, obj.forEach(el => el.index = 1)]

        // setItems(prevState => ({
        //     ...prevState,
        //     {[target]: response}
        // }));
        // console.log(setItems(items => (items[target].result = 'foo')));
        // const result = items.map(item => {
        //     if (item.index === target) {
        //         // setItems(prevState => ({
        //         //     ...prevState,
        //         //     ...result,
        //         // }));
        //         return (item.result = response);
        //     }
        // });
        // setItems(items => result);
    }

    return (
        <div className='container'>
            <div className='utilities'>
                <ExcelReader setItems={setItems} />
                <MidiPorts setInput={setInput} setOutput={setOutput} input={input} output={output} />
            </div>
            <table className='table-container'>
                <thead>
                    <tr>
                        {/*TODO: make these propereties that show up only once loaded */}
                        <th>Test</th>
                        <th>Sysex</th>
                        <th>Expected</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(data => (
                        <tr key={data.index}>
                            <td>{data.test}</td>
                            <td className='description'>{data.description}</td>
                            <td className='expected-container'>
                                <div className='expected'>
                                    {data.expected}
                                    <button className='send-button' id={data.index} value={data.sysex} onClick={clickHandler}>
                                        test{' '}
                                    </button>
                                </div>
                            </td>
                            <td className='results'>{data.result.match(/[^,*]/gm)}</td>
                            {/*the regex is to eliminate the commas */}
                            {/* <td>{response}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;
