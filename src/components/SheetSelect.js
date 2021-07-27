import React from 'react';

function SheetSelect({ sheetNames, sheetSelection, setSheetSelection, clickHandler }) {
    return (
        <div className='sheet-select container'>
            {sheetNames.map((sheet, index) => (
                <button key={index} className='button sheet' onClick={clickHandler}>
                    {sheet}
                </button>
            ))}
        </div>
    );
}

export default SheetSelect;
