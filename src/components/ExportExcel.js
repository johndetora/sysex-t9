import React from 'react';
import * as XLSX from 'xlsx';
import '../App.css';
const ExportExcel = props => {
    let data = props.data;
    // https://www.youtube.com/watch?v=tKz_ryychBY&list=PLQ9Y_YUSECCg0uiQR-Uj8E2a8fxTelcNB&index=3&t=1197s
    console.log(data);
    return (
        <div>
            <button>Export</button>
            <a href='MidiPort.js' target='_blank'>
                Save As... to download
            </a>
        </div>
    );
};

export default ExportExcel;
