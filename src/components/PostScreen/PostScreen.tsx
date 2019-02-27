import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import * as Color from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.codGray,
        alignItems: "center",
        justifyContent: "center"
    }
});

type Props = {};

export default class PostScreen extends React.PureComponent<Props> {
    static navigationOptions = {
        title: "Post"
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: "white", fontSize: 20 }}>
                    Coming soon...
                </Text>
            </View>
        );
    }
}
