import React from 'react';

function Window() {
    // This will show when the page is loaded.  once a file is imported, it can be accessed via the help button
    return (
        <div className='window'>
            <section className='window__header'>
                <h4>Welcome to SysEx Tester 9</h4>
                <p>
                    Inspired by T9 predictive text message technology used in early mobile phones, Sysex-T9 aims to make it easier to send large
                    amounts of SysEx messages to your MIDI devices. Sysex T9 will import your excel sheets and parse the cells for sysex data, where
                    you will be able to send the messages to your MIDI device while monitoring the response.
                </p>
                ________________
            </section>
            <section className='window__content'>
                <p> To use Sysex-T9: </p>
                <p>
                    {' '}
                    1. Create an excel sheet based on{' '}
                    <a href='.' target='_blank'>
                        this template
                    </a>
                </p>
                <p>
                    2. Click the Import Sheet button. NOTE: This menu will disappear once a sheet is imported. Access this window again by clicking
                    [help]{' '}
                </p>
                <p>3. Make sure your Input and Output Ports are set to the proper MIDI Device </p>
                <p> 4. Click Send to send each SysEx message. If the message is successful, the response will be written to the Response cell. </p>
                <p>
                    5. Along with the Sysex response message, the amount of bytes sent and received will be written and compared. <br />
                    If the number of bytes of the response matches the expected number of bytes, the message will be colored green. If the incorrect
                    amount of bytes are received, the message will be colored red.
                </p>
                <p>6. Once finished, [Export to New Sheet] and save the results to your system</p>
                ________________
            </section>
            <section className='window__footer'>
                <p />
                If you want to see more data while operating Sysex T9:
                <p />
                1. Open up the console on your browser by right clicking anywhere and clicking [Inspect].
                <p />
                2. Click on the [Console] tab to get readouts of the data being sent and received.
                <p />
                If you want to access this menu again, press the [help] button at any time.
                <p />
            </section>
        </div>
    );
}

export default Window;
