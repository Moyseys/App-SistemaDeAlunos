import React from 'react'
import { Switch } from 'react-router-dom'

import MyRoute from './MyRoute'

import Login from '../pages/login/'
import Alunos from '../pages/alunos/'
import Aluno from '../pages/aluno/'
import Registro from '../pages/registro/'
import Page404 from '../pages/Page404/'
import Fotos from '../pages/fotos/'

export default function Routes() {
    return (
        <Switch>
            <MyRoute exact path='/' component={Alunos} isClosed={false} />
            <MyRoute exact path='/aluno/:id/edit' component={Aluno} isClosed />
            <MyRoute exact path='/aluno/' component={Aluno} isClosed />
            <MyRoute exact path='/fotos/:id' component={Fotos} isClosed />
            <MyRoute exact path='/login' component={Login} isClosed={false} />
            <MyRoute exact path='/registro' component={Registro} isClosed={false} />

            <MyRoute path='*' component={Page404} />
        </Switch>
    )
}