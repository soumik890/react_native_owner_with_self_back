/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  Platform,
  Easing,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import SortableList from 'react-native-sortable-list';
import {exportvalues} from '../contextApi/ContextTab';
import LogoTitle from '../screens/LogoTitle';
import {useNavigation} from '@react-navigation/native';

const window = Dimensions.get('window');

function Row(props) {
  const {active, data} = props;

  const activeAnim = useRef(new Animated.Value(0));
  const style = useMemo(
    () => ({
      ...Platform.select({
        ios: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          shadowRadius: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 10],
          }),
        },

        android: {
          transform: [
            {
              scale: activeAnim.current.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.07],
              }),
            },
          ],
          elevation: activeAnim.current.interpolate({
            inputRange: [0, 1],
            outputRange: [2, 6],
          }),
        },
      }),
    }),
    [],
  );
  useEffect(() => {
    Animated.timing(activeAnim.current, {
      duration: 300,
      easing: Easing.bounce,
      toValue: Number(active),
      useNativeDriver: true,
    }).start();
  }, [active]);

  return (
    <Animated.View style={[styles.row, style]}>
      <Image source={{uri: data.menutype_image}} style={[styles.image]} />
      <Text style={styles.text}>{data.menu}</Text>
    </Animated.View>
  );
}

const MenuRank = () => {
  const navigation = useNavigation();
  const DeviceWidth = Dimensions.get('window').width;
  const DeviceHeight = Dimensions.get('window').height;

  const [list, setList] = useState([]);
  const [action, setAction] = useState(false);
  const {Rest, setRest} = useContext(exportvalues);
  // const {MenuType, setMenuType} = useContext(exportvalues);
  const {AllMenuType, setAllMenuType} = useContext(exportvalues);
  const {DispMenu, setDispMenu} = useContext(exportvalues);

  const {Brand, setBrand} = useContext(exportvalues);
  const {actionM, setactionM} = useContext(exportvalues);
  const {MenuType, setMenuType} = useContext(exportvalues);

  const {UserID} = useContext(exportvalues);
  let user = parseInt(UserID);

  const arrItems = [];

  console.log('Dispmenu items are', DispMenu);

  const rankupdater = item => {
    console.log(
      'Rank updater ******************************************************************************************',
    );
    // console.log(item);
    apiAxios1('menu', {
      menu_id: item.menu_id,
      rank_order: item.appRank,
      action: 'rank',
    }).then(response => {
      console.log(response.data);
      setactionM(!actionM);
    });
  };

  const newListSetter = (item, newlist) => {
    const newArrItems = [];
    const setter = [];

    newlist.map((i, index) => {
      const item = parseInt(i);
      newArrItems.push({
        appRank: index,
        menu_id: DispMenu[item].menu_id,
        menu: DispMenu[item].menu,
        rank_order: DispMenu[item].rank_order,
      });
    });
    console.log('newArrItems are', newArrItems);
    newArrItems.map(item => {
      if (item.appRank !== item.rank_order) {
        console.log('mismatch detected from Setter');
        rankupdater(item);
      }
    });
  };
  const renderRow = useCallback(({data, active}) => {
    return <Row data={data} active={active} />;
  }, []);

  return (
    <View style={styles.container}>
      <LogoTitle />
      <View style={{backgroundColor: 'orange'}}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 20,
            alignSelf: 'center',
          }}>
          Menu Rank
        </Text>
      </View>

      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
            alignSelf: 'center',
          }}>
          {Brand.brand},
        </Text>
        <Text
          style={{
            color: 'black',
            fontWeight: 'bold',
            fontSize: 15,
            alignSelf: 'center',
          }}>
          {' '}
          {Rest.restaurant}
        </Text>
      </View>
      <Text
        style={{
          color: 'black',
          fontWeight: 'bold',
          fontSize: 12,
          alignSelf: 'center',
          textTransform: 'uppercase',
        }}>
        {' '}
        {MenuType.menu_type}
      </Text>

      <SortableList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={DispMenu}
        renderRow={renderRow}
        onReleaseRow={(item, list) => {
          newListSetter(item, list);
        }}
      />

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#eee',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },

  title: {
    fontSize: 15,
    // paddingVertical: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  list: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    ...Platform.select({
      ios: {
        paddingHorizontal: 30,
      },
      android: {
        paddingHorizontal: 0,
      },
    }),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 6,
    height: 50,
    flex: 1,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: {height: 2, width: 2},
        shadowRadius: 2,
      },
      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 30,
    borderRadius: 25,
  },
  text: {
    fontSize: 20,
    color: '#222222',
    textTransform: 'uppercase',
    // fontWeight: 'bold',
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

export default MenuRank;
