import React from 'react';

function SendButton(props) {
    return (
        <>
            <button id={props.data.index} onClick={e => props.onClick(e)}>
                {props.data.index}
            </button>
        </>
    );
}

export default SendButton;
