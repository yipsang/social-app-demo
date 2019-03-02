import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

import { Comment } from "../../models/Comment";

import * as Color from "../../styles/colors";

type Props = { comment: Comment };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10
    },
    cell: {
        backgroundColor: Color.mineShaftSolid,
        borderRadius: 5,
        padding: 10
    },
    email: {
        color: Color.nobel,
        fontSize: 14
    },
    name: {
        color: "white",
        marginTop: 4,
        fontSize: 14,
        fontWeight: "bold"
    },
    content: {
        color: "white",
        marginTop: 4,
        fontSize: 12,
        textAlign: "justify"
    }
});

export default class CommentCard extends React.PureComponent<Props> {
    render() {
        const { comment } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.cell}>
                    <Text style={styles.email}>{comment.email}</Text>
                    <Text style={styles.name}>{comment.name}</Text>
                    <Text style={styles.content}>{comment.body}</Text>
                </View>
            </View>
        );
    }
}
