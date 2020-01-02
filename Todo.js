import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";

const {width, height} = Dimensions.get("screen");

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isEditing: false, editedText: props.text };
  }

  static propTypes = {
    text: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired,
    id : PropTypes.string.isRequired,
    deleteMemo: PropTypes.func.isRequired,
    completeMemo: PropTypes.func.isRequired,
    uncompleteMemo: PropTypes.func.isRequired,
    updateMemo: PropTypes.func.isRequired
  }
  
  render() {
    const {isEditing, editedText} = this.state;
    const {isCompleted, text, id, deleteMemo} = this.props;

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={this._toggleComplete}>
              <View style={[
                styles.circle,
                isCompleted ? styles.completed_circle : {}]}>
              </View>
            </TouchableOpacity>
            {isEditing ? 
              <TextInput
                style={styles.memo_text}
                value={editedText}
                onChangeText={this._controllInput}
                returnKeyType={"done"}
              >     
              </TextInput>
              : <Text 
                style={[
                  styles.memo_text,
                  isCompleted ? styles.completed_text : {}]}
              > {text} </Text>
            }
            {isEditing ?
              <TouchableOpacity onPress={this._finishEditing}>
                <Text style={styles.completed_btn}>{"수정완료"}</Text>
              </TouchableOpacity> :
              <View style={styles.btn_container}>
                <TouchableOpacity onPress={this._startEditing}>
                  <Text style={styles.edit_btn}>✒</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteMemo(id)}>
                  <Text style={styles.delete_btn}>🗑</Text>
                </TouchableOpacity>
              </View>
            }
        </View>
    
    );
  }

  _controllInput = (text) => {
    this.setState({
      editedText: text
    })
  }

  _toggleComplete = () => {
    const {id, isCompleted, completeMemo, uncompleteMemo} = this.props;
    isCompleted ? uncompleteMemo(id) : completeMemo(id);
  }

  _startEditing = () => {
    this.setState({isEditing: true});
  }

  _finishEditing = () => {
    const {editedText} = this.state;
    const {id, updateMemo} = this.props;

    updateMemo(id, editedText);
    this.setState({
      isEditing: false
    });
  }
}

const styles = StyleSheet.create({
    // 0. main container
    container: {
      marginHorizontal: 10,
      marginVertical: 10,
      flexDirection: "row"
    },

    // 1. circle
    circle : {
      width: 30,
      height: 30,
      borderRadius: 15,
      borderWidth: 5,
      borderColor: "#00a2ec"
    },
    completed_circle: {
      borderColor: "#5b8091"
    },

    // 2. text
    memo_text: {
      fontSize: 18,
      marginLeft: 15,
      width: width - 190,
    },
    completed_text: {
      color: "#5b8091",
      textDecorationLine: "line-through"
    },

    // 3. btn / btn_container
    completed_btn: {
      backgroundColor: "#00a2ec",
      color: "white",
      fontSize: 17,
      borderRadius: 5,
      paddingHorizontal: 7,
      paddingVertical: 3
    },
    btn_container: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between"
    },
    edit_btn: {
      backgroundColor: "#6c9ef0",
      fontSize: 22,
      borderRadius: 5,
      paddingHorizontal: 3,
      marginRight: 8
    },
    delete_btn: {      
      backgroundColor: "#bbbbbb",
      fontSize: 22,
      borderRadius: 5,
      paddingHorizontal: 3
    }
});
