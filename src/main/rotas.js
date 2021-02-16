import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastroUsuario'
import ConsultaLancamentos from '../views/lancamentos/consulta-lancamentos'
import CadastroLancamentos from '../views/lancamentos/cadastro-lancamentos'
import { AuthConsumer } from './provedorAutenticacao.js'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

function RouteAuthenticate( { component: Component, isUsuarioAutenticado, ...props } ){
    return (
        <Route {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado){
                return (
                    <Component {...componentProps} />
                )
            }else{
                return(
                    <Redirect to={ {pathname : '/login', state : { from: componentProps.location } } } />
                )
            }
        }}  />
    )
}

function Rotas(props){
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuarios" component={CadastroUsuario} />
                
                <RouteAuthenticate isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RouteAuthenticate isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-lancamentos" component={ConsultaLancamentos} />
                <RouteAuthenticate isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-lancamentos/:id?" component={CadastroLancamentos} />
            </Switch>
        </HashRouter>
    )
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
)