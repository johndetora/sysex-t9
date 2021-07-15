import React from 'react';
import * as XLSX from 'xlsx';
import '../App.css';

function ExcelReader(props) {
    function readExcel(file) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        let regEx = /xlsx$/;

        fileReader.onload = e => {
            if (regEx.test(file.name) === false) {
                alert('ERROR: Incompatible file type.  Please upload a file with an extension of .xlsx');
                return;
            }
            // Set variables
            // const sheetName = prompt('Please enter the name of the sheet');
            const sheetName = 'SysEx';
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, { type: 'buffer' });

            const worksheet = wb.Sheets[sheetName];
            console.log('worksheet', worksheet);
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            console.table('data', data);

            let sheetObj = [];
            const MAX = data.length;
            let start = 3; // Start of the actual data

            for (let i = start; i < MAX; i++) {
                sheetObj.push({
                    index: i,
                    name: data[i][0],
                    port: data[i][1],
                    sysex: data[i][2],
                    expected: data[i][3],
                    expectedLength: null,
                    response: '',
                    responseLength: null,
                    passFail: null,
                });
            }
            props.setItems(sheetObj);
            console.log('Worksheet load successful');
            props.setHelp(!props.help);
        };
        fileReader.onerror = e => {
            alert('unknown error. please retry');
            fileReader.abort();
        };
    }

    return (
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
    );
}

export default ExcelReader;
