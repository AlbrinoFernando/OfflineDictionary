import { Header } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import React from "react";
import db from "./database";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import dictionary from "./database"

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      textTyped: "",
      isSearchPressed: false,
      word: "",
      lexicalCategory: '',
      examples: [],
      definition: ""
    };
  }

  getWord=(text)=>{
    if(dictionary[text] !== undefined){
      var word = dictionary[text.toLowerCase()]["word"]
      var lexicalCategory = dictionary[text.toLowerCase()]["lexicalCategory"]
      var definition = dictionary[text.toLowerCase()]["definition"]

      this.setState({
        word: word,
        lexicalCategory: lexicalCategory,
        definition: definition
      })
    }else{
      this.setState({
        word: "undefined",
        lexicalCategory: "undefined",
        definition: "undefined"
      })
    }
  }

  render() {
    return (
      <View>
        <Header
          backgroundColor="orange"
          centerComponent={{
            text: "Offline Dictionary",
            style: { fontSize: 25, color: "black" },
          }}
        />

        <Image
          style={{ width: 175, height: 150, alignSelf: "center", marginTop: 7.5}}
          source={require("./assets/dictionary.png")}
        />

        <TextInput
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({ 
              textTyped: text,
              isSearchPressed: this.state.isSearchPressed,
              word: this.state.word,
              lexicalCategory: this.state.lexicalCategory,
              examples: [],
              definition: this.state.definition
            });
          }}
          value={this.state.textTyped}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={
            ()=>{
              this.setState({
                isSearchPressed: true
              })
              this.getWord(this.state.textTyped);
            }
          }>
          <Text style={styles.buttonText}>Search!</Text>
        </TouchableOpacity>
        
        {this.state.isSearchPressed &&
          <Text style={styles.infoTitle}>
            Word: {" "}
            <Text style={styles.info}>
              {this.state.word}
            </Text>
            {"\n"}
            Type: {" "}
            <Text style={styles.info}>
              {this.state.lexicalCategory}
            </Text>
            {"\n"}
            Definition: {"\n"}
            <Text style={styles.info}>
              {this.state.definition}
            </Text>
          </Text>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#4a565c",
    borderWidth: 2,
    height: 50,
    width: "90%",
    alignSelf: "center",
    marginTop: "2.5%",
    textAlign: "center",
  },
  button: {
    alignSelf: "center",
    marginTop: "5%",
    backgroundColor: "#40bfff",
    justifyContent: "center",
    width: "50%",
    height: 50,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  infoTitle:{
    fontWeight: "bold",
    color: "#007de3",
    fontSize: 20,
    padding: 10
  },
  info:{
    fontWeight: "normal",
    color: "black"
  }
});
