import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  Text,
  ScrollView,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker"; // Import CalendarPicker

import Background from "../../components/Background";

export default function FirstPage({ route, navigation }) {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState(0);
  const [guests, setGuests] = useState(0);
  const [time, setTime] = useState("");
  const [tablePrice, setTablePrice] = useState("");

  const [selectedStartDate, setSelectedStartDate] = useState(null);

  const { restaurant } = route.params;

  const onDateChange = (date) => {
    setSelectedStartDate(date);
  };

  const formatDate = (date) => {
    if (!date) return "";
    console.log(date);
    return date.toString().split("00:00:00 GMT+0000")[0];
  };

  const navigateToReservationConfirmation = () => {
    const startDate = formatDate(selectedStartDate);

    const dataToSend = {
      name: username,
      restaurant: restaurant.restaurantName,
      restaurantAddress: restaurant.address,
      guests: guests,
      tablePrice: "R" + tablePrice,
      date: startDate,
      time: time,
    };

    navigation.navigate("ReservationConfirmation", {
      data: dataToSend,
      restaurant,
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <ScrollView>
        <Text style={{ fontStyle: "italic" }}> </Text>

        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder={" Name: "}
          style={styles.input}
          placeholderTextColor="black"
        />
        <TextInput
          value={phone}
          onChangeText={setPhone}
          placeholder={" Phone: "}
          placeholderTextColor="black"
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          value={guests}
          onChangeText={setGuests}
          placeholder={" Number of Guests: "}
          style={styles.input}
          placeholderTextColor="black"
          keyboardType="numeric"
        />

        <TextInput
          value={time}
          onChangeText={setTime}
          placeholder={" Time: "}
          style={styles.input}
          placeholderTextColor="black"
        />
        <TextInput
          value={tablePrice}
          onChangeText={setTablePrice}
          placeholder={" Table Price : "}
          style={styles.input}
          placeholderTextColor="black"
          keyboardType="numeric"
        />
      </ScrollView>

      <View>
        <CalendarPicker
          onDateChange={onDateChange}
          weekdays={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          months={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
        />

        <View style={styles.button}>
          <Button
            title="Reserve"
            color="#F6820D"
            onPress={navigateToReservationConfirmation}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: 5,
    marginBottom: 10,
    backgroundColor: "#D3D3D3",
    borderRadius: 20,
  },

  button: {
    borderRadius: 40,
    backgroundColor: "#F6820D",
  },
});
