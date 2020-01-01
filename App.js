import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView } from 'react-native';
import Todo from './Todo'

const {width, height} = Dimensions.get("window");

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo_text}>Simple Memo</Text>
        <View style={styles.memo_card}>
          { /* 새 메모 넣는 부분 */ }
          <TextInput
            style={styles.input_text}
            placeholder={"새 메모"}
            placeholderTextColor={"#76d4ff"}
            autoCorrect={false}
          >

          </TextInput>
          { /* 기존 메모를 보여주는 부분 */ } 
          <ScrollView>
            <Todo></Todo>
            <Todo></Todo>
            <Todo></Todo>
            <Todo></Todo>
            <Todo></Todo>            
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00a8f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo_text: {
    color: 'white',
    fontSize: 40,
    marginTop : 75,
    marginBottom : 50
  },
  memo_card: {
    backgroundColor: 'white',
    flex: 1,
    width: width-50,
    borderRadius: 15,
    ...Platform.select({
      android: {
        elevation: 10
      },
      ios: {
        shadowColor:"rgb(50, 50, 50)",
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowOffset: {
          height:-1,
          width: 0
        }
      }
    })
  },
  input_text: {
    padding: 15,
    fontSize: 20,
    borderBottomColor: "#00a8f3",
    borderBottomWidth: 3
  }
});
