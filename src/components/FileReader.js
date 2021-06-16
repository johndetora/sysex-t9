import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import '../App.css';

function ExcelReader(props) {
    function readExcel(file) {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = e => {
            const bufferArray = e.target.result;
            const wb = XLSX.read(bufferArray, { type: 'buffer' });
            const worksheet = wb.Sheets['Sysex'];
            const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const sysexMatch = /F0(.*?)F7/gm;
            let sheetObj = [];
            for (let i = 0; i < data.length; i++) {
                sheetObj.push({ index: i, test: data[i][0], description: data[i][1], expected: data[i][2], sysex: null, result: '' });
            }
            // Assign sysex property to regexed sysex
            for (let i = 0; i < sheetObj.length; i++) {
                // console.log(sheetObj[i]); // For monitoring input during development
                if (typeof sheetObj[i].description === 'string') {
                    sheetObj[i].sysex = sheetObj[i].description.match(sysexMatch);
                }
            }
            // Filter out all rows that don't include a valid sysex cell
            const onlySysex = sheetObj.filter(cell => cell.sysex !== null);

            // Reassign index
            for (let i = 0; i < onlySysex.length; i++) {
                onlySysex[i].index = i;
            }
            props.setItems(onlySysex);
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
