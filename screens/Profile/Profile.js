import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
//import Icon from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome5";
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
import { signOut } from "firebase/auth";
import auth from "../../config/firebase";

// Replace "FontAwesome5" with the icon library of your choice.
const SetupProfileScreen = ({ navigation }) => {
  const profilePic = require("../../assets/images/profile_image.jpg");
  const [image, setImage] = useState(profilePic);
  const [name, setName] = useState("John Doe");
  const [contactNumber, setContactNumber] = useState("*** *** ****");
  const [dateOfBirth, setDateOfBirth] = useState("27 jul, 199x");

  const [fullName, setFullName] = useState("");
  const [website, setWebsite] = useState("");
  const [bio, setBio] = useState("");

  //const {name, image} = route.params
  const handleSaveProfile = () => {
    // Here you can save the profile data to your backend or perform any necessary actions
    // For simplicity, we'll just log the data for now.
    console.log("Profile Data:");
    console.log("Image:", image);
    console.log("Full Name:", fullName);
    console.log("Contact Number:", contactNumber);
    console.log("Website:", website);
    console.log("Date of Birth:", dateOfBirth);
    console.log("Bio:", bio);
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user.displayName);
    const starCountRef = ref(db, "Users/" + user.uid + "/userInfo");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data:", data);
      setName(data?.name);
      setContactNumber(data?.phoneNumber);
      setDateOfBirth(data?.dateOfBirth);
      setImage({ uri: data?.image });
    });
  }, []);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Profile</Text>
        </View>
        <Text style={styles.smallerText}>View Your Profile </Text>
        <View>
          <View style={styles.imageContainer}>
            <Image
              style={{
                width: 150,
                height: 150,
                alignSelf: "center",
                borderRadius: 75,
              }}
              source={image}
            />
            <Text
              style={{
                color: "white",
                fontSize: 22,
                fontWeight: "bold",
                padding: 5,
              }}
            >
              {name}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                fontWeight: "bold",
                padding: 5,
              }}
            >
              {dateOfBirth ? dateOfBirth : "27 jul, 199x"}
            </Text>
          </View>
          <Text
            style={{
              color: "white",
              fontSize: 14,
              marginBottom: 10,
            }}
          >
            Phone Number: {contactNumber}
          </Text>
        </View>

        <View>
          <Text style={styles.profileHeader}>Account</Text>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Card Details</Text>
            <Text style={styles.subHeaders}>*** *** **66</Text>
          </View>
          <Text style={styles.profileHeader}>Help & Info</Text>
          <Text style={styles.subHeaders}>Terms & conditions</Text>
          <View style={styles.subHeadersContainer}>
            <Text style={styles.subHeaders}>Return Policy</Text>
            <Text style={styles.subHeaders}>Restaurants Booking</Text>
          </View>
        </View>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={[styles.modalButton, styles.signOutButton]}
            onPress={() => {
              handleSignOut();
            }}
          >
            <Text style={styles.modalButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        {/* Save Profile Button */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 50,
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

  profileHeader: {
    fontSize: 30,

    marginBottom: 10,
    color: "white",
    textAlign: "left",
  },
  smallerText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
    textAlign: "center",
  },
  imageContainer: {
    marginTop: 40,
    marginBottom: 20,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: 250,
  },
  subHeadersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subHeaders: {
    padding: 15,
    fontSize: 16,
    color: "gray",
  },
  smallerButtonText: {
    color: "#fff", // Set this to your desired button text color
    fontSize: 14,
  },
  iconContainer: {
    marginTop: 10,
    flexDirection: "row",
  },
  navigationMenu: {
    position: "absolute",
    backgroundColor: "black",
    bottom: 0,
    width: 350,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#CEB89E",
    paddingTop: 10,
  },
  menuItem: {
    alignItems: "center",
  },
  menuIcon: {
    marginBottom: 5,
  },
  menuText: {
    color: "white",
    fontSize: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  signOutButton: {
    width: 80,
    height: 40,
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default SetupProfileScreen;
