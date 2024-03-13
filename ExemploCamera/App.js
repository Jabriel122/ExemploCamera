import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {

  //Isso aqui é um HOOK para determina qual lado da camera, ela vai estar.
  //A gente vai na propriedade "Camera", Constante, o tipo da constancia? e escolhemos se é "back" ou "front"
  const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.front)

  //Aqui é um código para pedir ao usuario a permissão do uso da Câmera
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync()
    })();
  }, [])

  return (
    <View style={styles.container}>
      <Camera
        type={tipoCamera}
        style={styles.camera}

        //Ajusta a camerâ para androis
        ratio='16:9'
      >
        <View style={styles.viewFlip}>
          <TouchableOpacity style={styles.btnFlip} onPress={() => setTipoCamera(tipoCamera == CameraType.front ? CameraType.back : CameraType.front)}>
            <Text style={styles.textFlip}> CHANGE </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '80%'
  },
  viewFlip:{
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  btnFlip:{
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 15
  },
  textFlip:{
    fontSize: 20,
    color: '#fff',
    marginBottom: 20
  }
});
