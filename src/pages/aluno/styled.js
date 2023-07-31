import styled from 'styled-components'
import * as colors from '../../config/colors'

import { secondColor, tertiaryColor } from '../../config/colors'

export const Title = styled.h1`
    text-align: center;
`
export const Form = styled.form`
    display: flex;

    align-items: center;
    flex-direction: column;
    justify-content: center;
    row-gap: 30px;

    input {
        padding: 10px;
        font-size: 18px;
        color: #fff;
        border-radius: 5px;
        background: transparent;
        border: 1px solid ${secondColor};

        &:focus{
            border: 1px solid ${tertiaryColor};
        }
    }
    
`

export const ProfilePicture = styled.span`
    margin: 40px;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;

    position: relative;

    img {
        width: 180px;
        height: 180px;
        border-radius: 50%;
    }

    a {
        position: absolute;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;

        bottom: 0;
        background: ${colors.primaryColor};

        width: 36px;
        height: 36px;

        border-radius: 50%;
    }

`