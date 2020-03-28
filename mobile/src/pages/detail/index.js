import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'
import * as MailComporser from 'expo-mail-composer'

import logo from '../../assets/logo.png';
import styles from './styles'


export default function Detail(){
    const nav = useNavigation();
    const route = useRoute()

    const inc = route.params.inc;

    const message = `Ola ${inc.name}, estou entrando em contato pois gostaria de ajudar no caso "${inc.title}" no valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(inc.value)}`


    function navigateToIncidents(){
        nav.goBack();
    }

    function sendMail(){
        MailComporser.composeAsync({
            subject: `Herói do caso: ${inc.title}`,
            recipients: [inc.email],
            body: message,
        });
    }

    function sendWhats(){
        Linking.openURL(`whatsapp://send?phone=${inc.whatsapp}&text=${message}`)
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} />
                <TouchableOpacity style={styles.headerText} 
                onPress={(navigateToIncidents)} >
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident} >
                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>{inc.name} de {inc.city} - {inc.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{inc.title}</Text>                
                
                <Text style={styles.incidentProperty}>DETALHES:</Text>
                <Text style={styles.incidentValue}>{inc.description}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', 
                    {style: 'currency', currency: 'BRL'}
                    ).format(inc.value)}
                </Text>
            </View>
            <View style={styles.incident} >
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Sejá o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>
                
                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhats}>
                        <Text style={styles.actionText}>
                            WhatsApp
                        </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>
                            E-mail
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}