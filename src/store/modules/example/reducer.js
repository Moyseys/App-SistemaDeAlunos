import * as types from '../types'

const initialState = {
    btnCliked: false
}

export default function exampleReducer (state = initialState, action){
    switch(action.type){
        case types.BTN_CLIKED_SUCCCESS:
            console.log('success');
            const newState = {...state}

            newState.btnCliked = !newState.btnCliked

            return newState
         case types.BTN_CLIKED_REQUEST:
            console.log('Request')

            return state
         case types.BTN_CLIKED_FAILURE:
            console.log('feilure')

            return state
        default:
            return state
    }
}