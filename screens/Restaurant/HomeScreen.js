import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5"; // Replace "FontAwesome5" with the icon library of your choice.

import auth from "../../config/firebase";
import { signOut } from "firebase/auth";
import { useIsFocused } from "@react-navigation/native";
import { addToCart } from "../../features/restaurantSlice";
import { useSelector, useDispatch } from "react-redux";
//import restaurantData from "../../data";
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
import ProfilePic from "../../components/ProfilePic.js";

const HomeScreen = ({ navigation }) => {
  const profilePic = require("../../assets/images/userImage.jpg"); // Replace with the actual path to the profile picture

  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [name, setName] = useState("John Doe");
  const [image, setImage] = useState(profilePic);
  //const [restaurantImage, setRestaurantImage] = useState(null);

  const [restaurantData, setRestaurantData] = useState(null);
  // const [loading, setLoading] = useState(true);

  const isFocused = useIsFocused();

  const toggleSignOutModal = () => {
    setShowSignOutModal(!showSignOutModal);
    if (showSignOutModal) {
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user.displayName);
    const starCountRef = ref(db, "Users/" + user.uid + "/userInfo");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data:", data);
      setName(data.name);
      setImage({ uri: data.image });
    });

    const startCountRef = ref(db, "Restaurants/");
    onValue(startCountRef, (snapshot) => {
      const usersData = snapshot.val();
      console.log("data:", usersData);
      const userInfoData = Object.values(usersData).map(
        (user) => user.restaurantInfo
      );
      console.log(userInfoData);
      setRestaurantData(userInfoData);
    });
  }, []);

  const restaurants = useSelector((state) => state.restaurants.restaurants);

  const handleRestaurantDetails = (restaurant, name, image) => {
    navigation.navigate("RestaurantDetails", { restaurant, name, imageUrl });
  };

  // User Profile Section
  console.log("restaurantData : ", restaurantData);
  // const UserSection = () => (
  //   <View style={styles.userSection}>

  //   </View>
  // );

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleRestaurantDetails(item, name)}
    >
      <Image style={styles.restaurantImage} source={{ uri: item.imageUrl }} />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{item.restaurantName}</Text>
        <Text style={styles.restaurantCuisine}>{item.cuisine}</Text>
        <Text style={styles.restaurantAddress}>{item.address}</Text>
        <Text style={styles.restaurantPriceRange}>{item.priceRange} ZAR</Text>
        <Text style={styles.restaurantRating}>Rating: {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ProfilePic data={{ name, image, navigation }} />

      <View style={styles.searchInputContainer}>
        <Icon
          name="search"
          size={20}
          color="#CEB89E"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#CEB89E"
        />
      </View>
      <View>
        <Text style={styles.header}>Restaurants</Text>
      </View>

      {restaurantData ? (
        <FlatList
          data={restaurantData}
          renderItem={renderProductItem}
          contentContainerStyle={styles.productList}
          numColumns={2} // Set the number of columns to 2 for side-by-side cards
        />
      ) : (
        <Text style={{ color: "white", textAlign: "center", paddingTop: 20 }}>
          {" "}
          No Restaurants Available{" "}
        </Text>
      )}
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
  productList: {
    paddingHorizontal: 5, // Add horizontal padding to separate the cards
  },
  card: {
    flex: 1, // Make the card take equal space in the row
    flexDirection: "column", // Align items side by side
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: "#1E1E1E",
    padding: 10,
    marginBottom: 10, // Add margin at the bottom to separate the rows
  },
  productImage: {
    width: 140,
    height: 100,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 10,
  },
  productName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    color: "#CEB89E",
    fontSize: 14,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: "#CEB89E",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
    textAlign: "left",
  },
  signInButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#CEB89E", // Set this to your desired button background color
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  // ... (rest of the styles)

  signOutButton: {
    width: 80,
    height: 40,
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },

  profileInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 140,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
    marginTop: 50,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalButton: {
    width: 100,
    height: 40,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartIcon: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  restaurantCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  restaurantImage: {
    width: 100,
    height: 100,
    marginRight: 16,
    borderRadius: 8,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  restaurantCuisine: {
    fontSize: 16,
    color: "white",
  },
  restaurantAddress: {
    fontSize: 14,
    color: "white",
  },
  restaurantPriceRange: {
    fontSize: 14,
    color: "white",
  },
  restaurantRating: {
    fontSize: 14,
    color: "white",
  },
  cartBadgeText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default HomeScreen;
