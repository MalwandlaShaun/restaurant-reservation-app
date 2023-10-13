import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome5";

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

const AddRestaurant = ({ navigation }) => {
  const [restaurantName, setRestaurantName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [address, setAddress] = useState("");
  const [rating, setRating] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setpriceRange] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const writeRestaurantData = (restaurantInfo, restaurantName) => {
    set(ref(db, "Restaurants/" + restaurantName), { restaurantInfo })
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
        console.log("error : ", err);
        Alert.alert("error while uploading", err);
      });
  };
  const handleSubmit = () => {
    const restaurantData = {
      restaurantName,
      cuisine,
      address,
      rating,
      description,
      priceRange,
      imageUrl,
    };
    writeRestaurantData(restaurantData, restaurantName);

    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Add Restaurants</Text>
          <Text style={styles.smallerText}>Upload Your Restaurants Image</Text>
          <View style={styles.imageContainer}>
            {image ? (
              <Image
                source={image}
                style={{
                  width: 200,
                  height: 200,
                  alignSelf: "center",
                }}
              />
            ) : (
              <Image
                style={{
                  width: 350,
                  height: 200,
                  alignSelf: "center",
                }}
                source={require("../../assets/images/userImage.jpg")}
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

          <TextInput
            style={styles.input}
            placeholder="RestaurantName"
            placeholderTextColor="white"
            value={restaurantName}
            onChangeText={setRestaurantName}
          />

          <TextInput
            style={styles.input}
            placeholder="Address"
            placeholderTextColor="white"
            value={address}
            onChangeText={setAddress}
          />

          <TextInput
            style={styles.input}
            placeholder="Price Range"
            placeholderTextColor="white"
            value={priceRange}
            onChangeText={setpriceRange}
            keyboardType="numeric"
          />

          <TextInput
            style={styles.input}
            placeholder="Cuisine"
            placeholderTextColor="white"
            value={cuisine}
            onChangeText={setCuisine}
          />
          <TextInput
            style={styles.input}
            placeholder="Rating"
            placeholderTextColor="white"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
          />

          <TextInput
            style={{
              width: "100%",
              height: 100,
              fontSize: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
              marginBottom: 20,
              color: "#fff",
            }}
            placeholder="Description"
            placeholderTextColor="white"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 20,
  },
  subHeader: {
    fontSize: 18,
    color: "gray",
  },
  grayText: {
    color: "gray",
  },
  divider: {
    height: 1,
    backgroundColor: "gray",
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
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

export default AddRestaurant;
