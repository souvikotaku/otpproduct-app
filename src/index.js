import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { firebaseConfig } from "../config";
import firebase from "firebase/compat/app";
import { phNumber } from "../redux/dataSlice";

import PhoneInput from "react-native-phone-number-input";

const Otp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [formattedValue, setFormattedValue] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [otpsent, setOtpsent] = useState(false);
  const recaptchaVerifier = useRef(null);
  const phoneInput = useRef(null);
  const [value, setValue] = useState("");
  const getphNumber = useSelector((state) => state.data.phnumber);
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const fifthInput = useRef();
  const sixthInput = useRef();
  const [otp, setOtp] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "", 6: "" });

  const sendVerification = () => {
    // console.log("recaptchaVerifier.current", recaptchaVerifier.current);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(setVerificationId);
    setPhoneNumber("");
    setOtpsent(true);
    dispatch(phNumber(phoneNumber));
  };

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );
    firebase
      .auth()
      .signInWithCredential(credential)
      .then(() => {
        setCode("");
        Alert.alert(
          "Confirmation",
          "Login successful. Your details have been submitted. Welcome to Dashboard.",
          [
            {
              text: "OK",
              onPress: () => {
                // Navigate to the new screen here
                navigation.navigate("Dashboard");
                setOtpsent(false);
              },
            },
          ]
          // { cancelable: false }
        );
      })
      .catch((err) => {
        alert(err);
      });
    // Alert.alert("Login successful. Welcome to Dashboard.");
  };

  // const onVerify = (response) => {
  //   setOtpsent(true);
  //   console.log("Verification Status:", response);
  //   // Add your logic based on the verification status
  // };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        // onVerify={onVerify}
      />

      {otpsent === false ? (
        <Text style={styles.buttonText}>Log in</Text>
      ) : (
        <Text style={styles.buttonText}>OTP Verify</Text>
      )}
      <Image
        source={require("./assets/graph.png")}
        style={{
          width: 240,
          height: 240,
          marginTop: "10%",
          // marginBottom: "30%",
        }}
      />
      {otpsent === false ? (
        <View
          style={{
            marginTop: "30%",
          }}
        >
          <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="IN"
            layout="first"
            containerStyle={{
              borderRadius: 70,
              borderTopRightRadius: 70,
              borderBottomRightRadius: 70,
              borderColor: "lightgrey",
              borderWidth: 1,
              marginLeft: 4,
            }}
            textContainerStyle={{
              borderTopRightRadius: 70,
              borderBottomRightRadius: 70,
            }}
            flagButtonStyle={{
              backgroundColor: "transparent",
            }}
            onChangeText={setPhoneNumber}
            onChangeFormattedText={(text) => {
              setFormattedValue(text);
              setPhoneNumber(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
          />
          <TouchableOpacity
            style={
              phoneNumber != ""
                ? styles.sendVerification
                : styles.sendVerification2
            }
            onPress={sendVerification}
          >
            <Text style={styles.buttonText2}>Get OTP</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            marginTop: "10%",
          }}
        >
          <View>
            <Text style={styles.buttonText4}>OTP is sent to</Text>
            <Text style={styles.buttonText5}>{getphNumber}</Text>
          </View>
          {/* <TextInput
              placeholder="Confirm Code"
              onChangeText={setCode}
              keyboard
              Type="number-pad"
              style={styles.textInput}
            /> */}

          <View style={styles.otpContainer}>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText2}
                keyboardType="number-pad"
                maxLength={1}
                ref={firstInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 1: text });
                  text && secondInput.current.focus();
                  const newObj = { ...otp, 1: text };
                  // console.log("resultString obj", newObj);

                  const resultString = Object.values(newObj).join("");

                  // console.log("resultString", resultString);
                  setCode(resultString);
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText2}
                keyboardType="number-pad"
                maxLength={1}
                ref={secondInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 2: text });
                  text
                    ? thirdInput.current.focus()
                    : firstInput.current.focus();
                  const newObj = { ...otp, 2: text };
                  // console.log("resultString obj", newObj);

                  const resultString = Object.values(newObj).join("");

                  // console.log("resultString", resultString);
                  setCode(resultString);
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText2}
                keyboardType="number-pad"
                maxLength={1}
                ref={thirdInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 3: text });
                  text
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                  const newObj = { ...otp, 3: text };
                  // console.log("resultString obj", newObj);

                  const resultString = Object.values(newObj).join("");

                  // console.log("resultString", resultString);
                  setCode(resultString);
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText2}
                keyboardType="number-pad"
                maxLength={1}
                ref={fourthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 4: text });
                  text
                    ? fifthInput.current.focus()
                    : thirdInput.current.focus();
                  const newObj = { ...otp, 4: text };
                  // console.log("resultString obj", newObj);

                  const resultString = Object.values(newObj).join("");

                  // console.log("resultString", resultString);
                  setCode(resultString);
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText2}
                keyboardType="number-pad"
                maxLength={1}
                ref={fifthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 5: text });
                  text
                    ? sixthInput.current.focus()
                    : fourthInput.current.focus();
                  const newObj = { ...otp, 5: text };
                  // console.log("resultString obj", newObj);

                  const resultString = Object.values(newObj).join("");

                  // console.log("resultString", resultString);
                  setCode(resultString);
                }}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText2}
                keyboardType="number-pad"
                maxLength={1}
                ref={sixthInput}
                onChangeText={(text) => {
                  setOtp({ ...otp, 6: text });
                  !text && fifthInput.current.focus();
                  const newObj = { ...otp, 6: text };
                  // console.log("resultString obj", newObj);

                  const resultString = Object.values(newObj).join("");

                  // console.log("resultString", resultString);
                  setCode(resultString);
                }}
              />
            </View>
          </View>

          <TouchableOpacity
            style={
              code != "" && code.length === 6
                ? styles.sendVerificationnew
                : styles.sendVerificationnew2
            }
            onPress={confirmCode}
            // onPress={() => {
            //   Alert.alert(
            //     "Confirmation",
            //     "Login successful. Welcome to Dashboard.",
            //     [
            //       {
            //         text: "OK",
            //         onPress: () => {
            //           // Navigate to the new screen here
            //           navigation.navigate("Dashboard");
            //           setOtpsent(false);
            //         },
            //       },
            //     ]
            //     // { cancelable: false }
            //   );
            // }}
          >
            <Text style={styles.buttonText2}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={{
          paddingTop: 20,
        }}
      >
        <Text style={styles.buttonText3}>
          By signing up, you agree with our Terms and conditions
        </Text>
      </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "pink",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontSize: 24,
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    marginBottom: 20,
    textAlign: "center",
    color: "black",
  },

  sendVerification: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#e44533",
    borderRadius: 70,
  },
  sendVerification2: {
    marginTop: 30,

    padding: 15,
    backgroundColor: "#e44533",
    borderRadius: 70,
    opacity: 0.5,
    pointerEvents: "none",
  },
  sendVerificationnew: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#e44533",
    borderRadius: 70,
    marginLeft: 30,
    marginRight: 30,
  },
  sendVerificationnew2: {
    marginTop: 30,

    padding: 15,
    backgroundColor: "#e44533",
    borderRadius: 70,
    opacity: 0.5,
    pointerEvents: "none",
    marginLeft: 30,
    marginRight: 30,
  },
  sendCode: {
    padding: 20,
    backgroundColor: "#9b59b6",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonText2: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonText3: {
    textAlign: "center",
    color: "lightgrey",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonText4: {
    textAlign: "center",
    color: "grey",
    fontSize: 15,
    fontWeight: "bold",
  },
  buttonText5: {
    textAlign: "center",
    color: "black",
    fontSize: 15,
    fontWeight: "bold",
  },
  otpText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    margin: 20,
  },

  otpContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  otpBox: {
    borderRadius: 15,
    borderColor: "lightgrey",
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  otpText2: {
    fontSize: 25,
    color: "black",
    padding: 0,
    textAlign: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
});
