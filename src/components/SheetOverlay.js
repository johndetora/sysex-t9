import React from 'react';

function SheetOverlay({ setShowSheets, showSheets, sheetNames, parseSheet }) {
    return (
        <div className='sheet-select-overlay' onClick={e => setShowSheets(!showSheets)}>
            <h2>Please select a sheet to load:</h2>
            <div className='sheet-container'>
                {showSheets
                    ? sheetNames.map(sheet => (
                          <div key={sheet}>
                              <div
                                  onClick={e => {
                                      parseSheet(e.target.id);
                                  }}
                                  id={sheet}
                                  className='sheet'
                              >
                                  {sheet}
                              </div>
                          </div>
                      ))
                    : ''}
            </div>
        </div>
    );
}

export default SheetOverlay;
