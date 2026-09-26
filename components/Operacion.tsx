import {StyleSheet, Text, TouchableOpacity, Alert} from 'react-native'
import React from 'react'

export default function Operacion(props: any) {
    const datos = props.datos

    function mostrarComentario() {
        Alert.alert(
            'COMENTARIO',
            datos.comentario
        )
    }

    return (
    <TouchableOpacity
        style={styles.tarjeta}
        onPress={mostrarComentario}
    >
    <Text style={styles.id}>
        Operación: {datos.id}
    </Text>
    <Text>
        Monto: ${datos.monto}
    </Text>
    <Text>
        Tipo: {datos.tipo}
    </Text>
    </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

tarjeta: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 15,
    padding: 15,
    marginVertical: 7,
    backgroundColor: '#FFFFFF',
},

id: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
},

})