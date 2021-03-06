import React, {useState} from "react";
import {
  SafeAreaView,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from "react-native";

import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

// Component
import FriendList from './FriendLists'
import FriendRequest from './FriendRequest'

// Redux
import {addFriend} from '../../redux/action/friendAction'

export default function FriendScreen({ navigation }) {
    const [isList, setIsList] = useState(true)
    const [username, setUsername] = useState()

    const showPage = () => {
        if(isList) {
            return <FriendList/>
        } else {
            return <FriendRequest setIsList={setIsList}/>
        }
    }

    const onClickAdd = () => {
        addFriend(username)
        setUsername(null)
    }

  return (
    <SafeAreaView style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
            <View>
            <TextInput
                onChangeText={username => setUsername(username)}
                placeholder="username"
                placeholderTextColor="#666666"
                autoCorrect={false}
                style={styles.textInput}
                value={username}
                clearButtonMode="always"
            />
            </View>
            <View style={{marginTop:17, marginLeft:30,borderRadius: 10}}>
            <Button onPress={() => onClickAdd()} title="ADD" color="#738FD9" buttonStyle = {{borderRadius: 10}}/>
            </View>
            
        </View>
      <View style={styles.headerBoxWrapper}>
      {isList 
        ?
        <TouchableOpacity
            onPress={() => setIsList(true)}
            style={[
                styles.headerBox,
                {
                borderRightColor: "#dddddd",
                borderRightWidth: 1,
                backgroundColor: '#738FD9'
                },
            ]}
        >
          <Title style={{color: 'white'}}>List</Title>
        </TouchableOpacity>
        :
        <TouchableOpacity
            onPress={() => setIsList(true)}
            style={[
                styles.headerBox,
                {
                borderRightColor: "#dddddd",
                borderRightWidth: 1,
                },
            ]}
        >
          <Title>List</Title>
        </TouchableOpacity>
      }
        {!isList 
          ?
        <TouchableOpacity 
          onPress={() => setIsList(false)} 
          style={[
            styles.headerBox,
            {
            backgroundColor: '#738FD9'
            },
          ]}
        >
          <View>
            <Title style={{color: 'white'}}>Request</Title>
          </View>
        </TouchableOpacity>
          :
        <TouchableOpacity onPress={() => setIsList(false)} style={styles.headerBox}>
          <View>
            <Title>Request</Title>
          </View>
        </TouchableOpacity>
        }
      </View>

      <View>
          {showPage()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderColor: "#dddddd",
    borderWidth: 1,
    flexDirection: "row",
    height: 50,
  },
  headerBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    marginTop: Platform.OS === 'ios' ? 0 : -2,
    paddingLeft: 10,
    color: 'black',
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    maxWidth: 200,
    minWidth: 200
  },
});