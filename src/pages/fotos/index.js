import React, { useEffect, useState } from "react"

import { get } from 'lodash'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import axios from '../../service/axios'
import history from '../../service/history'
import * as actions from '../../store/modules/auth/action'
import { useDispatch } from 'react-redux'

import { Conteiner } from '../../styles/globalStyles'
import { Form, ProfilePicture, Title } from './styled'
import Loading from '../../components/loading/'

export default function Fotos(props) {
    const dispatch = useDispatch()

    const id = get(props, 'match.params.id', false)

    const [isloading, setIsLoading] = useState(false)
    const [foto, setFoto] = useState('')

    useEffect(() => {
        setIsLoading(true)
        async function getData(id) {
            try {
                const { data } = await axios.get(`/alunos/${id}`)

                setFoto(get(data, 'Fotos[0].url'))
            } catch {
                toast.error('Erro ao obter a imagem')
                return history.push('/')
            } finally {
                setIsLoading(false)
            }
        }

        getData(id)
    }, [id])

    const handleChange = async (e) => {
        setIsLoading(true)
        const foto = e.target.files[0]
        const fotoURL = URL.createObjectURL(foto)
        setFoto(fotoURL)

        const formData = new FormData()
        formData.append('foto', foto)
        formData.append('aluno_id', id)
        try {
            await axios.post('/fotos', formData, {
                'Content-Type': 'multipart/form-data',
            })
            toast.success('Foto de perfil alterada com sucesso !')
        } catch (error) {
            const status = get(error, 'response.status', 0)
            if (status === 401) dispatch(actions.loginFeilure())
            return toast.error('Erro ao alterar a foto de perfil.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Conteiner>
            <Loading isloading={isloading}></Loading>
            <Title>Fotos</Title>
            <Form>
                <label htmlFor="foto">
                    {foto ? (
                        <img src={foto} alt="Aluno" />
                    ) : (
                        'Selecionar'
                    )
                    }
                    <input id="foto" type="file" onChange={e => handleChange(e)} />
                </label>
            </Form>
        </Conteiner>
    )
}