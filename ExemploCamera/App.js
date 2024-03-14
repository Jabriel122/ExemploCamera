import { Camera, CameraType } from 'expo-camera';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState, useRef } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'
import * as MediaLibrary from 'expo-media-library'
export default function App() {

  //Isso aqui é um HOOK para determina qual lado da camera, ela vai estar.
  //A gente vai na propriedade "Camera", Constante, o tipo da constancia? e escolhemos se é "back" ou "front"
  const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.front)
  const [photo, setPhoto] = useState(null)
  const [openModal, setOpenModal] = useState(false)

  //Essa constancia pega o que vai estar na câmera
  const cameraRef = useRef(null)



  async function CapturePhoto() {
    //Verificando se a CameraRef está vázio
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync()
      setPhoto(photo.uri)

      setOpenModal(true)

      console.log(photo)
    }

  }

  async function ClearPhoto(){
    setPhoto(null)

    setOpenModal(false)
  }

  async function SavePhoto(){
    //Verificação se tem uma foto para ser salva
    if(photo){
      await MediaLibrary.createAssetAsync(photo)
      .then(() => {
        alert('Sucesso', 'Foto salva na galeria')
      }).catch(error =>{
        alert("Erro ao processar foto")
        console.log(error)
      })
    }
  }

  //Aqui é um código para pedir ao usuario a permissão do uso da Câmera
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();

      const {status: mediaStatus} = await MediaLibrary.requestPermissionsAsync();
    })();
  }, [])

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
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

      <TouchableOpacity style={styles.btnCaptura} onPress={() => CapturePhoto()}>
        <FontAwesome name='camera' size={23} color={'#fff'} />
      </TouchableOpacity>
      <Modal animationType='slide' transparent={false} visible={openModal}>
        <View style={{ flex: 1, alignItems: 'center', padding: 30 }}>
          <Image
            style={{ width: '100%', height: 500, borderRadius: 10 }}
            source={{ uri: photo }}
          />

          <View style={{ margin: 15, flexDirection: "row" }}>
            <TouchableOpacity style={styles.btnCancel} onPress={() => ClearPhoto()}>
              <FontAwesome name='trash' size={23} color={'#ff0000'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnUpload} onPress={() => SavePhoto()}>
              <FontAwesome name='save' size={23} color={'#121212'} />
            </TouchableOpacity>
          </View>

        </View>
      </Modal>
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
  viewFlip: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  btnFlip: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    padding: 15
  },
  textFlip: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 20
  },
  btnCaptura: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#121212',

    alignItems: 'center',
    justifyContent: 'center'
  },
  btnCancel: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'transparent',

    alignItems: 'center',
    justifyContent: 'center'
  },
  btnUpload: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: 'transparent',

    alignItems: 'center',
    justifyContent: 'center'
  }
});
