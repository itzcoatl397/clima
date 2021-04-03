/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';

import {
  StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard, Alert
} from 'react-native';

import Clima from './components/Clima';

import Formulario from './components/Formulario'


const App = () => {
  const [consultar, setConsultar] = useState(false)
  const [busqueda, setBusqueda] = useState({
    ciudad: '', pais: ''
  })
  const { ciudad, pais } = busqueda
  const [resultado, setResultado] = useState({})
  const [bgcolor, setBgcolor] = useState('rgb(71,189,212)')

  useEffect(() => {
    const consultarApi = async () => {
      if (consultar) {
        const appId = '0b0f357ddd7722270d211afb7920a266'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
        try {

          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          setResultado(resultado)
          setConsultar(false)
          // modifica  los colores
          const kelvin = 273.15;
          const { main } = resultado;
          const actual = main.temp - kelvin
          if (actual < 10) {
            setBgcolor('rgb(105,108,149)')

          } else if (actual >= 10 && actual < 25) {
            setBgcolor('rgb(71,189,212)')
          } else {
            setBgcolor('rgb(178,28,61)')
          }
        } catch (error) {
          mostrarAlerta()

        }


      }

    }
    consultarApi()


  }, [consultar])
  const mostrarAlerta = () => {
    Alert.alert(
      "Hubo un error en la busqueda",
      "No hay resultados  intenta con otro pais",
      [
        {
          text: 'Ok'
        }
      ]
    )
  }

  const salir = () => {
    Keyboard.dismiss()

  }
  const bgcolorApp = {
    backgroundColor: bgcolor
  }
  return (
    <>
      <TouchableWithoutFeedback onPress={() => salir()}>
        <View style={[styles.app, bgcolorApp]}>
          <View style={styles.contenido}>

            <Clima resultado={resultado} />
            <Formulario


              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}



            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,

    justifyContent: 'center'
  },
  contenido: {
    marginHorizontal: '2.5%'
  }
});

export default App;
