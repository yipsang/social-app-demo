import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import ImagePreviewSkeleton from "../ImagePreviewSkeleton";
import { Photo } from "../../models/Photo";

import * as Color from "../../styles/colors";

type Props = {
    photo: Photo;
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 10,
        borderRadius: 5,
        backgroundColor: Color.mineShaftSolid
    },
    photo: {
        flex: 1,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.doveGray,
        borderRadius: 5
    },
    photoTitleContainer: {
        flex: 1,
        marginTop: 10
    },
    photoTitle: {
        fontSize: 14,
        color: "white",
        textAlign: "justify"
    },
    titleSkeleton: {
        backgroundColor: Color.doveGray,
        height: 16
    }
});

export default class PhotoCard extends React.PureComponent<Props> {
    render() {
        const { photo } = this.props;

        return (
            <View style={styles.card}>
                <Image style={styles.photo} source={{ uri: photo.url }} />
                <View style={styles.photoTitleContainer}>
                    <Text style={styles.photoTitle}>{photo.title}</Text>
                </View>
            </View>
        );
    }
}

export class PhotoCardSkeleton extends React.PureComponent<{}> {
    render() {
        return (
            <View style={styles.card}>
                <ImagePreviewSkeleton />
                <View style={styles.photoTitleContainer}>
                    <View style={styles.titleSkeleton} />
                </View>
            </View>
        );
    }
}
