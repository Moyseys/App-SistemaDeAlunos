import axios from "axios";

export default axios.create({
    baseURL: 'https://api-sistema-alunos.onrender.com'
})