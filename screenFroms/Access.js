/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
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

const Access = () => {
  const [list, setList] = useState([]);
  const [action, setAction] = useState(false);

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
      user_id: 3,
      action: 'read',
      restaurant_id: 32,
      brand_id: 3,
    }).then(res => {
      setList(res.data);
    });
  }, []);

  for (i = 0; i < list.length; i++) {
    arrItems.push({
      appRank: list[i].rank_order,
      menutype_id: list[i].menutype_id,
      menu_type: list[i].menu_type,
      rank_order: list[i].rank_order,
    });
  }

  console.log(arrItems);

  const formatter = () => {
    arrItems.map(item => {
      if (item.appRank !== item.rank_order) {
        console.log('mismatch detected');
        rankupdater(item);
      }
    });
  };

  const newListSetter = (item, list) => {
    const newArrItems = [];
    const setter = [];
    list.map(item => {
      setter.push(item);
    });
    setter.map((i, index) => {
      const item = parseInt(i);
      newArrItems.push({
        appRank: index,
        menutype_id: arrItems[item].menutype_id,
        menu_type: arrItems[item].menu_type,
        rank_order: arrItems[item].rank_order,
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
      <TouchableOpacity
        onPress={formatter}
        style={{
          width: 60,
          height: 20,
          // backgroundColor: 'yellow',
          borderRadius: 5,
          // borderWidth: 2,
          // borderColor: 'red',
          backgroundColor: '#ee8b8d',
          justifyContent: 'center',
        }}></TouchableOpacity>
      <SortableList
        style={styles.list}
        contentContainerStyle={styles.contentContainer}
        data={arrItems}
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
    color: '#222222',
  },
});

export default Access;
