import { createGlobalStyle, styled } from 'styled-components'
import * as colors from '../config/colors'
import 'react-toastify/dist/ReactToastify.css'

export default createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        border: none;
        outline: none;
        display: border-box;
        font-family: Arial, Helvetica, sans-serif;
    }

    html,body,#root{
       height: 100%;
    }

    button{
        cursor: pointer;
    }

    a{
        text-decoration: none;
    }

    ul{
        list-style: none;
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--success {
        background: ${colors.successColor}
    }

    body .Toastify .Toastify__toast-container .Toastify__toast--error {
        background: ${colors.errorColor}
    }
`;

export const Conteiner = styled.section`
    max-width: 90%;
    background-color: ${colors.primaryColor};
    padding: 20px;
    margin: 30px auto;
    border-radius: 10px;
    border: 3px solid #000;

    color: #fff;
` 
