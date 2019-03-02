import * as React from "react";
import { StyleSheet, View } from "react-native";

import * as Color from "../styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    skeleton: {
        flex: 1,
        opacity: 0.4,
        backgroundColor: Color.nobel,
        borderRadius: 5,
        aspectRatio: 1
    }
});

export default class ImagePreviewSkeleton extends React.PureComponent<{}> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.skeleton} />
            </View>
        );
    }
}
