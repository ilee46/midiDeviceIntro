console.log(navigator)
let device;

if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure);
}

function failure() {
    console.log("Could not connect MIDI");
}

function updateDevices(event) {
    console.log(event);
}

function success(midiAccess) {
    console.log(midiAccess);
    midiAccess.addEventListener('statechange', updateDevices);
    let inputs = midiAccess.inputs;
    console.log(inputs)

    inputs.forEach((input) => {
        console.log(input);
        input.addEventListener('midimessage', handleInput);
    });

}

function handleInput(input) {
    console.log(input);
    let command = input.data[0];
    let note = input.data[1];
    let velocity = input.data[2];

    let data = input.data;
    console.log(data);
}