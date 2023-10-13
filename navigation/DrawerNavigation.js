// // App.js

// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import HomeScreen from "./screens/HomeScreen";
// import Sidebar from "./components/Sidebar";

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// const MainStack = () => (
//   <Stack.Navigator initialRouteName="Home">
//     <Stack.Screen name="Home" component={HomeScreen} />
//     {/* Add more screens here */}
//   </Stack.Navigator>
// );

// const App = () => (
//   <NavigationContainer>
//     <Drawer.Navigator
//       initialRouteName="Main"
//       drawerContent={(props) => <Sidebar {...props} />}
//     >
//       <Drawer.Screen name="Main" component={MainStack} />
//     </Drawer.Navigator>
//   </NavigationContainer>
// );

// export default App;

import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import { createStackNavigator } from "@react-navigation/stack";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import Account from "../screens/Dashboard/Account";
import AllBooking from "../screens/Dashboard/AllBooking";
import MyBooking from "../screens/Dashboard/MyBooking";
import Users from "../screens/Dashboard/Users";
import Profile from "../screens/Profile/Profile";
import EditProfile from "../screens/Profile/EditProfile";

import AddRestaurants from "../screens/Dashboard/AddRestaurants";

//import Profile from "../Component/Profile";
// import Help from "../Component/Help";
// import Profit from "../Component/Profit";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View } from "react-native";
const Drawer = createDrawerNavigator();
//const Stack = createStackNavigator();

const AllBookingIcon = ({ focused, color, size }) => (
  <Ionicons name="md-book" size={size} color={color} />
);
const ProfileIcon = ({ focused, color, size }) => (
  <Ionicons name="md-person" size={size} color={color} />
);
const MyBookingIcon = ({ focused, color, size }) => (
  <Ionicons name="md-pencil" size={size} color={color} />
);
const ProfitIcon = ({ focused, color, size }) => (
  <Ionicons name="md-people" size={size} color={color} />
);
const EditProfileIcon = ({ focused, color, size }) => (
  <Ionicons name="md-cog" size={size} color={color} />
);
const AddRestaurantsIcon = ({ focused, color, size }) => (
  <Ionicons name="md-pizza" size={size} color={color} />
);

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          backgroundColor: "white", //change bg color
          width: 230, //change width of sidebar
        },
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{ drawerIcon: ProfileIcon }}
      />
      <Drawer.Screen
        name="AllBooking"
        component={AllBooking}
        options={{ drawerIcon: AllBookingIcon }}
      />
      <Drawer.Screen
        name="MyBooking"
        component={MyBooking}
        options={{ drawerIcon: MyBookingIcon }}
      />
      <Drawer.Screen
        name="AddRestaurants"
        component={AddRestaurants}
        options={{ drawerIcon: AddRestaurantsIcon }}
      />
      <Drawer.Screen
        name="Users"
        component={Users}
        options={{ drawerIcon: ProfitIcon }}
      />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ drawerIcon: EditProfileIcon }}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;
