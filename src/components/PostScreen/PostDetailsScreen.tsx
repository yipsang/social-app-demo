import * as React from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { PostItem } from "../../models/PostItem";
import { Comment } from "../../models/Comment";

import { Dispatch } from "../../store";
import { fetchComments } from "../../actions/commentAction";
import { displayAlert } from "../../utils/alert";
import { RouteName } from "../AppNavigator";

import CommentCard from "./CommentCard";
import CardSkeleton from "../CardSkeleton";

import * as Color from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.codGray
    },
    contentContainer: {
        paddingBottom: 10
    },
    authorNameContainer: {
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 10,
        marginHorizontal: 10
    },
    authorNameBubble: {
        paddingVertical: 5,
        paddingHorizontal: 30,
        backgroundColor: Color.mineShaftSolid,
        borderRadius: 30,
        textAlign: "center"
    },
    authorName: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14
    },
    postContentContainer: {
        marginTop: 10,
        marginHorizontal: 10
    },
    postContentCell: {
        padding: 10,
        backgroundColor: Color.mineShaftSolid,
        borderRadius: 5,
        textAlign: "justify"
    },
    postContent: {
        color: "white",
        fontSize: 12
    },
    separator: {
        marginTop: 10,
        textAlign: "center",
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    }
});

interface RouteProps {
    postItem: PostItem;
}

type ActionProps = ReturnType<typeof mapDispatchToProps>;

type Props = NavigationScreenProps<RouteProps> & ActionProps;

interface State {
    comments: Comment[];
    isLoading: boolean;
}

class PostDetailsScreen extends React.PureComponent<Props, State> {
    static navigationOptions: any = ({ navigation }: NavigationScreenProps) => {
        return {
            title: (navigation.state.params as RouteProps).postItem.post.title
        };
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            comments: [],
            isLoading: true
        };
    }

    async componentDidMount() {
        const { fetchComments } = this.props.commentAction;
        const { post } = this.props.navigation.getParam("postItem");
        this.setState({ isLoading: true });
        try {
            const comments = (await fetchComments(post.id)) as any;
            this.setState({ comments });
        } catch {
            displayAlert("Unkown Error", "Please try again later.");
        } finally {
            this.setState({ isLoading: false });
        }
    }

    onAuthorNamePress = () => {
        const { user } = this.props.navigation.getParam("postItem");
        this.props.navigation.push(RouteName.UserDetailsScreen, { user });
    };

    renderAuthorContent = () => {
        const { post, user } = this.props.navigation.getParam("postItem");
        return (
            <View>
                <View style={styles.authorNameContainer}>
                    <TouchableOpacity onPress={this.onAuthorNamePress}>
                        <View style={styles.authorNameBubble}>
                            <Text style={styles.authorName}>
                                {user.username}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.postContentContainer}>
                    <View style={styles.postContentCell}>
                        <Text style={styles.postContent}>{post.body}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.separator}>· · ·</Text>
                </View>
            </View>
        );
    };

    renderCommentCard = (data: { item: Comment }) => {
        return <CommentCard comment={data.item} />;
    };

    renderCommentSkeleton = () => {
        return <CardSkeleton skeletonLengths={[150, 250, null, null]} />;
    };

    skeletonKeyExtractor(_item: number, index: number) {
        return index.toString();
    }

    keyExtractor(_item: Comment, index: number) {
        return index.toString();
    }

    render() {
        const { comments, isLoading } = this.state;
        if (isLoading) {
            return (
                <View style={styles.container}>
                    <FlatList
                        contentContainerStyle={styles.contentContainer}
                        data={[1, 2, 3, 4, 5]}
                        renderItem={this.renderCommentSkeleton}
                        keyExtractor={this.skeletonKeyExtractor}
                        ListHeaderComponent={this.renderAuthorContent}
                    />
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.contentContainer}
                    data={comments}
                    renderItem={this.renderCommentCard}
                    keyExtractor={this.keyExtractor}
                    ListHeaderComponent={this.renderAuthorContent}
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        commentAction: bindActionCreators({ fetchComments }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(PostDetailsScreen);
