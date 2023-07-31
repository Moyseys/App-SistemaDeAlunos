import React, { useState } from "react"

import { Conteiner } from '../../styles/globalStyles'
import { Form } from './styled'

import Loding from '../../components/loading/'
import validator from 'validator'
import { get } from 'lodash'
import { toast } from 'react-toastify'

import { useDispatch, useSelector } from 'react-redux'
import * as actions from "../../store/modules/auth/action"

export default function Registro() {
    const dispatch = useDispatch()

    const { id, userName, userEmail } = useSelector(state => state.auth.user)
    const isLoading = useSelector(state => state.auth.isLoading)
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    React.useEffect(() => {
        if (!id) return
        setNome(userName)
        setEmail(userEmail)
    }, [id, userEmail, userName])

    async function handleSubmit(e) {
        e.preventDefault()

        let formErrors = false

        if (nome.length < 3 || nome.length > 255) {
            formErrors = true
            toast.error('O campo nome deve ter pelo menos 3 caracteres e no maximo 255')
        }

        if (!validator.isEmail(email)) {
            formErrors = true
            toast.error('Email Inválido')
        }

        if (!id && (password.length < 6 || password.length > 50)) {
            formErrors = true
            toast.error('O campo password deve ter pelo menos 6 caracteres e no maximo 50')
        }

        if (formErrors) return

        dispatch(actions.registerRequest({ id, nome, email, password }))
    }

    return (
        <Conteiner>
            <Loding isloading={isLoading} />
            <Form onSubmit={handleSubmit}>
                <h1>{id ? 'Editar dados' : 'Faça seu registro'}</h1>
                <div className="row">
                    <label htmlFor="nome">Nome: </label>
                    <input
                        id="nome"
                        type="text"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e => setNome(e.target.value))}
                    />
                </div>
                <div className="row">
                    <label htmlFor="email">Email: </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="row">
                    <label htmlFor="password">Password: </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">{id ? 'Salvar' : "Enviar"}</button>
            </Form>
        </Conteiner>
    )
}
