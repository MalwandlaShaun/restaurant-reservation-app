import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import auth from "../../config/firebase";
import Icon from "react-native-vector-icons/FontAwesome5";
import { createUserWithEmailAndPassword } from "firebase/auth";
import * as ImagePicker from "expo-image-picker";
import {
  set,
  ref,
  update,
  onValue,
  remove,
  push,
  child,
} from "firebase/database";
import { db } from "../../config/firebase";
import { SelectList } from "react-native-dropdown-select-list";

const SetupProfileScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [selected, setSelected] = useState("");

  const data = [
    { key: "1", value: "True" },
    { key: "2", value: "False" },
  ];

  const writeUserData = (userInfo, userId) => {
    set(ref(db, "Users/" + userId), { userInfo })
      .then((result) => {
        // Success callback
        console.log("data ", result);
      })
      .catch((error) => {
        // Error callback
        alert(error);
        console.log("error ", error);
      });
  };

  const openImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      console.log(result);
      console.log(result.assets[0].uri);

      let newfile = {
        uri: result.assets[0].uri,
        type: `test/${result.assets[0].uri.split(".")[1]}`,
        name: `test.${result.assets[0].uri.split(".")[1]}`,
      };
      const source = { uri: result.assets[0].uri };
      setImage(source);
      handleUpload(newfile);
    } else {
      Alert.alert("you need to give up permission to work");
    }
  };

  const handleUpload = async (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ek6xqjmo");
    data.append("api_key", "827175248696299");

    await fetch("https://api.cloudinary.com/v1_1/drnqrrlfv/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data : ", data);
        // setPicture(data.url);
        setImageUrl(data.secure_url);
      })
      .catch((err) => {
        Alert.alert("error while uploading", err);
      });
  };
  const handleSignUp = async () => {
    // console.log("signed in!!!");
    if (selected == 1) {
      setIsAdmin(true);
    } else if (selected == 2) {
      setIsAdmin(false);
    }
    console.log("line executed!!!");
    console.log(auth);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = response.user;

      const userData = {
        userId: user.uid,
        name: fullName,
        phoneNumber: contactNumber,
        emailId: email,
        image: imageUrl,
        isAdmin: isAdmin,
      };
      writeUserData(userData, user.uid);

      console.log("Registered with:", user.email);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Register</Text>
          <Text style={styles.smallerText}>Upload Your Profile Pic</Text>
          <View style={styles.imageContainer}>
            {image ? (
              <Image
                source={image}
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  borderRadius: 75,
                }}
              />
            ) : (
              <Image
                style={{
                  width: 150,
                  height: 150,
                  alignSelf: "center",
                  borderRadius: 75,
                }}
                source={require("../../assets/images/profile_image.jpg")}
              />
            )}
            <TouchableOpacity onPress={openImagePicker}>
              <Icon
                name="camera"
                size={20}
                color="gray"
                style={{
                  padding: 10,
                  backgroundColor: "white",
                  borderRadius: 20,
                  position: "absolute",
                  bottom: -10,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
          </View>
          <SelectList
            data={data}
            setSelected={setSelected}
            boxStyles={{
              backgroundColor: "white",
              width: "52%",
              color: "white",
            }}
            dropdownStyles={{
              backgroundColor: "black",
              height: 100,
            }}
            search={false}
            maxHeight={100}
            placeholder="Admin User?"
            placeholderTextColor="white"
            dropdownTextStyles={{ color: "white" }}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="white"
            value={fullName}
            onChangeText={setFullName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            placeholderTextColor="white"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Contact Number"
            placeholderTextColor="white"
            value={contactNumber}
            onChangeText={setContactNumber}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder=" Password"
            placeholderTextColor="white"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {/* Save Profile Button */}
          <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.button}
          >
            <Text style={styles.smallerButtonText}>
              Already have an account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    color: "#fff",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  smallerText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },

  button: {
    marginTop: 15,
    backgroundColor: "transparent", // Set this to your desired button color
    padding: 12,
    borderRadius: 5,
    marginBottom: 30,
    borderRadius: 50,
    flexDirection: "row",
    marginLeft: 140,
  },
  smallerButtonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  iconContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Set this to your desired background color for the whole screen
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    color: "#fff",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  header: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "left",
  },
  smallerText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  imageContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 250,
  },

  smallerButtonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  iconContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
});

export default SetupProfileScreen;
