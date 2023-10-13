import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
//import restaurantData from "../../data";
import auth from "../../config/firebase";
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

const AllBooking = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user.displayName);
    const starCountRef = ref(db, "reservations/");
    onValue(starCountRef, (snapshot) => {
      const reservationData = snapshot.val();
      //console.log("data:", reservationData);
      const userInfoData = Object.values(reservationData).map(
        (user) => user.userInfo
      );
      console.log(userInfoData);
      setData(userInfoData);
    });
  }, []);

  console.log("data saved : ", data);
  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.restaurantInfo}>
        <Text style={styles.restaurantName}>Booked By : {item.name}</Text>
        <Text style={styles.restaurantCuisine}>
          Restaurant Name : {item.restaurant}
        </Text>
        <Text style={styles.restaurantAddress}>
          Restaurant Address : {item.restaurantAddress}
        </Text>
        <Text style={styles.restaurantPriceRange}>
          Table Price : {item.tablePrice}
        </Text>
        <Text style={styles.restaurantRating}>Date : {item.date}</Text>
        <Text style={styles.restaurantRating}>Time : {item.time}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.headContent}>
        <Text style={styles.headerText}>
          <Text style={styles.header}> All BOOKING</Text>
        </Text>
      </View>

      {data ? (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={renderProductItem}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <Text style={{ color: "white", textAlign: "center", paddingTop: 20 }}>
          {" "}
          No Booking Available{" "}
        </Text>
      )}
    </View>
  );
};
//)
//}

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

export default AllBooking;
