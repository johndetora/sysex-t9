import React, { useState } from 'react';

function Response(props) {
    const [display, setDisplay] = useState();
    // setDisplay(props.data);

    return <div>{props.data}</div>;
}

export default Response;
