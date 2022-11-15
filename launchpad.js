letterVal = 0;
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

    console.log(`command: ${command}, note: ${note}, velocity: ${velocity}`);
    if (note == 36) {
        letterVal++;
        if (letterVal % 2 == 1) {
            document.getElementById('beginningString').textContent = "Bye-bye!"
        } else {
            document.getElementById('beginningString').textContent = "Hello"
        }
    }
    if (note >= 36 && note <= 51) {
        document.body.style.backgroundColor = "yellow"
    }
    if (note >= 52 && note <= 67) {
        document.body.style.backgroundColor = "red"
    }
    if (note >= 68 && note <= 83) {
        document.body.style.backgroundColor = "blue"
    }
    if (note >= 84 && note <= 99) {
        document.body.style.backgroundColor = "green"
    }
}