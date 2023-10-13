import React from "react";
import { StyleSheet, View, Text, Button } from "react-native";
import Background from "../../components/Background";
import {set, ref, update, onValue, remove,push, child} from "firebase/database"
import { db } from "../../config/firebase";
import auth from "../../config/firebase";

//const newKey = push(child(ref(db),'reservations')).key

export default function ReservationConfirmationScreen({ navigation, route }) {
  const { data, restaurant } = route.params;
  const userId = auth.currentUser.uid
  console.log(userId)
  const writeUserData = (userInfo) => {
    set(ref(db,"reservations/" + userId), {userInfo})
  
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

  const sendData = () => {
    writeUserData(data);
  
    navigation.navigate("Payment", { Total : restaurant.tablePrice });
    alert("Your Reservation Details Are Recorded");
  };

  return (
    <Background>
      <View>
        <Text style={styles.textHeader}>Your Reservation Details:</Text>
        <Text style={styles.TextStyle}>Name : {data.name}</Text>
        <Text style={styles.TextStyle}>Restaurant : {data.restaurant}</Text>
        <Text style={styles.TextStyle}>Restaurant address : {data.restaurantAddress}</Text>
        <Text style={styles.TextStyle}>Guests :{data.guests}</Text>
        <Text style={styles.TextStyle}>Table Price : {data.tablePrice}</Text>
        <Text style={styles.TextStyle}>Date : {data.date}</Text>
        <Text style={styles.TextStyle}>Time : {data.time}</Text>


        <Button color="orange" title="Send" onPress={sendData} />
        <Text> </Text>

        <Button
          title="Cancel"
          color="red"
          onPress={() => navigation.popToTop()}
        />
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  TextStyle: {
    padding: 10,
    fontSize: 20,
    color: "black",
  },
  textHeader: {
    fontSize: 30
  }
});
