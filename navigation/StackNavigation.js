import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Auth
import Register from "../screens/Auth/Register";
import Login from "../screens/Auth/Login";

//Tabs Navigation
import TabsNavigation from "./TabsNavigation";

//Drawer Navigation
import DrawerNavigation from "./DrawerNavigation";

//OnBoarding
import OnBoarding from "../screens/OnBoarding/OnBoarding";

//Restaurants
import HomeScreen from "../screens/Restaurant/HomeScreen";
import ReservationScreen from "../screens/Restaurant/ReservationScreen";
import ReservationConfirmationScreen from "../screens/Restaurant/ReservationConfirmationScreen";
import Payment from "../screens/Restaurant/Payment";
import RestaurantDetailsScreen from "../screens/Restaurant/RestaurantDetailsScreen";

//Profile
import Profile from "../screens/Profile/Profile";
import EditProfile from "../screens/Profile/EditProfile";

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Tabs" component={TabsNavigation} />
    </Stack.Navigator>
  );
};

const OnBoardingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
    </Stack.Navigator>
  );
};

const RestaurantStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="RestaurantDetails"
        component={RestaurantDetailsScreen}
      />
      <Stack.Screen name="Reservation" component={ReservationScreen} />
      <Stack.Screen
        name="ReservationConfirmation"
        component={ReservationConfirmationScreen}
      />
      <Stack.Screen name="Payment" component={Payment} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={DrawerNavigation} />
      {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />*/}
    </Stack.Navigator>
  );
};

export {
  MainStack,
 RestaurantStack,
 OnBoardingStack,
  ProfileStack,
};
