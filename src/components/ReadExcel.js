import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import SheetSelect from './SheetSelect';
import '../App.css';

//TODO: add more error handling. for instance, if the loaded excel sheet doesn't look right, take user through putting in the name of the sheet, the index of the first cell, etc.
//TODO: add window component that shows the worksheet names
function ExcelReader(props) {
    const [showSheets, setShowSheets] = useState(false);
    const [sheetNames, setSheetNames] = useState([]);
    const [sheetSelection, setSheetSelection] = useState('');

    function clickHandler(e) {
        setSheetSelection(e.target.innerText);
        console.log(e.target.innerText);
    }

    function readExcel(file) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        let regEx = /xlsx$/;

        fileReader.onload = e => {
            if (regEx.test(file.name) === false) {
                alert('ERROR: Incompatible file type.  Please upload a file with an extension of .xlsx');
                return;
            }
            let sheetObj = [];
            // const sheetName = 'SysEx';
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, { type: 'buffer' });
            // Set variables

            // setShowSheets(true);
            // const sheetName = prompt('Please enter the name of the sheet');
            //const worksheet = wb.Sheets[sheetName];
            setSheetNames(wb.SheetNames);

            // If sheet is selected
            if (sheetSelection) {
                const worksheet = wb.Sheets[sheetSelection];
                console.log('you made it');

                // console.log(wb.Sheets);
                // console.log('worksheet', worksheet);
                const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                // Uncomment to see how we're parsing the data below
                // console.table('data', data);

                const MAX = data.length;
                let start = 3; // Start of the actual data

                for (let i = start; i < MAX; i++) {
                    sheetObj.push({
                        index: i - start,
                        name: data[i][0],
                        port: data[i][1],
                        test: data[i][2],
                        behavior: data[i][3],
                        sysex: data[i][4],
                        expected: data[i][5],
                        expectedLength: null,
                        response: '',
                        responseLength: null,
                        passFail: null,
                    });
                }

                // Set state

                props.setItems(sheetObj);
                props.setHelp(!props.help);
            }

            // Log output
            console.log('Worksheet load successful');
            console.table(sheetObj);
        };

        fileReader.onerror = e => {
            alert('unknown error. please retry');
            fileReader.abort();
        };
    }

    return (
        <>
            <SheetSelect sheetNames={sheetNames} sheetSelection={sheetSelection} setSheetSelection={setSheetSelection} clickHandler={clickHandler} />
            <label className='button'>
                Import Sheet
                <input
                    type='file'
                    className='file'
                    onChange={e => {
                        const file = e.target.files[0];
                        readExcel(file);
                    }}
                />
            </label>
        </>
    );
}

export default ExcelReader;
