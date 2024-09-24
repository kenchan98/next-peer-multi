let serverVariable = 'ken-is-the-best';

export function getServerVariable() {
    return serverVariable;
}

export function setServerVariable(newValue) {
    serverVariable = newValue;
}