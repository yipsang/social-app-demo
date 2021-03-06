import * as React from "react";
import { StyleSheet, Text, View } from "react-native";

import { PostItem } from "../../models/PostItem";

import * as Color from "../../styles/colors";

type Props = { postItem: PostItem };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    cell: {
        backgroundColor: Color.mineShaftSolid,
        borderRadius: 5,
        padding: 10,
        maxHeight: 200
    },
    user: {
        color: Color.nobel,
        fontSize: 14
    },
    title: {
        color: "white",
        fontWeight: "bold",
        fontSize: 18,
        marginTop: 4
    },
    content: {
        color: "white",
        marginTop: 4,
        fontSize: 12,
        textAlign: "justify"
    }
});

export default class PostCard extends React.PureComponent<Props> {
    render() {
        const { post, user } = this.props.postItem;
        return (
            <View style={styles.container}>
                <View style={styles.cell}>
                    <Text style={styles.user}>{user.username}</Text>
                    <Text numberOfLines={2} style={styles.title}>
                        {post.title}
                    </Text>
                    <Text style={styles.content}>{post.body}</Text>
                </View>
            </View>
        );
    }
}
