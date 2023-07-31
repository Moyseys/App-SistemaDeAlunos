import React, { useEffect, useState } from "react"
import { FaUserCircle, FaEdit, FaWindowClose, FaExclamation } from 'react-icons/fa'

import { get } from 'lodash'

import axios from '../../service/axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

import Loding from '../../components/loading/'
import { Conteiner } from '../../styles/globalStyles'
import { AlunosContainer, ProfilePicture, CriarNovoAluno } from "./styled"

export default function Aluno() {
    const [alunos, setAlunos] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function getAlunos() {
            setIsLoading(true)
            const response = await axios.get('/alunos')
            setAlunos(response.data)
            setIsLoading(false)
        }

        getAlunos()
    }, [])


    const handleDeleteAsk = (e) => {
        e.preventDefault()
        const exclamtion = e.currentTarget.nextSibling
        exclamtion.setAttribute('display', 'block')

        e.currentTarget.remove()
    }

    const handleDelete = async (e, id, index) => {
        e.preventDefault()
        e.persist()
        try {
            await axios.delete(`/alunos/${id}`)
            toast.success('Aluno excluido com sucesso')
            const newState = [...alunos]
            newState.splice(index, 1)
            return setAlunos(newState)
        } catch (error) {
            const status = get(error, 'response.status', 0)

            if (status === 401) {
                return toast.error('Usuário inválido')
            }
            return toast.error('Ocorreu um erro ineperado')
        }
    }

    return (
        <Conteiner>
            <Loding isloading={isLoading} />
            <CriarNovoAluno to="/aluno">Criar novo aluno</CriarNovoAluno>
            <AlunosContainer>
                {alunos.map((aluno, index) => (
                    <div key={String(aluno.id)}>
                        <ProfilePicture>
                            {
                                get(aluno, 'Fotos[0].url', false) ? (
                                    <img src={aluno.Fotos[0].url} />
                                ) : (
                                    <FaUserCircle size={80}></FaUserCircle>
                                )
                            }
                        </ProfilePicture>
                        <span>{aluno.nome}</span>
                        <span>{aluno.email}</span>
                        <Link to={`aluno/${aluno.id}/edit`}>
                            <FaEdit color="#fff" size={18} />
                        </Link>
                        <Link to={`aluno/${aluno.id}/delete`}>
                            <FaWindowClose onClick={handleDeleteAsk} color="#fff" size={18} />
                            <FaExclamation onClick={e => handleDelete(e, aluno.id, index)} color="#fff" size={18} display='none' cursor='pointer' />
                        </Link>
                    </div>
                ))}
            </AlunosContainer>
        </Conteiner >
    )
}