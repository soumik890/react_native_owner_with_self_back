import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LogoTitle from '../screens/LogoTitle';
import apiAxios1 from '../ApiCaller/apiAxios1';
import {DataTable} from 'react-native-paper';
import {Table, TableWrapper, Row} from 'react-native-table-component';
import {useNavigation} from '@react-navigation/native';

const Logs = ({route}) => {
  const navigation = useNavigation();
  const [logs, setLogs] = useState([]);
  const DeviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    apiAxios1('log', {
      restaurant_id: route.params.Rest.restaurant_id,
      action: 'readbyrestid',
    }).then(res => {
      // console.log('responmse data', res.data);
      setLogs(res.data);
    });
  }, []);

  // console.log('log data', logs);

  const tableHead = ['SL No.', 'User Id', 'Logs', 'Date'];
  const widthArr = [60, 60, 200, 200];

  let myArr = [];
  logs.map((item, index) => {
    // const dt = item.c_date;
    const dt = new Date(item.c_date);
    const date = dt.toString();
    const Arr = [index + 1, item.user_id, item.log, date];
    myArr.push(Arr);
  });

  // console.log('tabledata is', tableData);

  // console.log('myarr is', myArr);

  return (
    <View style={styles.container}>
      <LogoTitle />
      <View>
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <Text
            style={{
              color: 'black',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            {route.params.Brand.brand},
          </Text>
          <Text
            style={{
              color: 'black',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            {' '}
            {route.params.Rest.restaurant}
          </Text>
          <Text
            style={{
              color: 'black',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: 15,
            }}>
            {' '}
            (Logs)
          </Text>
        </View>
      </View>
      <ScrollView horizontal={true} style={{margin: 5, marginBottom: 50}}>
        <View>
          <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
              {myArr.map((item, index) => (
                <Row
                  key={index}
                  data={item}
                  widthArr={widthArr}
                  style={[
                    styles.row,
                    index % 2 && {backgroundColor: '#F7F6E7'},
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.bottomView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{
            backgroundColor: '#4c6aff',
            height: 40,
            justifyContent: 'center',
            width: DeviceWidth - 20,
            alignSelf: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 17,
            }}>
            GO BACK
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Logs;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {height: 40, backgroundColor: '#537791'},
  text: {textAlign: 'center', fontWeight: 'bold'},
  dataWrapper: {marginTop: -1},
  row: {
    // height: 120,

    backgroundColor: '#E7E6E1',
  },

  bottomView: {
    width: '100%',
    height: 50,
    // backgroundColor: '#EE5407',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    // marginTop: -500,
  },
});
