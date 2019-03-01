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
    },
    emailSkeleton: {
        width: 150,
        opacity: 0.2,
        backgroundColor: Color.nobel,
        height: 12
    },
    nameSkeleton: {
        width: 250,
        opacity: 0.2,
        marginTop: 10,
        backgroundColor: Color.nobel,
        height: 12
    },
    contentSkeleton: {
        opacity: 0.2,
        marginTop: 10,
        backgroundColor: Color.nobel,
        height: 12
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

export class CommentSkeleton extends React.PureComponent<{}> {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cell}>
                    <View style={styles.emailSkeleton} />
                    <View style={styles.nameSkeleton} />
                    <View style={styles.contentSkeleton} />
                    <View style={styles.contentSkeleton} />
                    <View style={styles.contentSkeleton} />
                </View>
            </View>
        );
    }
}
