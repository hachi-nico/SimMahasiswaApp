import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {MainContainer} from '../index';
import {Color, baseUrl} from '../../Config/GlobalVar';
import {Input, Card} from '@ui-kitten/components';
import axios from 'axios';

export const TambahMahasiswa = ({navigation, route}) => {
  const [loading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      nama: route.params?.nama ? route.params.nama : '',
      nrp: route.params?.nrp ? `${route.params.nrp}` : '',
    },
  });
  const url = baseUrl + 'addMahasiswa';
  const urlUpdate = baseUrl + 'updateMahasiswa/' + route.params?.id;

  const onSubmit = ({nama, nrp}) => {
    const body = {
      nama: nama,
      nrp: parseInt(nrp),
    };

    const addMhs = async () => {
      try {
        await axios.post(url, body);
        navigation.navigate('Home');
      } catch (error) {
        console.warn(error);
      }
    };
    const updateMhs = async () => {
      try {
        await axios.put(urlUpdate, body);
        navigation.navigate('Home');
      } catch (error) {
        console.warn(error);
      }
    };
    if (route.params?.nama && route.params?.nrp) {
      return updateMhs();
    }
    addMhs();
  };

  return (
    <MainContainer>
      <View
        style={{
          elevation: 2,
          margin: 6,
          flex: 1,
          alignItems: 'center',
          borderRadius: 4,
          backgroundColor: '#fff',
          padding: 8,
        }}>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}>
          <Card>
            <Text style={{marginBottom: 20}}>Berhasil input data !!</Text>
            <TouchableOpacity
              style={{
                backgroundColor: Color.pensBlue,
                padding: 10,
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setVisible(false)}>
              <Text style={{color: Color.pensYellow}}>Oke</Text>
            </TouchableOpacity>
          </Card>
        </Modal>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Masukkan Nama Mahasiswa"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={{
                borderColor: Color.pensBlue,
                borderBottomWidth: 5,
                marginBottom: 20,
              }}
            />
          )}
          name="nama"
        />
        {errors.nama && (
          <Text style={{marginTop: -20, color: Color.pensBlue}}>
            Nama tidak boleh kosong
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              placeholder="Masukkan NRP Mahasiswa"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={{
                borderColor: Color.pensBlue,
                borderBottomWidth: 5,
                marginBottom: 20,
              }}
              keyboardType="numeric"
            />
          )}
          name="nrp"
        />
        {errors.nrp && (
          <Text style={{marginTop: -20, color: Color.pensBlue}}>
            Nrp tidak boleh kosong
          </Text>
        )}
        <TouchableOpacity
          style={{
            backgroundColor: Color.pensBlue,
            padding: 10,
            borderRadius: 4,
            alignItems: 'center',
            marginTop: 5,
          }}
          onPress={handleSubmit(onSubmit)}>
          <Text style={{color: Color.pensYellow}}>
            {route.params?.id ? 'Update data' : 'Tambah Data'}
          </Text>
        </TouchableOpacity>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: Color.pensBlue,
    width: 200,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
