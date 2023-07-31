import * as types from '../types'

export function btnClikedSuccess(){
    return {
        type: types.BTN_CLIKED_SUCCCESS
    }
}

export function btnClikedRequest(){
    return {
        type: types.BTN_CLIKED_REQUEST
    }
}

export function btnClikedFeilure(){
    return {
        type: types.BTN_CLIKED_FAILURE
    }
}