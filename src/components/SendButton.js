import React, { useState } from 'react';

function SendButton(props) {
    const [sent, setSent] = useState(false);

    return (
        <>
            <button
                className={sent ? 'button send-button sent' : 'button send-button'}
                id={props.id}
                onClick={e => {
                    props.onClick(e);
                    setSent(true);
                }}
            >
                <span className='send-text'>{sent ? 'sent' : 'send'}</span>
            </button>
        </>
    );
}

export default SendButton;
