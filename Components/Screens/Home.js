import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  View,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {Color, baseUrl, loremPicsum} from '../../Config/GlobalVar';
import {Modal, Card, Text} from '@ui-kitten/components';
import {MainContainer} from '../index';

export const HomeScreen = ({navigation}) => {
  const [dataMhs, setDataMhs] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isToggleDelete, setToggleDelete] = useState(false);

  const url = baseUrl + 'mahasiswa';

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getMhs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, {cancelToken: source.token});
        setDataMhs(response.data.data);
        setIsLoading(false);
      } catch (error) {
        setVisible(true);
        setIsLoading(false);
      }
    };
    getMhs();
    return () => source.cancel('');
  }, []);

  const getRandomNum = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  const renderItem = ({item}) => {
    const imgId = getRandomNum(1, 70);
    const urlRandomAvatar = 'https://i.pravatar.cc/300?img=' + imgId;

    return (
      <>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('DetailMahasiswa', {...item, imgId})
          }
          style={{
            elevation: 2,
            margin: 6,
            flex: 1,
            alignItems: 'center',
            borderRadius: 4,
            backgroundColor: '#fff',
            padding: 8,
          }}>
          <>
            <TouchableWithoutFeedback
              onPress={async () => {
                try {
                  setIsLoading(true);
                  const urlDeleteMhs = baseUrl + `deleteMahasiswa/${item.id}`;
                  await axios.delete(urlDeleteMhs);
                  const response = await axios.get(url);
                  setDataMhs(response.data.data);
                  setIsLoading(false);
                } catch (error) {
                  setIsLoading(false);
                  console.warn('error saat hapus data');
                }
              }}>
              <View
                style={{
                  padding: 5,
                  position: 'absolute',
                  borderRadius: 4,
                  top: 4,
                  left: 4,
                }}>
                <Text
                  style={{
                    color: Color.pensBlue,
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>
                  X
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <Image
              source={{uri: urlRandomAvatar}}
              style={{
                width: 100,
                height: 100,
                resizeMode: 'contain',
                borderRadius: 6,
              }}
            />
            <Text>{`Nama: ${item.nama}`}</Text>
            <Text>{`Nrp: ${item.nrp}`}</Text>
          </>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <MainContainer>
      <StatusBar backgroundColor={Color.pensBlue} />
      {loading ? (
        <ActivityIndicator size="large" color={Color.pensBlue} />
      ) : (
        <>
          <FlatList
            contentContainerStyle={{paddingBottom: 75}}
            data={dataMhs}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, i) => `${i}`}
            renderItem={renderItem}
            numColumns={2}
            refreshing={refreshing}
            onRefresh={async () => {
              try {
                setIsLoading(true);
                const response = await axios.get(url);
                setDataMhs(response.data.data);
                setIsLoading(false);
              } catch (error) {
                console.warn(error);
                setVisible(true);
                setIsLoading(false);
              }
            }}
          />
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('TambahMahasiswa')}>
            <View
              style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                backgroundColor: Color.pensBlue,
                width: 50,
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: Color.pensYellow, fontSize: 30}}>+</Text>
            </View>
          </TouchableWithoutFeedback>
        </>
      )}
      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card>
          <Text style={{marginBottom: 20}}>Gagal mengambil data !!</Text>
          <TouchableOpacity
            style={{
              backgroundColor: Color.pensBlue,
              padding: 10,
              borderRadius: 4,
              alignItems: 'center',
            }}
            onPress={() => setVisible(false)}>
            <Text style={{color: Color.pensYellow}}>Oke</Text>
          </TouchableOpacity>
        </Card>
      </Modal>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
