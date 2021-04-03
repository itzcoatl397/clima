
import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableWithoutFeedback,
    Animated,
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';


const Formulario = ({busqueda,setBusqueda,setConsultar}) => {
    const {ciudad,pais} = busqueda

    const [paises, setPaises] = useState();
    const [animacionBoton] = useState(new Animated.Value(1));
    const animacionEntrada = () => {
        Animated.spring(animacionBoton, {
            toValue: 0.75
        }).start();

    }
    const animacionSalida = () => {
        Animated.spring(animacionBoton, {
            toValue: 1,
            friction:3,
            tension:1
        }).start();
    }

    const consultarClima = () => {
        if (pais.trim() === '' || ciudad.trim() ==='') {
         mostrarAlerta()
            
        }
        setConsultar(true)

    }

    const mostrarAlerta =()=> {
        Alert.alert(
            "Hubo un error",
            "Agrega una ciudad y pais para la busqueda",
            [
                {
                    text:'Ok'
                }
            ]
        )
    }
    const estiloAnimacion = {
        transform:[{scale:animacionBoton}]
    }

    return (
        <>
            <View style={styles.formulario}>

                <View>
                    <TextInput
                    value={ciudad}
                        style={styles.input}
                        onChangeText = {ciudad => setBusqueda({...busqueda,ciudad})}
                        placeholder="Ciudad"
                        placeholderTextColor="#666"
                        autoFocus={true}
                    />
                </View>
                <View >
                    <Picker
                        itemStyle={
                            {
                                height: 120,

                                backgroundColor: "#FFF"
                            }

                        }
                        selectedValue={pais}
                        onValueChange={(pais) =>
                            setBusqueda({...busqueda,pais})
                        }>
                        <Picker.Item label="--Seleccione un pais --" value="" />
                        <Picker.Item label="Estados Unidos" value="US" />
                        <Picker.Item label="Mexico" value="Mx" />
                        <Picker.Item label="Argentina" value="Ar" />
                        <Picker.Item label="Colombia" value="Co" />
                        <Picker.Item label="España" value="Es" />
                        <Picker.Item label="Peru" value="Pr" />
                        <Picker.Item label="Rusia" value="Rs" />

                    </Picker>
                </View>
                <TouchableWithoutFeedback
                    onPressIn={() => animacionEntrada()}
                    onPressOut={() => animacionSalida()}
                    onPress={() => consultarClima()}

                >
                    < Animated.View style={[styles.btnBuscar,estiloAnimacion]}>
                        <Text style={styles.txtBuscar}>Buscar Clima</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </>
    );
};

const styles = StyleSheet.create({

    input: {
        padding: 10,
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 25,
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    btnBuscar: {
        marginTop: 50,
        backgroundColor: "black",
        padding: 10,
        justifyContent: 'center',
        borderRadius: 24

    },
    txtBuscar: {
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
        fontSize: 18

    }
});
export default Formulario;