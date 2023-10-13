import React, { useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";

import firebase from "@firebase/app";

export default function ForthPage({ navigation }) {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const readUserData = () => {
      const nameRef = firebase.database().ref("user0001");
      nameRef.on("value", (snapshot) => {
        const state = snapshot.val();
        setReservations(state);
      });
    };
    readUserData();
  }, []);

  return (
    <Background>
      <ScrollView>
        <Text style={styles.TextStyle}>
          My Reservations: {JSON.stringify(reservations)}
        </Text>
        <Button
          color="orange"
          title="Go to Main Menu"
          style={styles.TextStyle}
          onPress={() => {
            navigation.navigate("MainPage");
            alert("Thank you for your visit");
          }}
        >
          Menu
        </Button>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  TextStyle: {
    flex: 1,
    alignItems: "center",
    alignContent: "center",
    fontSize: 23,
    textAlign: "center",
    color: "black",
    justifyContent: "center",
  },
});
