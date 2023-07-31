import React, { useEffect, useState } from "react"

import { get, size } from 'lodash'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import axios from '../../service/axios'
import { FaUserCircle, FaEdit } from 'react-icons/fa'
import history from '../../service/history'
import { isEmail, isInt, isFloat } from 'validator'
import { Link } from 'react-router-dom'

import * as actions from '../../store/modules/auth/action'
import { useDispatch } from 'react-redux'

import { Conteiner } from '../../styles/globalStyles'
import { Form, ProfilePicture, Title } from './styled'
import Loading from '../../components/loading/'

export default function Fotos({ match }) {
    const dispatch = useDispatch()

    const id = get(match, 'params.id', false)

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [idade, setIdade] = useState('');
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');

    const [foto, setFoto] = useState('')
    const [isloading, setIsLoading] = useState(false)

    useEffect(() => {
        if (!id) return

        async function getData(id) {
            try {
                const { data } = await axios.get(`/alunos/${id}`)
                const Foto = get(data, 'Fotos[0].url', '')

                setNome(data.nome)
                setSobrenome(data.sobrenome)
                setEmail(data.email)
                setIdade(data.idade)
                setPeso(data.peso)
                setAltura(data.altura)
                setFoto(Foto)

            } catch (err) {
                const errors = get(err, 'response.data.errors[0]', '')
                if (errors) return toast.error(errors)

                toast.error('Algo deu errado')
                return history.push('/')
            } finally {
                setIsLoading(false)
            }

        }

        setIsLoading(true)
        getData(id)
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        let formErrors = false

        if (nome.length < 3 || nome.length > 255) {
            formErrors = true
            toast.error('Nome precisa ter entre 3 e 255 caracteres.')
        }

        if (sobrenome.length < 3 || sobrenome.length > 255) {
            formErrors = true
            toast.error('sobrenome precisa ter entre 3 e 255 caracteres.')
        }

        if (!isEmail(email)) {
            formErrors = true
            toast.error('Email inválido.')
        }

        if (!isInt(String(idade))) {
            formErrors = true
            toast.error('A idade deve ser inteiro ou ponto flutuante.')
        }

        if (!isFloat(String(peso))) {
            formErrors = true
            toast.error('A peso deve ser inteiro ou ponto flutuante.')
        }
        if (!isFloat(String(altura))) {
            formErrors = true
            toast.error('A altura deve ser inteiro ou ponto flutuante.')
        }

        if (formErrors) return

        try {
            if (id) {
                await axios.put(`/alunos/${id}`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura
                })
                toast.success('Aluno(a) editado(a) com sucesso !')
            } else {
                await axios.post(`/alunos`, {
                    nome,
                    sobrenome,
                    email,
                    idade,
                    peso,
                    altura
                })

                toast.success('Aluno(a) cadastrado(a) com sucesso !')
            }
            history.push('/')
        } catch (e) {
            const status = get(e, 'response.status', 0)
            const errors = get(e, 'response.data.errors[0]', false)

            if (status === 401) return dispatch(actions.loginFeilure())
            if (errors) return toast.error(errors)
            return toast.error('Algo deu errado')
        }
    }

    return (
        <Conteiner>
            <Loading isloading={isloading}></Loading>
            <Title>{id ? ('Editando aluno') : ('Criando aluno')}</Title>
            {
                id &&
                <ProfilePicture>
                    {
                        foto ? (
                            <img src={foto} alt={nome} />
                        ) : (
                            <FaUserCircle size={100}></FaUserCircle>
                        )
                    }
                    <Link to={`/fotos/${id}`}>
                        <FaEdit color='#fff'>
                        </FaEdit>
                    </Link>
                </ProfilePicture>
            }

            <Form onSubmit={handleSubmit}>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
                <input type="text" value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} placeholder="Sobrenome" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="Idade" />
                <input type="text" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Peso" />
                <input type="text" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Altura" />

                <button type="submit">Enviar</button>
            </Form>
        </Conteiner >
    )
}

Fotos.protoTypes = {
    match: PropTypes.shape({}).isRequired
}