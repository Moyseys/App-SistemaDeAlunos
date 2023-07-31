import React, { useState } from "react"
import PropType from 'prop-types'

import { Conteiner } from '../../styles/globalStyles'
import { Form } from "./styled"
import * as actions from "../../store/modules/auth/action"

import validator from 'validator'
import Loding from '../../components/loading/'
import { useDispatch, useSelector } from 'react-redux'
import { get } from 'lodash'
import { toast } from 'react-toastify'

export default function Login(props) {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isLoading = useSelector(state => state.auth.isLoading)
    console.log(isLoading);

    async function handleSubmit(e) {
        e.preventDefault()

        let formErrors = false

        if (!validator.isEmail(email)) {
            formErrors = true
            toast.error('Email inválido')
        }

        if (password.length < 6 || password.length > 50) {
            formErrors = true
            toast.error('O campo password deve ter pelo menos 6 caracteres e no maximo 50')
        }

        if (formErrors) return

        const prevPath = get(props, 'location.state.prevPath', '/')
        dispatch(actions.loginRequest({ email, password, prevPath }))
    }

    return (
        <Conteiner>
            <Loding isloading={isLoading} />
            <h1>Login</h1>

            <Form onSubmit={e => handleSubmit(e)}>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email"
                    type="email"
                />

                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="password"
                    type="text"
                />

                <button type="submit">Enviar</button>
            </Form>
        </Conteiner>
    )
}

Login.prototype = {
    props: PropType.object
}