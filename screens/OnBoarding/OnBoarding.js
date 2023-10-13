import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Emoji from "react-native-emoji";
//import { TouchableOpacity } from "react-native-gesture-handler";
import Background from "../../components/Background";

export default function MainPage({ navigation }) {
  const [fadeValue] = useState(new Animated.Value(2));

  useEffect(() => {
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 1000,
    }).start();
  };

  return (
    <Background>
      <Animated.View>
        <TouchableOpacity
          onPress={() => alert("For Restaurants Booking. contact : 0609439412")}
        >
          <Emoji name="phone" style={{ fontSize: 40, textAlign: "center" }} />
          <Text
            style={{ fontSize: 30, fontStyle: "italic", textAlign: "center" }}
          >
            Contact Us
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Emoji name="book" style={{ fontSize: 40, textAlign: "center" }} />
          <Text
            style={{ fontSize: 30, fontStyle: "italic", textAlign: "center" }}
          >
            My Reservations
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("HomeScreen")}>
          <Emoji name="pencil" style={{ fontSize: 60, textAlign: "center" }} />
          <Text
            style={{ fontSize: 40, fontStyle: "italic", textAlign: "center" }}
          >
            Reserve
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </Background>
  );
}

const styles = StyleSheet.create({
  // Add your styles here if needed
});
