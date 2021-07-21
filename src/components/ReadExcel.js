import React from 'react';
import * as XLSX from 'xlsx';
import '../App.css';

//TODO: add more error handling. for instance, if the loaded excel sheet doesn't look right, take user through putting in the name of the sheet, the index of the first cell, etc.
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
            // console.log('worksheet', worksheet);
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Uncomment to see how we're parsing the data below
            console.table('data', data);

            let sheetObj = [];
            const MAX = data.length;
            let start = 3; // Start of the actual data

            for (let i = start; i < MAX; i++) {
                sheetObj.push({
                    index: i,
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
            props.setItems(sheetObj);

            console.log('Worksheet load successful');
            console.table(sheetObj);
            props.setHelp(!props.help);
        };

        fileReader.onerror = e => {
            alert('unknown error. please retry');
            fileReader.abort();
        };
    }

    // function styleTable() {
    //     let rows = document.querySelectorAll('td');
    //     console.log('rows', rows);
    //     for (let i = 0; i < rows.length; i++) {
    //         if (rows[i].includes()) {
    //             rows[i].style.backgroundColor = 'red';
    //         }
    //     }
    // }

    // styleTable();
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
