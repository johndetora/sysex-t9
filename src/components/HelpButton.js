import { React, useState } from 'react';
import Window from './Window';

function HelpButton({ help, setHelp }) {
    return (
        <>
            <button className='button help-button' onClick={() => setHelp(!help)}>
                help
            </button>
        </>
    );
}

export default HelpButton;
