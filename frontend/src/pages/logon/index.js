import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlusSquare } from 'react-icons/fi';

import api from '../../services/api'

import './styless.css'

import heroesImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'

export default function Logon(){
    const [id, setId] = useState('');
    const his = useHistory();

    async function handlerLogon(e){
        e.preventDefault();

        const data = {
            id,
        }

        try{
            const response = await api.post('sessions', data)

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            his.push('/profile')
        }
        catch(err){
            alert('Falha ao fazer o login, verifique seu ID e tente novemente')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be The Hero"/>
                <form onSubmit={handlerLogon}>
                    <h1>Faça seu logon</h1>

                    <input placeholder="Sua ID" value={id}
                        onChange={e => setId(e.target.value)} required/>
                    <button type="submit" className="button">Entrar</button>

                    <Link to="/register" className="back-link">
                        <FiPlusSquare size={18} color="#E02041" /> 
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    )

}