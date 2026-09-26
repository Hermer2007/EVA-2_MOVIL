import {StyleSheet, Text, View, FlatList} from 'react-native'
import React, { useEffect, useState } from 'react'
import { onValue, ref } from 'firebase/database'
import { auth, db } from '../firebase/config'
import Operacion from '../components/Operacion'

export default function HistorialScreen() {
  const [operaciones, setOperaciones] = useState<any[]>([])

  useEffect(() => {
    leerOperaciones()
  }, [])

  function leerOperaciones() {
    const usuario = auth.currentUser
    if (!usuario) {
      return
    }

    const referencia = ref(
      db,
      'operaciones/' + usuario.uid
    )

    onValue(referencia, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const lista = Object.keys(data).map(id => ({
          firebaseId: id,
          ...data[id]
        }))
        setOperaciones(lista)
      } else {
        setOperaciones([])
      }
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>​​🗃️​ HISTORIAL</Text>

      <FlatList
        data={operaciones}
        keyExtractor={(item) => item.firebaseId}
        renderItem={({ item }) =>
          <Operacion datos={item} />}

        ListEmptyComponent={
          <Text style={styles.vacio}>
            No existen operaciones
          </Text>
        }
      />
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
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000',
    marginBottom: 15,
  },

  vacio: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
  },
})