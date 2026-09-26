import {StyleSheet, Text, TouchableOpacity, View, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'

import { ref, onValue } from 'firebase/database'
import { auth, db } from '../firebase/config'
import WelcomeScreen from './WelcomeScreen'
import { signOut } from 'firebase/auth'

export default function PerfilScreen({ navigation }: any) {

  const [datos, setDatos] = useState<any>(null)

  useEffect(() => {
    leerUsuario()
  }, [])

  function leerUsuario() {
    const usuarioActivo = auth.currentUser
    if (!usuarioActivo) {
      return
    }

    const referencia = ref(
      db,
      'usuarios/' + usuarioActivo.uid
    )
    onValue(referencia, (snapshot) => {

      const data = snapshot.val()
      if (data) {
        setDatos(data)
      }
    })
  }

  function cerrarSesion() {

  Alert.alert('Cerrar sesión',
    '¿Está seguro que desea cerrar sesión?',
    [{text: 'Cancelar'},
      {
        text: 'Aceptar',
        onPress: () => {
          signOut(auth)
            .then(() => {
              navigation.replace('Welcome')
            })}
      }])
  }

  return (
    <View style={styles.container}>

      <Text style={styles.icono}>​​👤​</Text>
      <Text style={styles.titulo}>PERFIL</Text>
      
      {datos ? (
        <>

          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>
              Información personal
            </Text>

            <Text style={styles.texto}>
              Usuario: {datos.usuario}
            </Text>

            <Text style={styles.texto}>
              Celular: {datos.celular}
            </Text>
          </View>


          <View style={styles.seccion}>
            <Text style={styles.subtitulo}>
              Información de la cuenta
            </Text>

            <Text style={styles.texto}>
              Correo: {datos.correo}
            </Text>
          </View>
        </>
      ) : (
        <Text>Cargando información...</Text>
      )}

      <TouchableOpacity
        style={styles.botonCerrar}
        onPress={cerrarSesion}
      >
        <Text style={styles.textoBoton}>
          CERRAR SESIÓN
        </Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fb3f',
  },

  titulo: {
    fontSize: 38,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 50,
  },

  icono: {
    fontSize: 60,
    textAlign: 'center',
    marginBottom: 1,
  },

  seccion: {
    backgroundColor: '#ddd8d8',
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: 15,
  },

  texto: {
    fontSize: 16,
    color: '#000000',
    fontWeight:'bold',
    marginVertical: 5,
  },

  botonCerrar: {
    width: 160,
    height: 50,
    backgroundColor: '#c31212',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    marginTop: 25,
    marginHorizontal:90
  },

  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
})