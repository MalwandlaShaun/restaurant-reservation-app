import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";

import { Paystack, paystackProps } from "react-native-paystack-webview";

const PaymentScreen = ({ route, navigation }) => {
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const paystackWebViewRef = useRef(paystackProps.PayStackRef);

  const { Total } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: 300,
              height: 220,
              alignSelf: "center",
              borderRadius: 50,
            }}
            source={require("../../assets/images/visa.png")}
          />
        </View>
        <Text style={styles.header}>Payment </Text>
        <Text style={styles.paragraph}>Card Details:</Text>
        {/* Card Holder Input */}

        <TextInput
          style={styles.input}
          placeholder="Card Holder"
          placeholderTextColor="white"
          value={cardHolder}
          onChangeText={setCardHolder}
        />

        {/* Card Number Input */}

        <TextInput
          style={styles.input}
          placeholder="Card Number"
          placeholderTextColor="white"
          value={cardNumber}
          onChangeText={setCardNumber}
          keyboardType="numeric"
        />

        {/* Expiry Input */}

        <TextInput
          style={styles.input}
          placeholder="Expiry (MM/YY)"
          placeholderTextColor="white"
          value={expiry}
          onChangeText={setExpiry}
          keyboardType="numeric"
        />

        {/* CVV Input */}

        <TextInput
          style={styles.input}
          placeholder="CVV"
          placeholderTextColor="white"
          value={cvv}
          onChangeText={setCvv}
          keyboardType="numeric"
        />

        {/* Continue Button */}
        <Paystack
          paystackKey="pk_test_5b433a97231f9edaa97c5ec4a9b7f3b0c63cf7fa"
          paystackSecretKey="sk_test_813aefed7e434868b591df5866c8efbaa673f1ca"
          billingEmail={`${cardHolder}@gmail.com`}
          amount={Total}
          billingName={cardHolder}
          billingMobile="0609439412"
          currency="ZAR"
          onCancel={(e) => {
            console.log(e);
          }}
          onSuccess={(res) => {
            console.log(res);
            navigation.popToTop();
          }}
          ref={paystackWebViewRef}
        />
        <TouchableOpacity
          onPress={() => paystackWebViewRef.current.startTransaction()}
          style={styles.paystack}
        >
          <Text style={styles.pay}>Pay Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.popToTop()}
        >
          <Text style={styles.smallerButtonText}>I'll do it later</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: 50,
    padding: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",

    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },

  input: {
    width: "100%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
    color: "#fff",
  },
  continueButton: {
    backgroundColor: "#CEB89E",
    height: 50,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CEB89E",
    borderRadius: 40,

    height: 280,
  },
  paragraph: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  button: {
    marginTop: 10,
    backgroundColor: "transparent", // Set this to your desired button color
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  smallerButtonText: {
    color: "white",
    fontSize: 16,
  },
  paystack: {
    minWidth: "60%",
    backgroundColor: "#F9A826",
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  pay: {
    color: "white",
  },
});

export default PaymentScreen;
