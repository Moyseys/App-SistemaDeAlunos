import styled from 'styled-components'
import * as colors from '../../config/colors'
import { Link } from 'react-router-dom'

export const AlunosContainer = styled.div`
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 0;
    }

    div + div {
        border-top: 3px solid #fff;
    }

`

export const CriarNovoAluno = styled(Link)`
    color: ${colors.tertiaryColor};
`

export const ProfilePicture = styled.div`
    width: 100px;
    img{
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
`