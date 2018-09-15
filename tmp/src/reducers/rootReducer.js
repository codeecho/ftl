import * as actions from '../actions';

const initialState = {
    
};

const rootReducer = (state = initialState, action) => {
    const newState = handleAction(state, action);
    return newState;
};

function handleAction(state, action){
    switch (action.type) {        
        default: return state;
    }
}

export default rootReducer;