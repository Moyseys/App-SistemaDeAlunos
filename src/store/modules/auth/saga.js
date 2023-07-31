import { takeLatest, call, put, all } from 'redux-saga/effects'
import axios from '../../../service/axios'
import history from '../../../service/history'
import { get } from 'lodash'
import { toast } from 'react-toastify'
import * as actions from './action'
import * as types from '../types'

//Call -> Chama uma função
//Put -> Lança uma ação
function* loginRequest({ payload }) {
    try {
        const { email, password } = payload
        const response = yield call(axios.post, '/tokens', { email, password })
        yield put(actions.loginSuccess({ ...response.data }))
        toast.success('Voce fez login')
        console.log(response.data.token);
        axios.defaults.headers.authorization = `Bearer ${response.data.token}`
        history.push(payload.prevPath)
    } catch (e) {
        toast.error('Usuário ou senha inválido')
        yield put(actions.loginFeilure())

    }
}

function persistRehydrate({ payload }) {
    const token = get(payload, 'auth.token', '')
    if (!token) return
    return axios.defaults.headers.authorization = `Bearer ${token}`
}

function* registerRequest({ payload }) {
    const { id, nome, email, password } = payload
    console.log('Saga register', payload);
    try {
        if (id) {
            yield call(axios.put, '/users', { email, nome, password: password || undefined })
            toast.success('Conta alterada com sucesso')
            yield put(actions.registerUpdatedSuccess({ nome, email, password }))
        } else {
            yield call(axios.post, '/users', { email, nome, password })
            toast.success('Conta criada com sucesso')
            yield put(actions.registerCreatedSuccess({ nome, email, password }))
            history.push('/login')
        }
    } catch (e) {
        const errors = get(e, 'response.data.errors', [])
        const status = get(e, 'response.status')

        if (status === 401) {
            toast.error("Faca login novamente")
            yield put(actions.loginFeilure())
            history.push('/login')
        }

        if (errors.length > 0) {
            errors.map(erro => {
                toast.error(erro)
            })
        } else {
            console.log(e);
            toast.error('Ocorreu um erro inesperado')
        }

        yield put(actions.registerFailure())
    }
}

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
    takeLatest(types.REGISTER_REQUEST, registerRequest)
])