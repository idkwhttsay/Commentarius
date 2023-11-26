import { TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { Months, nth, WeekDays } from '../../../constants/constants';

export default function _layout() {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    currentDate.setDate(currentDate.getDate());
    var x = currentDate.getDay();
    let beginDate = new Date();
    beginDate.setDate(beginDate.getDate() + 7);
    beginDate.setDate(beginDate.getDate() - x);
    x = 6 - x;
    let endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    endDate.setDate(endDate.getDate() + x);

    const router = useRouter();

    const {id} = useLocalSearchParams();
    const id_num = Number(id);

    const idDate = new Date();
    idDate.setDate(beginDate.getDate() + id_num);
    const idDay = idDate.getDate();
    const idMonth = idDate.getMonth();

    return (
        <Stack screenOptions={{
          headerStyle: {
            backgroundColor: '#2A9DF4',
          },
          headerTintColor: '#FFFFFF',
        }}>
            <Stack.Screen
                name="NextWeek"
                options={{
                    title: `${beginDate.getDate()}${nth(beginDate.getDate())} of ${
                        Months[beginDate.getMonth()]
                    } - ${endDate.getDate()}${nth(endDate.getDate())} of ${Months[endDate.getMonth()]}`,
                    headerTitleStyle: {
                      fontFamily: 'Jost-Regular'
                    }
                }}
            />

            <Stack.Screen name='[id]' options={{
                title: `${WeekDays[id_num]}, ${idDay}${nth(idDay)} of ${Months[idMonth]}`,
                headerTitleStyle: {
                  fontFamily: 'Jost-Regular'
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => {router.back()}}>
                   <Image source={require('../../../assets/images/chevron.backward.png')}/> 
                  </TouchableOpacity>
                ),
            }}/>
        </Stack>
    );
}
