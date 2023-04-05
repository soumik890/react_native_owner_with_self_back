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

// import React, {useState} from 'react';
// import {StyleSheet, Text, TouchableOpacity, View, CheckBox} from 'react-native';
// import DraggableFlatList from 'react-native-draggable-flatlist';

// const initialData = [
//   {
//     order: 1,
//     label: 'Start Timeular',
//     isCheked: false,
//   },
//   {
//     order: 2,
//     label: 'Workout',
//     isCheked: false,
//   },
//   {
//     order: 3,
//     label: 'Shower',
//     isCheked: true,
//   },
// ];
// function Access(props) {
//   const [data, setData] = useState(initialData);

//   const renderItem = ({item, index, drag, isActive}) => (
//     <View style={styles.item}>
//       <TouchableOpacity onLongPress={drag}>
//         <Text>{item?.label}</Text>
//       </TouchableOpacity>
//       <CheckBox
//         value={item.isCheked}
//         onChange={() => {
//           handleCheck(item.label);
//         }}
//       />
//     </View>
//   );

//   const handleCheck = label => {
//     let updated = [...data];
//     updated = updated.map((task, index) => {
//       if (label === task.label) {
//         return {...task, isCheked: !task.isCheked};
//       }
//       return task;
//     });
//     setData(updated);
//   };
//   return (
//     <View style={styles.screen}>
//       <View style={{flex: 1}}>
//         <DraggableFlatList
//           data={data}
//           renderItem={renderItem}
//           keyExtractor={(item, index) => index.toString()}
//           onDragEnd={({data}) => setData(data)}
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     marginTop: 24,
//     flex: 1,
//     backgroundColor: '#212121',
//   },
//   item: {
//     backgroundColor: 'white',
//     marginTop: 10,
//     padding: 20,
//     marginHorizontal: 10,
//     borderRadius: 10,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

// export default Access;
