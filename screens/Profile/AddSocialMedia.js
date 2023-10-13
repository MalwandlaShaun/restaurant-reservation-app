import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
} from "react-native";

export default function App(props) {
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("facebook");

  const handleSignIn = () => {
    console.log("signed in!!!");
    props.closeModal();
  };
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.header}>Add Social Media</Text>

          <TextInput
            style={styles.input}
            placeholder="facebook"
            placeholderTextColor="white"
            value={facebook}
            onChangeText={setFacebook}
          />
          <TextInput
            style={styles.input}
            placeholder="LINK TO PROFILE"
            placeholderTextColor="white"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={props.closeModal}>
            <Text style={styles.buttonText}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  smallerText: {
    color: "white",
    marginRight: 135,
  },
  header: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  input: {
    width: "80%",
    height: 50,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 12,
    marginBottom: 20,
    color: "#fff",
    textDecorationColor: "white",
  },
  signInButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#CEB89E",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "transparent",
    width: "80%",
    height: 50,

    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
