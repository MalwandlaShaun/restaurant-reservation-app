import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useIsFocused } from "@react-navigation/native";
import ProfilePic from "../../components/ProfilePic";

const RestaurantDetailsScreen = ({ route, navigation }) => {
  //const [name, setName] = useState("John Doe");

  const { restaurant, name, image } = route.params; // Get the restaurant details from the route params

  console.log(name);
  const profilePic = require("../../assets/images/userImage.jpg");

  const isFocused = useIsFocused();

  const handleReserve = () => {
    navigation.navigate("Reservation", { restaurant });
  };

  return (
    <ScrollView style={styles.container}>
      <ProfilePic data={{ name, image, navigation }} />
      <Image
        style={styles.restaurantImage}
        source={{ uri: restaurant.imageUrl }}
      />
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>{restaurant.name}</Text>
        <Text style={styles.restaurantCuisine}>{restaurant.cuisine}</Text>
        <Text style={styles.restaurantAddress}>{restaurant.address}</Text>
        <Text style={styles.restaurantPriceRange}>{restaurant.priceRange}</Text>
        <Text style={styles.restaurantRating}>Rating: {restaurant.rating}</Text>
        <Text style={styles.restaurantAddress}>{restaurant.description}</Text>
      </View>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleReserve()}
      >
        <Text style={styles.addToCartButtonText}>Reserve Table </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 50,
    padding: 20,
  },
  userSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
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
  restaurantImage: {
    width: "100%",
    height: 400,
    borderRadius: 8,
    marginBottom: 16,
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
  addToCartButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  addToCartButtonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
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
});

export default RestaurantDetailsScreen;
