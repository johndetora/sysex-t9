import { React, useState } from 'react';
import Window from './Window';

function HelpButton({ help, setHelp }) {
    return (
        <div>
            <button className='button' onClick={() => setHelp(!help)}>
                help
            </button>
        </div>
    );
}

export default HelpButton;
