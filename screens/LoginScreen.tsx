import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/config'

export default function LoginScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')

  function login() {
    if (correo === '' || contrasenia === '') {
      Alert.alert('ERROR', 'Complete todos los campos')
      return
    }
    signInWithEmailAndPassword(auth, correo, contrasenia)
      .then(() => {
        Alert.alert('LOGIN', 'Inicio de sesión correcto')
        navigation.replace('Principal')
      })
      .catch(() => {
        Alert.alert('ERROR', 'Correo o contraseña incorrectos')
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>LOGIN</Text>
      <Text style={styles.icono}>🔒</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingrese correo"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Ingrese contraseña"
        value={contrasenia}
        onChangeText={setContrasenia}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={login}
      >
        <Text style={styles.textoBoton}>Login</Text>
      </TouchableOpacity>

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
    fontSize: 38,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 15,
  },

  icono: {
    fontSize: 80,
    marginBottom: 20,
  },

  input: {
    width: 250,
    height: 50,
    borderWidth: 1,
    borderColor: '#010101',
    borderRadius: 15,
    paddingHorizontal: 12,
    marginVertical: 8,
    color: '#000000',
    backgroundColor:'#dbdbdb'
  },

  boton: {
    width: 160,
    height: 50,
    backgroundColor: '#1E3A8A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    marginTop: 25,
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

})