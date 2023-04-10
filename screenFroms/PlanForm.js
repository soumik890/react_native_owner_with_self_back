import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import apiAxios1 from '../ApiCaller/apiAxios1';
import {exportvalues} from '../contextApi/ContextTab';

const PlanForm = () => {
  const [planlist, setPlanlist] = useState([]);
  const {plan, setPlan} = useContext(exportvalues);

  useEffect(() => {
    apiAxios1('plan', {
      action: 'read',
    }).then(res => {
      // console.log('plan read data', res.data);
      setPlanlist(res.data);
    });
  }, []);

  return (
    <View style={{flexDirection: 'row', alignSelf: 'center'}}>
      {planlist.map(item => {
        return (
          <TouchableOpacity
            onPress={() => {
              setPlan(item);
            }}
            style={{
              width: 85,
              height: 100,
              // backgroundColor: 'red',
              borderColor: plan.plan_id == item.plan_id ? 'orange' : 'grey',
              borderWidth: 2,
              borderRadius: 5,
              margin: 5,
            }}>
            <View
              style={{
                height: '20%',
                backgroundColor:
                  plan.plan_id == item.plan_id ? 'orange' : 'grey',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 15,
                  alignSelf: 'center',
                }}>
                {item.plan}
              </Text>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Text style={{color: 'black'}}>Price: {item.price}</Text>
              <Text style={{color: 'black'}}>Info: {item.info}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default PlanForm;
