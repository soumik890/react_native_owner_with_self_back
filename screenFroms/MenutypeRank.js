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
import {List} from 'react-native-paper';

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
      <Text style={styles.text}>{data.menu_type}</Text>
    </Animated.View>
  );
}

const MenuTypeRank = () => {
  const [list, setList] = useState([]);
  const [action, setAction] = useState(false);
  const {Rest, setRest} = useContext(exportvalues);
  const {MenuType, setMenuType} = useContext(exportvalues);
  const {Brand, setBrand} = useContext(exportvalues);
  const {UserID} = useContext(exportvalues);
  let user = parseInt(UserID);

  const arrItems = [];

  const rankupdater = item => {
    console.log(
      'Rank updater ******************************************************************************************',
    );
    // console.log(item);
    apiAxios1('menutype', {
      menutype_id: item.menutype_id,
      rank_order: item.appRank,
      action: 'rank',
    }).then(response => {
      console.log(response.data);
    });
  };

  useEffect(() => {
    console.log('use effect called @@@@@@@@@@@@@@@@@@@@@@@@');
    apiAxios1('menutype', {
      user_id: user,
      action: 'read',
      restaurant_id: Rest.restaurant_id,
      brand_id: Brand.brand_id,
    }).then(res => {
      //   console.log(res.data);
      setList(res.data);
    });
  }, []);

  console.log('List data is', list);

  const newListSetter = (item, newlist) => {
    const newArrItems = [];
    const setter = [];

    newlist.map((i, index) => {
      const item = parseInt(i);
      newArrItems.push({
        appRank: index,
        menutype_id: list[item].menutype_id,
        menu_type: list[item].menu_type,
        rank_order: list[item].rank_order,
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
      <View>
        <View style={{alignSelf: 'center'}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            {Brand.brand}
          </Text>
        </View>
        <View style={{alignSelf: 'center'}}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>
            {Rest.restaurant}
          </Text>
        </View>
      </View>
      <SortableList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={list}
        renderRow={renderRow}
        onReleaseRow={(item, list) => {
          newListSetter(item, list);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    ...Platform.select({
      ios: {
        paddingTop: 20,
      },
    }),
  },
  title: {
    fontSize: 20,
    paddingVertical: 20,
    color: '#999999',
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
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
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
    fontSize: 24,
    color: 'black',
    textTransform: 'capitalize',
  },
});

export default MenuTypeRank;
