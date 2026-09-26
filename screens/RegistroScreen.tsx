import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native'
import React, { useState } from 'react'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref, set } from 'firebase/database'
import { auth, db } from '../firebase/config'

export default function RegistroScreen({ navigation }: any) {

  const [correo, setCorreo] = useState('')
  const [contrasenia, setContrasenia] = useState('')
  const [usuario, setUsuario] = useState('')
  const [celular, setCelular] = useState('')

  function registrar() {

    if (
      correo === '' ||
      contrasenia === '' ||
      usuario === '' ||
      celular === ''
    ) {
      Alert.alert('ERROR', 'Complete todos los campos')
      return
    }

    createUserWithEmailAndPassword(auth, correo, contrasenia)
      .then((credencial) => {

        const uid = credencial.user.uid

        set(ref(db, 'usuarios/' + uid), {
          correo: correo,
          usuario: usuario,
          celular: celular
        })
        .then(() => {

          Alert.alert(
            'REGISTRO',
            'Usuario registrado correctamente'
          )

          navigation.navigate('Login')

        })

      })
      .catch(() => {
        Alert.alert('ERROR', 'No se pudo registrar el usuario')
      })
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>REGISTRO</Text>
      <Text style={styles.icono}>🖥️​</Text>

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

      <TextInput
        style={styles.input}
        placeholder="Ingrese usuario"
        value={usuario}
        onChangeText={setUsuario}
      />

      <TextInput
        style={styles.input}
        placeholder="Número de celular"
        value={celular}
        onChangeText={setCelular}
        keyboardType="phone-pad"
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={registrar}
      >
        <Text style={styles.textoBoton}>Registro</Text>
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