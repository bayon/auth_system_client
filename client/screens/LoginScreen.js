import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  Alert
} from "react-native";
//npm install formik yup
import { Formik } from "formik";
import * as yup from "yup";
import FormStyles from "./FormStyles";
import { useDispatch } from "react-redux";
import * as authAction from "../redux/actions/authAction";
import AsyncStorage from '@react-native-async-storage/async-storage';

const formSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const styles = FormStyles;

const LoginScreen = (navData) => {
  const dispatch = useDispatch();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={formSchema}
          onSubmit={(values) => {
            console.log(values);
            dispatch(authAction.loginUser(values))
              .then(async result => {
               
                console.log(result)
                if(result.success){
                  try {
                    await AsyncStorage.setItem('token', result.token)
                    navData.navigation.navigate("Home");
                  } catch (error) {
                    console.log(error)
                  }


                 
                } else {
                  Alert.alert(result.message) 
                }
               
              })
              .catch((err) => console.log(err));
          }}
          
        >
          {(props) => (
            <View style={styles.container}>
              <View style={styles.logo}>
                <Image
                  source={require("../assets/icon.png")}
                  style={styles.image}
                />
              </View>
              <View>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Email"
                  placeholderTextColor="#fff"
                  keyboardType="email-address"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                  onBlur={props.handleBlur("email")}
                />
                <Text style={styles.error}>
                  {props.touched.email && props.errors.email}
                </Text>
                <TextInput
                  style={styles.inputBox}
                  placeholder="Password"
                  placeholderTextColor="#fff"
                  secureTextEntry={true}
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                  onBlur={props.handleBlur("password")}
                />
                <Text style={styles.error}>
                  {props.touched.password && props.errors.password}
                </Text>

                <TouchableOpacity
                  style={styles.button}
                  onPress={props.handleSubmit}
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.registerContainer}>
                  <Text style={styles.registerText}>
                    Don't Have an Account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navData.navigation.navigate("Register")}
                  >
                    <Text style={styles.registerButton}>Register</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
