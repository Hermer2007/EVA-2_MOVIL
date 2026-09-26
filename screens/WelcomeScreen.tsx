import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

export default function WelcomeScreen({ navigation }: any) {

    return (
    <View style={styles.container}>

        <Text style={styles.titulo}>WELCOME</Text>

        <View style={styles.logo}>
            <Text style={styles.banco}>🏦</Text>
        </View>

        <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('Login')}
        >
            <Text style={styles.textoBoton}>LOGIN</Text>
        </TouchableOpacity>

        <TouchableOpacity
            style={styles.boton}
            onPress={() => navigation.navigate('Registro')}
        >
            <Text style={styles.textoBoton}>REGISTRO</Text>
        </TouchableOpacity>

        <Text style={styles.autor}>
            Desarrollado por: Marcelo Heredia
        </Text>

    </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fb3f',
},

titulo: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 30,
},

logo: {
    marginBottom: 35,
},

banco: {
    fontSize: 90,
},

boton: {
    width: 180,
    height: 50,
    borderWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    borderRadius: 15,
    backgroundColor:"#302f2f"
},

textoBoton: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#ffffff'
},

autor: {
    marginTop: 50,
    fontSize: 18,
    color: '#222121',
},
})