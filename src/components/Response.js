import React, { useState } from 'react';

function Response(props) {
    const [display, setDisplay] = useState();
    // setDisplay(props.data[props.index]);

    return <div>{props.data}</div>;
}

export default Response;
