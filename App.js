import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, AsyncStorage } from 'react-native';
import Todo from './Todo'
import uuidv1 from "uuid/v1"

const {width, height} = Dimensions.get("window");

export default class App extends React.Component {
  state = { 
    newMemo : "",
    memos: {},
    isLoaded: false
  };
  componentDidMount = () => {
    this._loadMemo();
  }
  render() {
    const {newMemo, memos} = this.state;
    console.log(memos);
    return (
      <View style={styles.container}>
        <Text style={styles.logo_text}>Simple Memo</Text>
        <View style={styles.memo_card}>
          { /* 새 메모 넣는 부분 */ }
          <TextInput
            style={styles.input_text}
            onChangeText={this._controlNewMemo} // 한 글자씩 입력될때마다 함수 발생
            placeholder={"새 메모"}
            value={newMemo}                     // setState 될때마다 newMemo의 값을 TextInput에 적용
            placeholderTextColor={"#76d4ff"}
            autoCorrect={false}
            returnKeyType={"done"}   
            onSubmitEditing={this._addMemo}
          >

          </TextInput>
          { /* 기존 메모를 보여주는 부분 */ } 
          <ScrollView>
            {Object.values(memos).reverse().map(memo => 
              <Todo
                key={memo.id}
                deleteMemo={this._deleteMemo}
                completeMemo={this._completeMemo}
                uncompleteMemo={this._uncompleteMemo}
                updateMemo={this._updateMemo}
                {...memo} />
            )}            
          </ScrollView>
        </View>
      </View>
    );
  }

  _loadMemo = async () => {
    try{
      const todos = await AsyncStorage.getItem("memos");
      const parsedMemo = JSON.parse(todos);
      this.setState({isLoaded: true, memos:parsedMemo});
    } catch(err){
      console.log(err);
    }
  }

  _saveMemo = (newMemo) => {
    const saveMemos = AsyncStorage.setItem("memos", JSON.stringify(newMemo));
  }

  _controlNewMemo = text => {
    this.setState({
      newMemo: text
    });
  };

  _addMemo = () => {
    console.log("메모를 추가하셨습니다.");
    const {newMemo, memos} = this.state;
    if(newMemo !== "") {
      this.setState(prevState => {
        const id = uuidv1();
        const newObject = {
          [id]: {
            id: id,
            isCompleted: false,
            text: newMemo,
            date: Date.now()
          }
        };
        const newState = {
          ...prevState,
          newMemo: "",
          memos: {
            ...prevState.memos,
            ...newObject
          }
        };
        this._saveMemo(memos);
        return {...newState};
      });
    }
  }

  _deleteMemo = (id) => {
    this.setState(prevState=> {
      const memos = prevState.memos;
      delete memos[id];
      const newState = {
        ...prevState,
        ...memos,
      }
      this._saveMemo(newState.memos);
      return {...newState};
    });
  }

  _completeMemo = (id) => {
    this.setState(prevState=> {
      const newState = {
        ...prevState,
        memos: {
          ...prevState.memos,
          [id]: {
            ...prevState.memos[id],
            isCompleted: true
          }
        }
      };
      this._saveMemo(newState.memos);
      return {...newState};
    })
  }

  _uncompleteMemo = (id) => {
    this.setState(prevState=> {
      const newState = {
        ...prevState,
        memos: {
          ...prevState.memos,
          [id]: {
            ...prevState.memos[id],
            isCompleted: false
          }
        }
      };
      this._saveMemo(newState.memos);
      return {...newState};
    });
  }

  _updateMemo = (id, text) => {
    this.setState(prevState=> {
      const newState = {
        ...prevState,
        memos: {
          ...prevState.memos,
          [id] : {
            ...prevState.memos[id],
            text: text
          }
        }
      };
      this._saveMemo(newState.memos);
      return {...newState};
    })
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
