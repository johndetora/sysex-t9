import React, { useState } from 'react';
import MidiPorts from './components/MidiPort';
import ExcelReader from './components/ReadExcel';
import ExportExcel from './components/ExportExcel';
import HelpButton from './components/HelpButton';
import Window from './components/Window';
import CopyButton from './components/CopyButton';
import Response from './components/Response';
import './Header.css';
import './App.css';

function App() {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState();
    const [output, setOutput] = useState();
    const [collection, setCollection] = useState([]);
    const [viewHelp, setViewHelp] = useState(true);

    // function setStorage() {
    //     localStorage.setItem('items', JSON.stringify(items));
    //     console.log(localStorage);
    // }

    // function getStorage() {
    //     let retrieve = localStorage.getItem('items');

    //     console.log('retrieved', retrieve);
    //     setTimeout(() => {
    //         setItems(retrieve);
    //     }, 10000);
    // }

    // localStorageCheck();
    // localStorage.removeItem('items');

    const [copied, setCopied] = useState('copy');

    function copyText(e) {
        const target = e.target.parentElement;
        const text = target.innerText;
        console.log(target);
        const clipboard = navigator.clipboard;

        if (!clipboard) {
            return;
        }

        clipboard.writeText(text);
        setCopied('copied');
    }

    function addToCollection(e) {
        const value = e.target.value;
        const match = items.filter(item => item.sysex.includes(value));
        setCollection([...collection, match[0]]);
    }

    function clickHandler(e) {
        // console.log(e.target.id);

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
        console.log(`sent ${message} to ${output.name}`);
        // Send the sysex
        // console.log('output', output.name);

        if (!message.includes(247)) {
            return alert('Not a valid SysEx message');
        }
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
            console.clear();
            console.group('Received');
            // console.log('received (RAW):', reply);
            // console.log('response length is', reply.length);

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

    //TODO: BYTE OVERWRITE
    // Adds response to the items state

    // function updateData(target, response) {
    //     const result = items.map(item => {
    //         if (item.index === target) {
    //             console.group('Data Set');
    //             console.log('index', item.index);
    //             console.log('target', target);

    //             // So that the response isn't appended into the cell every time it's retested
    //             //TODO: this means the cell won't get new data!
    //             // if (item.response.indexOf('F0') === -1) {
    //             item.response = '';
    //             item.response += response;
    //             // }

    //             //TODO: this function is doing multiple things not described by it's name.  consider breaking up
    //             // Sets expected length
    //             if (!item.expectedLength) {
    //                 item.expectedLength += item.expected.split(' ').length;
    //             }

    //             if (!item.responseLength) {
    //                 item.responseLength += byteComparison(response);
    //             }

    //             if (item.responseLength === item.expectedLength) {
    //                 item.passFail = 'pass';
    //             }
    //         }

    //         return item;
    //     });

    //     console.table(result);
    //     console.log('sysex response: ' + response.join(''));
    //     setItems(result);
    // }

    function updateData(target, response) {
        let result = [...items];
        result[target].response = response;
        setItems(result);

        //    setState(result)
    }

    function setState(newArray) {
        setItems(prevState => newArray);
    }

    return (
        <div className='container'>
            <p className='title'>Sysex Tester</p>
            <div className='utilities'>
                <ExcelReader setItems={setItems} setHelp={setViewHelp} help={viewHelp} />
                <ExportExcel data={items} />
                {/* <ExportExcel data={items} /> */}
                <MidiPorts setInput={setInput} setOutput={setOutput} input={input} output={output} />
                {/* <button onClick={setStorage}>set storage</button>
                <button onClick={getStorage}>get storage</button> */}
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
                        {items.map(data => (
                            <tr key={data.index} className={data.port === undefined ? 'table_section' : 'table_row'}>
                                <td className='msg_name'>{data.name}</td>
                                <td className='port'>{data.port}</td>
                                {/* Sysex Column */}
                                <td className='description'>{data.test}</td>
                                <td className='behavior'>{data.behavior}</td>
                                <td className='sysex-container'>
                                    <div className='sysex-cell'>
                                        {data.sysex}
                                        <button
                                            className={data.sysex ? 'send-button button' : 'invisible'}
                                            id={data.index}
                                            value={data.sysex}
                                            onClick={clickHandler}
                                        >
                                            send{' '}
                                        </button>
                                        {/*  Collection Button
                                        <button onClick={addToCollection} value={data.sysex}>
                                            Add
                                        </button> */}
                                    </div>
                                </td>

                                {/* Expected */}

                                <td className='long expected'>
                                    <div className='overflow'>
                                        {data.expected}
                                        <div className={data.passFail === 'pass' ? 'pass' : 'fail'}>
                                            {data.expectedLength ? `Expected: ${data.expectedLength} bytes` : ''}
                                        </div>
                                    </div>
                                </td>
                                {/*the regex is to eliminate the commas */}
                                <td className='long response'>
                                    <div className='overflow'>
                                        {/* {data.response.match(/[^,*]/gm)} */}

                                        {/* {data.response} */}
                                        <Response data={data.response} />
                                        <div className={data.passFail === 'pass' ? 'pass' : 'fail'}>
                                            {data.responseLength ? `Response: ${data.responseLength} bytes` : ''}
                                        </div>
                                    </div>

                                    {data.responseLength > 1 ? (
                                        <CopyButton data={data.response.match(/[^,*]/gm)} dataLength={data.responseLength} />
                                    ) : undefined}
                                </td>
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
