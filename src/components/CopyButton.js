// Copy to clipboard
import React, { useState } from 'react';

function CopyButton({ data, dataLength }) {
    const [copied, setCopied] = useState('copy');

    function copyText(e) {
        const text = `${data.join('')}  ${dataLength} bytes`;

        const clipboard = navigator.clipboard;

        if (!navigator.clipboard) {
            return;
        }
        navigator.clipboard.writeText(text);
        setCopied('copied');
    }

    return (
        <div className='copy__container'>
            <button className={copied === 'copy' ? 'copy button' : 'copy button button__active'} onClick={copyText}>
                {copied}
            </button>
        </div>
    );
}

export default CopyButton;
