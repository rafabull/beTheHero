import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons'

import logo from '../../assets/logo.png';
import styles from './styles'

import api from '../../services/api'


export default function Incidents() {
    const nav = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(inc){
        nav.navigate('Detail', {inc});
    }

    async function loadIncidents(){
        if (loading){
            return;
        }

        if (total > 0 && incidents.length == total){
            return;
        }

        setLoading(true);
        const response = await api.get('incidents', {
            params: { page },
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() =>{
        loadIncidents();
    }, [])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <Text style={styles.headerText}>
                    Total de 
                    <Text style={styles.headerTextBold}> {total} casos.</Text> 
                </Text>
            </View>
            <Text style={styles.title}>Bem vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList style={styles.incidentsList}
                data={incidents} 
                keyExtractor={incident => String(incident.id)}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                renderItem={({item: inc}) => (
                    <View style={styles.incident} >
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{inc.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{inc.title}</Text>

                        <Text style={styles.incidentProperty}>Value:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', 
                            {style: 'currency', currency: 'BRL'}
                            ).format(inc.value)}
                            </Text>

                        <TouchableOpacity style={styles.detailsButton} 
                        onPress={() => navigateToDetail(inc)} >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>
                    </View>

                )} />
        </View>
    )
}