import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ScrollView,
  View,
  RefreshControl,
} from 'react-native';
import {Color, baseUrl, loremPicsum} from '../../Config/GlobalVar';
import {Modal, Card, Text} from '@ui-kitten/components';
import {MainContainer} from '../index';

export const DetailMahasiswa = ({navigation, route}) => {
  const [dataMhs, setDataMhs] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const {nama, nrp, imgId, id} = route.params;
  const url = baseUrl + 'mahasiswa/' + id;
  const urlRandomAvatar = 'https://i.pravatar.cc/300?img=' + imgId;

  useEffect(() => {
    const source = axios.CancelToken.source();
    const getMhs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, {cancelToken: source.token});
        setDataMhs(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
        setIsLoading(false);
      }
    };
    getMhs();
    return () => source.cancel('');
  }, []);

  return (
    <MainContainer>
      <StatusBar backgroundColor={Color.pensBlue} />
      {loading ? (
        <ActivityIndicator size="large" color={Color.pensBlue} />
      ) : (
        <ScrollView
          contentContainerStyle={{flex: 1}}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={async () => {
                try {
                  setIsLoading(true);
                  const response = await axios.get(url);
                  setDataMhs(response.data.data);
                  setIsLoading(false);
                } catch (error) {
                  console.warn(error);
                  setIsLoading(false);
                }
              }}
            />
          }>
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
            <Image
              source={{uri: urlRandomAvatar}}
              style={{
                width: 200,
                height: 200,
                resizeMode: 'contain',
                borderRadius: 6,
                marginVertical: 10,
              }}
            />
            <Text>{`Nama: ${nama}`}</Text>
            <Text>{`Nrp: ${nrp}`}</Text>
            <TouchableOpacity
              style={{
                backgroundColor: Color.pensBlue,
                padding: 10,
                borderRadius: 4,
                alignItems: 'center',
                marginTop: 15,
              }}
              onPress={() =>
                navigation.navigate('TambahMahasiswa', {...route.params})
              }>
              <Text style={{color: Color.pensYellow}}>Ubah Data</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});
