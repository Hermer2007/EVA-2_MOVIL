import {StyleSheet, Text, View, TextInput, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { ref, push, set } from 'firebase/database'
import { auth, db } from '../firebase/config'

export default function OperacionesScreen() {

  const [id, setId] = useState('')
  const [monto, setMonto] = useState('')
  const [tipo, setTipo] = useState('')
  const [comentario, setComentario] = useState('')

  function ejecutar() {
    if (id === '' || monto === '' ||
        tipo === '' || comentario === '') {
      Alert.alert('ERROR', 'Complete todos los campos')
      return
    }

  const valorMonto = Number(monto)
    if (valorMonto < 0) {
      Alert.alert(
        'ERROR',
        'No se permiten montos negativos'
      )
      return
    } if (valorMonto > 500) {
      Alert.alert(
        'CONFIRMACIÓN',
        'El monto es mayor a $500. ¿Desea continuar?',
        [{text: 'Cancelar'},
          {text: 'Continuar',onPress: () => guardarOperacion(valorMonto)}]
      )
    } else{guardarOperacion(valorMonto)}
  }

  function guardarOperacion(valorMonto: number) {
    const usuario = auth.currentUser

    if (!usuario) {
      Alert.alert('ERROR', 'No existe un usuario activo')
      return
    }

    const referencia = push(
      ref(db, 'operaciones/' + usuario.uid)
    )

    set(referencia, {
      id: id,
      monto: valorMonto,
      tipo: tipo,
      comentario: comentario
    })
      .then(() => {

        Alert.alert(
          'OPERACIÓN EXITOSA',
          'La operación fue realizada con éxito'
        )

        setId('')
        setMonto('')
        setTipo('')
        setComentario('')

      })
      .catch(() => {
        Alert.alert('ERROR', 'No se pudo realizar la operación')
      })
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>OPERACIONES</Text>
      <Text style={styles.icono}>​💸​</Text>

      <TextInput
        style={styles.input}
        placeholder="Id operación"
        value={id}
        onChangeText={setId}
      />

      <TextInput
        style={styles.input}
        placeholder="Monto"
        value={monto}
        onChangeText={setMonto}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo operación"
        value={tipo}
        onChangeText={setTipo}
      />

      <TextInput
        style={styles.input}
        placeholder="Comentario"
        value={comentario}
        onChangeText={setComentario}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={ejecutar}
      >
        <Text style={styles.textoBoton}>EJECUTAR</Text>
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
    backgroundColor:'#ffffff'
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