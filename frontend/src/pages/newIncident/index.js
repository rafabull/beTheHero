import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styless.css';

import logo from '../../assets/logo.svg';

export default function Newincident(){
    const his = useHistory();

    const [title, setTilte] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e){
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        }
        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            });

            alert('Cadastro realizado com sucesso!');
            his.push('/profile');
        }
        catch{
            alert('Falha ao cadastrar, tente novamente.');
        }
    }

    function handleCancel(){
        his.push('/profile');
    }

    return(
        <div className="newIncident-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói que resolva isso.</p>
                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={18} color="#E02041" /> 
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input placeholder="Título do caso" value={title} onChange={e => setTilte(e.target.value)} required/>
                    <textarea cols="30" rows="10" placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
                    <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)} required/>
                    <div className="button-group">
                        <button className="cancel" type="button" onClick={handleCancel}>Cancelar</button>
                        <button className="button" type="submit">Cadastrar</button>
                    </div>
                </form>
            </div>
        </div>
    )

}