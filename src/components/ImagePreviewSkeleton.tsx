import * as React from "react";
import { StyleSheet, View } from "react-native";

import * as Color from "../styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    skeleton: {
        flex: 1,
        backgroundColor: Color.doveGray,
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
