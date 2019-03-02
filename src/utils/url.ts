import { Linking } from "react-native";

export function openEmail(emailAddress: string) {
    Linking.openURL(`mailto:${emailAddress}`);
}

export function openURL(url: string, addProtocol: boolean = false) {
    let url_ = url;
    if (addProtocol) {
        url_ = `https://${url_}`;
    }
    Linking.canOpenURL(url).then(supported => {
        if (supported) {
            return Linking.openURL(url);
        }
        return Promise.resolve();
    });
}
