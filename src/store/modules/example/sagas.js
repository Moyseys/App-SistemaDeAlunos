import { call, put, takeLatest, all } from 'redux-saga/effects'
import * as actions from './actions'
import * as types from '../types'
import { toast } from 'react-toastify'

const request = () => 
    new Promise((resolve, reject) => {
        setTimeout(()=> {
            resolve()
        },600)
    })
        

function* exampleRequest(){
    try {
        yield call(request)
        yield put(actions.btnClikedSuccess())
        toast.success('Deu Certo')

    }catch (e){
        toast.error('Deu erro')
        yield put(actions.btnClikedFeilure())
    }
}

export default all([
    takeLatest(types.BTN_CLIKED_REQUEST, exampleRequest)
])