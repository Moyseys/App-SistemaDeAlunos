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
       display: none;
    }

    label {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 10px;
        font-size: 30px;
        cursor: pointer;
        background-color: ${colors.secondColor};
        overflow: hidden;
        color: #fff;
        width: 400px;
        height: 400px;
        border: 5px dashed ${colors.tertiaryColor};
        border-radius: 50%;
    }
    
`