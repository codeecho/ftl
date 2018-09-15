export const KEY_DOWN = 'KEY_DOWN';
export const KEY_PRESS = 'KEY_PRESS';

export const CHARACTER_TYPED = 'CHARACTER_TYPED';
export const BACKSPACE = 'BACKSPACE';
export const MOVE_CURSOR_BACK = 'MOVE_CURSOR_BACK';
export const MOVE_CURSOR_FORWARD = 'MOVE_CURSOR_FORWARD';
export const MOVE_CURSOR_TO_END = 'MOVE_CURSOR_TO_END';
export const MOVE_CURSOR_TO_START = 'MOVE_CURSOR_TO_START';
export const AUTOCOMPLETE = 'AUTOCOMPLETE';

export const SEND_COMMAND = 'SEND_COMMAND';

export const SHOW_HELP = 'SHOW_HELP';
export const SHOW_COMMAND_HISTORY = 'SHOW_COMMAND_HISTORY';
export const CLEAR_CONSOLE = 'CLEAR_CONSOLE';

export const CHANGE_DIRECTORY = 'CHANGE_DIRECTORY';
export const OPEN_FILE = 'OPEN_FILE';

export const WRITE_TO_CONSOLE = 'WRITE_TO_CONSOLE';

export const ACTIVATE_TERMINAL = 'ACTIVATE_TERMINAL';
export const OPEN_TERMINAL = 'OPEN_TERMINAL';
export const CLOSE_TERMINAL = 'CLOSE_TERMINAL';

export const NOOP = 'NOOP';

export function keyDown(event){
    return { type: KEY_DOWN, event };
}
export function keyPress(event){
    return { type: KEY_PRESS, event };
}

export function characterTyped(character){
    return { type: CHARACTER_TYPED, character };
}
export function backspace(){
    return { type: BACKSPACE };
}
export function moveCursorBack(){
    return { type: MOVE_CURSOR_BACK };
}
export function moveCursorForward(){
    return { type: MOVE_CURSOR_FORWARD };
}
export function moveCursorToStart(){
    return { type: MOVE_CURSOR_TO_START };
}
export function moveCursorToEnd(){
    return { type: MOVE_CURSOR_TO_END };
}
export function autocomplete(){
    return { type: AUTOCOMPLETE };
}

export function sendCommand(command){
    return { type: SEND_COMMAND, command };
}

export function writeToConsole(text){
    return { type: WRITE_TO_CONSOLE, text};
}

export function activateTerminal(terminalId){
    return { type: ACTIVATE_TERMINAL, terminalId };
}
export function openTerminal(){
    return { type: OPEN_TERMINAL };
}
export function closeTerminal(terminalId){
    return { type: CLOSE_TERMINAL, terminalId };
}

export function noop(){
    return { type: NOOP };
}