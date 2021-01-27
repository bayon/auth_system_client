import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Button } from "react-native";
//we want to fetch the token when the page loads
import AsyncStorage from "@react-native-async-storage/async-storage";
import FormStyles from "./FormStyles";

const jwtDecode = require("jwt-decode");
const styles = FormStyles;
const HomeScreen = (props) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const loadProfile = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    //guard page against non-token requests.
    if (!token) {
      props.navigation.navigate("Login");
    }
    //decode token: yarn add jwt-decode
    const decoded = jwtDecode(token);
    console.log(decoded);
    //make use of decoded data. useState
    setFullName(decoded.fullName);
    //FAIL: [Unhandled promise rejection: TypeError: undefined is not an object (evaluating 'decoded.fullName')]
    setEmail(decoded.email);
  };
  const logout = props => {
        AsyncStorage.removeItem('token') 
        .then( () => {
            props.navigation.replace('Login')
        } )
        .catch(err => console.log(err))
  }
  useEffect(() => {
    loadProfile();
  });
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          Home Screen: Welcome {fullName ? fullName : ""}
        </Text>
      </View>
      <View>
        <Text style={styles.text}>Your email is {email ? email : ""}</Text>
      </View>
      <View>
          <Button 
            title="logout"
            onPress={ () => logout(props)}
          />
      </View>
    </View>
  );
};

 
export default HomeScreen;
