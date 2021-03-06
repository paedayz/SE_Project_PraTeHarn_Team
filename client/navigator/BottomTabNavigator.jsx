import React, {Fragment, useState, useEffect} from 'react'
import { Avatar, Badge, withBadge } from "react-native-elements";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native'
import dayjs from 'dayjs'
import relativeTime from "dayjs/plugin/relativeTime";

// Stack Screen
import CalendarStackScreen from '../screen/Calendar/CalendarStack'
import SocialStackScreen from '../screen/Social/SocialStack'
import StatsStackScreen from '../screen/Stats/StatsStack'
import QuestArchieveStackScreen from '../screen/Quest_Archieve/QuestArchieveStack'
import PetStackScreen from '../screen/Pet/PetStack'

// Component
import Notifications from '../component/Notifications'

// Redux
import {useSelector, useDispatch} from 'react-redux'
import {addNotifications} from '../redux/action/dataAction'

const Tab = createMaterialBottomTabNavigator();

export default function TabFunction () {
  const userEvents = useSelector(state => state.data.events)
  const unRead = useSelector(state => state.data.unreadNoti)
  const currentWillNoti = useSelector(state => state.data.will_noti)
  const currentNowNoti = useSelector(state => state.data.now_noti)
  const currentEndNoti = useSelector(state => state.data.end_noti)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  dayjs.extend(relativeTime);
  
  const checkSendNoti = () => {
    userEvents.map((event) => {
      const startDateTime = `${event.date} ${event.start}`
      const endDateTime = `${event.date} ${event.end}`

      const stringStartDateTime = dayjs(startDateTime).fromNow()
      const stringEndDateTime = dayjs(endDateTime).fromNow()

      const seperateStartDayjs = stringStartDateTime.split(" ")
      const seperateEndDayjs = stringEndDateTime.split(" ")

      if(seperateStartDayjs[0] === 'in' && seperateStartDayjs[2] === 'few' && seperateStartDayjs[3] === 'seconds') {
        if(!checkHaveNoti(event.key, currentNowNoti)) {
          let nowNotiAddData
          nowNotiAddData = {
            status : "now", 
            eventData: event
          }
          dispatch({type: 'ADD_NOW_NOTI', payload: event.key})
          dispatch(addNotifications('event', nowNotiAddData))
        }
      }

      if(seperateStartDayjs[0] === 'in' && seperateStartDayjs[2] === 'minutes') {
        const minute = stringStartDateTime.split(' ')[1]
        const intMinute = parseInt(minute, 10);
        let willNotiAddData ={}
        let haveWillNoti = checkHaveNoti(event.key, currentWillNoti)
        if (intMinute === 15 && haveWillNoti === false) {
          dispatch({type: 'ADD_WILL_NOTI', payload: event.key})
          willNotiAddData = {
            status : "will", 
            time : "15 minute", 
            eventData: event
          }
          dispatch(addNotifications('event', willNotiAddData))
        }
      }

      if(seperateEndDayjs[0] === 'in' && seperateEndDayjs[2] === 'minutes') {
        const minute = stringStartDateTime.split(' ')[1]
        const intMinute = parseInt(minute, 10);
        let endNotiAddData ={}
        let haveEndNoti = checkHaveNoti(event.key, currentEndNoti)
        if (intMinute === 15 && haveEndNoti === false) {
          endNotiAddData = {
            status : "end", 
            time : "15 minute", 
            eventData: event
          }
          dispatch({type: 'ADD_END_NOTI', payload: event.key})
          dispatch(addNotifications('event', endNotiAddData))
        }
      }
    })
  }

  const checkHaveNoti = (eventKey, currentNoti) => {
    let flag = 0
    currentNoti.map((notiKey) => {
      if(notiKey === eventKey) flag = 1
    })
    if (flag === 0) {
      return false
    } else {
      return true
    }
  }

  const renderNotification = (
    <Fragment>
      {unRead !== 0 ? (
        <View>
          <Icon.Button
            name="notifications"
            size={25}
            backgroundColor="#fff"
            color="black"
            onPress={() => {navigation.navigate('Notifications')}}
          />

          <Badge
            value={unRead}
            containerStyle={{ position: "absolute", right: 9 }}
          />
        </View>
      ) : (
        <Icon.Button
          name="ios-notifications-outline"
          size={25}
          backgroundColor="#fff"
          color="black"
          onPress={() => {navigation.navigate('Notifications')}}
        />
      )}
    </Fragment>
  );

    return (
      <Fragment>
        <Tab.Navigator
          initialRouteName="Calendar"
          activeColor="#fff"
        >
          <Tab.Screen
            name="Calendar"
            component={CalendarStackScreen}
            options={{
              tabBarLabel: 'Calendar',
              tabBarColor: '#4A9FFF',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="calendar" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Social"
            component={SocialStackScreen}
            options={{
              tabBarLabel: 'Social',
              tabBarColor: '#6170D7',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="earth" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Stats"
            component={StatsStackScreen}
            options={{
              tabBarLabel: 'Stats',
              tabBarColor: '#008891',
              tabBarIcon: ({ color }) => (
                <Octicons name="graph" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="QuestArchieve"
            component={QuestArchieveStackScreen}
            options={{
              tabBarLabel: 'Q/A',
              tabBarColor: '#20E1D4',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="medal-outline" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Pet"
            component={PetStackScreen}
            options={{
              tabBarLabel: 'Pet',
              tabBarColor: '#B9CE8D',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="dog" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
        <View style={{position:'absolute', right:15, top:30}}>
          {renderNotification}
        </View>
      </Fragment>
    )
    
}

// const DetailStackScreen = ({navigation}) => {
//   return (
//     <DetailStack.Navigator>
//       <DetailStack.Screen 
//         name="Detail" 
//         component={Detail} 
//         options={{
//           title:'Detail',
//           headerLeft: () => (
//             <Icon.Button 
//               name="menu" 
//               size={20} 
//               backgroundColor="#fff"
//               color="black"
//               onPress={() => navigation.openDrawer()}
//             />
//           )
//         }}
//       />
//     </DetailStack.Navigator>
//   )
// }