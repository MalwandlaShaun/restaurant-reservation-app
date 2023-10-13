import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const MenuItem = ({ item, addToCart }) => {
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.price}</Text>
      <TouchableOpacity onPress={() => addToCart(item)}>
        <Text>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuItem;
