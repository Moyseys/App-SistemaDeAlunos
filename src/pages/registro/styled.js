import styled from 'styled-components'

import {secondColor, primaryColor, tertiaryColor } from '../../config/colors'
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;

    h1{
        margin-bottom: 40px;
    }

    .row{
        display: flex;
        flex-direction: column;
        margin-top: 10px;
    }

    input{
        padding: 10px;
        color: black;
        font-size: 18px;
        border-radius: 5px;
        background: transparent;
        border: 1px solid ${secondColor};

        &:focus{
            border: 1px solid ${tertiaryColor};
        }
    }

    button{
        margin-top: 90px;
        width: 100%;
        color: ${primaryColor};
        transition: 500ms;
        border-radius: 5px;
        padding: 15px;
        &:hover{
            color: #FFF;
            background-color: ${tertiaryColor};
        }
    }


`