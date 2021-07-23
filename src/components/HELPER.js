const testObj = [
    {
        index: 0,
        name: 'Title',
        test: undefined,
        behavior: undefined,
        sysex: 'Zero',
        expected: undefined,
        port: undefined,
        response: '',
        responseLength: null,
        passFail: null,
    },
    {
        index: 1,
        name: 'Foo',
        test: undefined,
        behavior: undefined,
        port: undefined,
        sysex: 2,
        expected: undefined,
        response: '',
        responseLength: null,
        passFail: null,
    },
    {
        index: 2,
        name: 'Bar',
        test: undefined,
        behavior: undefined,
        port: undefined,
        sysex: 3,
        expected: undefined,
        response: '',
        responseLength: null,
        passFail: null,
    },
    {
        index: 3,
        name: 'Baz',
        test: undefined,
        port: undefined,
        behavior: undefined,
        sysex: 4,
        expected: undefined,
        response: '',
        responseLength: null,
        passFail: null,
    },
    {
        index: 4,
        name: 'Go',
        port: undefined,
        test: undefined,
        behavior: undefined,
        sysex: 5,
        expected: undefined,
        response: '',
        responseLength: null,
        passFail: null,
    },
];

// const [items, setItems] = useState(testObj);

// function clickHandler(e) {
//     let target = parseInt(e.target.id);
//     const test = [...items];
//     let result = test.map(msg => {
//         if (msg.index === target) {
//             msg.response = Date.now();
//         }
//     });
//     setItems(result);
// }
