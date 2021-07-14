import React from 'react';
import * as XLSX from 'xlsx';
import '../App.css';

function ExcelReader(props) {
    function readExcel(file) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = e => {
            // Set variables
            // const sheetName = prompt('Please enter the name of the sheet');
            const sheetName = 'SysEx';
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, { type: 'buffer' });

            const worksheet = wb.Sheets[sheetName];
            console.log('worksheet', worksheet);
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            console.group();
            console.table('data', data);
            const sysexMatch = /F0(.*?)F7/gm;
            let sheetObj = [];
            const MAX = data.length;
            let start = 3; // Start of the actual data

            for (let i = start; i < MAX; i++) {
                sheetObj.push({ index: i, name: data[i][0], port: data[i][1], sysex: data[i][2], expected: data[i][3], response: '' });
            }
            // // Assign sysex property to regexed sysex
            // for (let i = 0; i < sheetObj.length; i++) {
            //     // console.log(sheetObj[i]); // For monitoring input during development
            //     if (typeof sheetObj[i].description === 'string') {
            //         sheetObj[i].sysex = sheetObj[i].description.match(sysexMatch);
            //     }
            // }

            props.setItems(sheetObj);
            console.table('sheet object', sheetObj);
            // Filter out all rows that don't include a valid sysex cell
            // const onlySysex = sheetObj.filter(cell => cell.sysex !== null);
            // // Reassign index
            // for (let i = 0; i < onlySysex.length; i++) {
            //     onlySysex[i].index = i;
            // }
            // props.setItems(onlySysex);
            console.log('Worksheet load successful');
        };
    }

    return (
        <input
            type='file'
            className='file'
            onChange={e => {
                const file = e.target.files[0];
                readExcel(file);
            }}
        />
    );
}

export default ExcelReader;
