// import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
// import {
//   Animated,
//   Image,
//   StyleSheet,
//   Text,
//   Platform,
//   Easing,
//   View,
//   Dimensions,
//   TouchableOpacity,
// } from 'react-native';
// import SortableList from 'react-native-sortable-list';
// import apiAxios1 from '../ApiCaller/apiAxios1';

// const window = Dimensions.get('window');

// function Row(props) {
//   const {active, data} = props;

//   const activeAnim = useRef(new Animated.Value(0));

//   const style = useMemo(
//     () => ({
//       ...Platform.select({
//         ios: {
//           transform: [
//             {
//               scale: activeAnim.current.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [1, 1.07],
//               }),
//             },
//           ],
//           shadowRadius: activeAnim.current.interpolate({
//             inputRange: [0, 1],
//             outputRange: [2, 10],
//           }),
//         },

//         android: {
//           transform: [
//             {
//               scale: activeAnim.current.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [1, 1.07],
//               }),
//             },
//           ],
//           elevation: activeAnim.current.interpolate({
//             inputRange: [0, 1],
//             outputRange: [2, 6],
//           }),
//         },
//       }),
//     }),

//     [],
//   );

//   useEffect(() => {
//     Animated.timing(activeAnim.current, {
//       duration: 300,
//       easing: Easing.bounce,
//       toValue: Number(active),
//       useNativeDriver: true,
//     }).start();
//   }, [active]);

//   return (
//     <Animated.View style={[styles.row, style]}>
//       <Text style={styles.text}>{data.menu_type}</Text>
//     </Animated.View>
//   );
// }

// const Access = () => {
//   const [list, setList] = useState([]);
//   const [newOrder, setNewOrder] = useState([]);

//   useEffect(() => {
//     apiAxios1('menutype', {
//       user_id: 3,
//       action: 'read',
//       restaurant_id: 32,
//       brand_id: 3,
//     }).then(res => {
//       setList(res.data);
//     });
//   }, []);

//   const arrItems = [];

//   const rankupdater = item => {
//     console.log(
//       'Rank updater ******************************************************************************************',
//     );
//     console.log(item);
//     apiAxios1('menutype', {
//       menutype_id: item.menutype_id,
//       rank_order: item.appRank,
//       action: 'rank',
//     }).then(response => {
//       console.log(response.data);
//     });
//   };

//   for (i = 0; i < list.length; i++) {
//     arrItems.push({
//       appRank: i,
//       menutype_id: list[i].menutype_id,
//       menu_type: list[i].menu_type,
//       rank_order: list[i].rank_order,
//     });
//   }

//   arrItems.map(item => {
//     if (item.appRank !== item.rank_order) {
//       rankupdater(item);
//     }
//   });

//   const newArrItems = [];

//   newOrder.map(i => {
//     const item = parseInt(i);
//     newArrItems.push(arrItems[item]);
//   });

//   for (i = 0; i < newArrItems.length; i++) {
//     try {
//       arrItems.push({
//         appRank: i,
//         menutype_id: newArrItems[i].menutype_id,
//         menu_type: newArrItems[i].menu_type,
//         rank_order: newArrItems[i].rank_order,
//       });
//     } catch {
//       console.log('catch hit');
//     }
//   }

//   arrItems.map(item => {
//     if (item.appRank !== item.rank_order) {
//       rankupdater(item);
//     }
//   });

//   console.log(list);

//   const renderRow = useCallback(({data, active}) => {
//     return <Row data={data} active={active} />;
//   }, []);

//   return (
//     <View style={styles.container}>
//       <SortableList
//         style={styles.list}
//         contentContainerStyle={styles.contentContainer}
//         data={arrItems}
//         renderRow={renderRow}
//         onReleaseRow={(item, list) => {
//           setNewOrder(list);
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#eee',
//     ...Platform.select({
//       ios: {
//         paddingTop: 20,
//       },
//     }),
//   },
//   title: {
//     fontSize: 20,
//     paddingVertical: 20,
//     color: '#999999',
//   },
//   list: {
//     flex: 1,
//   },
//   contentContainer: {
//     width: window.width,
//     ...Platform.select({
//       ios: {
//         paddingHorizontal: 30,
//       },
//       android: {
//         paddingHorizontal: 0,
//       },
//     }),
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 16,
//     height: 80,
//     flex: 1,
//     marginTop: 7,
//     marginBottom: 12,
//     borderRadius: 4,
//     ...Platform.select({
//       ios: {
//         width: window.width - 30 * 2,
//         shadowColor: 'rgba(0,0,0,0.2)',
//         shadowOpacity: 1,
//         shadowOffset: {height: 2, width: 2},
//         shadowRadius: 2,
//       },
//       android: {
//         width: window.width - 30 * 2,
//         elevation: 0,
//         marginHorizontal: 30,
//       },
//     }),
//   },
//   image: {
//     width: 50,
//     height: 50,
//     marginRight: 30,
//     borderRadius: 25,
//   },
//   text: {
//     fontSize: 24,
//     color: '#222222',
//   },
// });

// export default Access;

import {View, Text} from 'react-native';
import React from 'react';
import LogoTitle from '../screens/LogoTitle';

const Access = () => {
  return (
    <View>
      <LogoTitle />
      <Text>Access</Text>
    </View>
  );
};

export default Access;
