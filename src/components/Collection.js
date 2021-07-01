import React, { useState } from 'react';
import '../App.css';
// TODO: add delete button to message
// TODO: add response box or fixed response bar
function Collection(props) {
    function clickHandler(e) {
        const inputText = document.getElementById('collection-input').value;
        console.log(inputText.value);
    }
    return (
        <div>
            <div className='collection-container'>
                <div className='title'>Collection</div>
                <div className='custom-message'>
                    <input type='text' id='collection-input' />
                    <button id='custom-submit' onClick={clickHandler}>
                        Add
                    </button>
                </div>
                <div className='messages-container'>
                    {props.collection.map((data, index) => (
                        <div className='messages' onClick={e => props.sendSys(e)} id={data.index} key={index}>
                            {/* This will be changed to the name of the message */}
                            {data.sysex}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Collection;
