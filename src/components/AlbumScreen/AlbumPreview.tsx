import * as React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import { AlbumItem } from "../../models/AlbumItem";

import * as Color from "../../styles/colors";

type Props = { albumItem: AlbumItem };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    imageContainer: {
        backgroundColor: Color.nobel,
        borderRadius: 5,
        flex: 1
    },
    thumbnail: {
        backgroundColor: Color.nobel,
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    titleWrapper: {
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        top: 0,
        left: 0
    },
    titleContainer: {
        flex: 0.9,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    title: {
        textAlign: "center",
        opacity: 1,
        fontSize: 12,
        color: "white"
    },
    userNameContainer: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        position: "absolute",
        bottom: 0,
        right: 0,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderTopLeftRadius: 5,
        borderBottomRightRadius: 5
    },
    userName: {
        opacity: 1,
        fontSize: 12,
        color: "white"
    }
});

export default class AlbumPreview extends React.PureComponent<Props> {
    render() {
        const { user, album } = this.props.albumItem;
        return (
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.thumbnail}
                        source={{ uri: album.preview.thumbnailUrl }}
                    />
                    <View style={styles.titleWrapper}>
                        <View style={styles.titleContainer}>
                            <Text numberOfLines={1} style={styles.title}>
                                {album.title}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.userNameContainer}>
                        <Text numberOfLines={1} style={styles.userName}>
                            {user.username}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}
