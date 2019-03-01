import { Alert } from "react-native";

export function displayAlert(title: string, message: string) {
    Alert.alert(title, message, [{ text: "OK" }]);
}
