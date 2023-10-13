import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

const RestaurantCard = ({ restaurant, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View>
        <Image
          source={{ uri: restaurant.image }}
          style={{ width: 100, height: 100 }}
        />
        <Text>{restaurant.name}</Text>
        <Text>{restaurant.address}</Text>
        {/* Other restaurant details */}
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
