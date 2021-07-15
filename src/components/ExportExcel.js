import React from 'react';
import * as XLSX from 'xlsx';
import '../App.css';

function ExportExcel(props) {
    // This is the 'items' state, the full data object
    let newWorkBook = XLSX.utils.book_new(); // create new workbook
    let resultsSheet = XLSX.utils.json_to_sheet(props.data); //can also use XLSX.utils.sheet_add_json to add to existing
    XLSX.utils.book_append_sheet(newWorkBook, resultsSheet, 'Sysex Results'); // Add new worksheet to new workbook

    // https://www.youtube.com/watch?v=tKz_ryychBY&list=PLQ9Y_YUSECCg0uiQR-Uj8E2a8fxTelcNB&index=3&t=1197s
    return (
        <div>
            {/* skipHeader: false if we want to remove the header */}
            <button className='button' onClick={() => XLSX.writeFile(newWorkBook, 'sysex-results.xlsx')}>
                Export to New Sheet
            </button>
        </div>
    );
}

export default ExportExcel;
