import axios from '../../../service/axios'
import * as types from '../types'

const initialState = {
    isLogedIn: false,
    token: false,
    user: {},
    isLoading: false
}


export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST: {
            const newState = { ...state }
            newState.isLoading = true
            return newState
        }
        case types.LOGIN_SUCCESS: {
            const newState = { ...initialState }
            newState.isLogedIn = true
            newState.token = action.payload.token
            newState.user = action.payload.user
            newState.isLoading = false
            return newState
        }
        case types.LOGIN_FAILURE: {
            delete axios.defaults.headers.authorization
            const newState = { ...initialState }
            return newState
        }
        case types.REGISTER_REQUEST: {
            const newState = { ...state }
            newState.isLoading = true
            return newState
        }
        case types.REGISTER_UPDATED_SUCCESS: {
            const newState = { ...state }
            newState.user.userName = action.payload.nome
            newState.user.userEmail = action.payload.email
            newState.isLoading = false
            return newState
        }
        case types.REGISTER_CREATED_SUCCESS: {
            const newState = { ...state }
            newState.isLoading = false
            return newState
        }
        case types.REGISTER_FAILURE: {
            const newState = { ...state }
            newState.isLoading = false
            return newState
        }
        default: {
            return state
        }
    }
}