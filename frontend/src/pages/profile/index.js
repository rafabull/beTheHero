import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';

import './styless.css'

import heroesImg from '../../assets/heroes.png'
import logo from '../../assets/logo.svg'
import api from '../../services/api';

export default function Profile(){
    const [incidents, setincidents] = useState([]);
    const his = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() =>{
        if (ongId == undefined){
            his.push('/');
        }
        api.get('profile', {
        headers: {
                Authorization: ongId,
            }
        }).then(response => {
            setincidents(response.data);
        })
        
    },[ongId]);

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            });
            setincidents(incidents.filter(inc => inc.id !== id));
        }
        catch(err){
            alert('Falha ao deletar caso, tente novamente.');
        }
    }

    function handleLogout(){
        localStorage.clear();
        his.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>
                <Link to="/incidents/new" className="button">
                    Cadastrar novo caso
                </Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(inc => (
                    <li key={inc.id}>
                        <strong>CASO:</strong>
                        <p>{inc.title}</p>
                        
                        <strong>DESCRIÇÃO</strong>
                        <p>{inc.description}</p>
                        
                        <strong>VALOR</strong>
                        <p>{Intl.NumberFormat('pt-BR', 
                            { style: 'currency', currency: 'BRL' }).format(inc.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(inc.id)}>
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
                
            </ul>
        </div>
    )

}