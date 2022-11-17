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

    for (let output of midiAccess.outputs.values()) {
        device = output
        console.log('Output device selected', device)
    }

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
    if (velocity > 0) {
        noteOn(note);
    }

    if (velocity == 0) {
        noteOff(note);
    }
}

function colorM(key, clr) {
    device && device.send([0x90,key,clr]);
}

function noteOn(note) {

    if (note == 36) {
        document.getElementById('beginningString').textContent = "Ouch"
        colorM(note, 104);
    }

}

function noteOff(note) {

    if (note == 36) {
        document.getElementById('beginningString').textContent = "Bye"
        colorM(note, 0);
    }
    
}