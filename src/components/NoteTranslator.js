const noteChart = [
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], // Octave -1
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], // Octave 0
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], // Octave 1
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], // Octave 2
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'], // etc
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'],
    ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'], //.................... Octave 9
];

function noteTranslator(note) {
    // note = parseInt(Number(note, 10));
    note = parseInt(Number('0x' + note, 10));

    let key = 0;
    let octave = -1; // MIDI Spec octave sarts at -1
    for (let i = 0; i < noteChart.length; i++) {
        for (let j = 0; j < noteChart[i].length; j++) {
            if (note === key) {
                return noteChart[i][j] + octave;
            }
            key++;
        }
        octave++;
    }
}

export default noteTranslator;
