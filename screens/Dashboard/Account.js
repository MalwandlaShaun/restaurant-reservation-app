import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  Image,StyleSheet,
  TouchableOpacity,
} from "react-native";
import axios from "axios"; // You may need to use a different library for network requests

const Account = () => {
  const { phone, name, photo, email, id, address } = useAuth();
  const [userProfile, setuserProfile] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);






  const handleImageUpload = async (e) => {

  };

  return (
    <View>
      {/* Replace View with ScrollView or other suitable components for scrolling */}
      <View style={{ marginBottom: 18 }}>
        <Text>{userProfile?.profile?.name}</Text>
        <Text>{userProfile?.profile?.email || email}</Text>
        {userProfile?.profile?.phone && (
          <Text>Mobile: {userProfile?.profile?.phone && phone}</Text>
        )}
        <Image
          source={{ uri: imageUrl || photo }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            borderColor: "#2395ff",
            borderWidth: 2,
          }}
        />
      </View>
      <Text style={{ marginTop: 10, marginBottom: -5 }}>
        Profile Completeness: {percent}%
      </Text>
      {/* Replace Progress with a suitable custom progress bar component */}
      {/* Handle loading state differently */}
      {loading && <Text style={{ color: "red" }}>Uploading....</Text>}
      <TouchableOpacity onPress={handleImageUpload}>
        <Text style={{ color: "#EC1F46", cursor: "pointer" }}>
          Upload Picture
        </Text>
      </TouchableOpacity>

      <View>
        {/* Your Form and other UI components go here */}
        {/* Replace TextInput and other components with React Native equivalents */}
      </View>
    </View>
  );
};

export default Account;
