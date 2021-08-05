import React, { useEffect, useState } from 'react';

function Monitor({ input, output, hex }) {
    const [log, setLog] = useState([]);
    const allMessages = [];

    function logData() {
        input.addListener('midimessage', 'all', e => {
            const reply = hex([...e.data]);

            // console.log(e.data);
            // setLog(prev => [...prev], reply);
            // setLog(prev => [...prev], reply);
            allMessages.push({ time: e.timestamp, message: reply, port: e.target.name });

            // console.log(reply);

            setLog([...allMessages]);
            console.log(e.target.name);
            // console.log('log', log);

            // console.log(e);

            // // Log I/O
            // if (!reply) alert('No SysEx received. Check MIDI Port');
            // // console.group('Success');
            // console.log(`RECEIVED ${reply} (${reply.length} bytes) at ${input.name} port`);
            // console.groupEnd('LOG');

            // if (reply) {
            //     updateData(target, decimalToHex(reply));
            // }
        });
    }

    // input.removeListener('midimessage', 'all');
    useEffect(() => {
        console.log('render');
        logData();
        return () => {
            input.removeListener('midimessage', 'all');
            console.log('unmount');
        };
    }, [input]);

    return (
        <div className='monitor-container'>
            <span className='monitor-title'>MIDI MONITOR</span>
            <div className='monitor-ports'>
                <span>Port: {input.name}</span>
                {/* <span>{log}</span> */}
            </div>
            <div className='monitor-content'>
                {log.map(msg => (
                    <div className='midi-message' key={msg.time}>
                        <div>{msg.port}</div>
                        <div>{msg.message}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Monitor;
