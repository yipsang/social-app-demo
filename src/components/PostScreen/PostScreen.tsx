import * as React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import PostCard, { PostItem } from "./PostCard";

import { Paginator } from "../../paginator";
import { SocialAppAPIClient } from "../../apiClient";
import { Post } from "../../models/Post";
import { User } from "../../models/User";

import { Dispatch } from "../../store";
import { fetchUser } from "../../actions/userAction";

import * as Color from "../../styles/colors";

CONTENT_BOTTOM_INSET = 10;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.codGray,
        alignItems: "center",
        justifyContent: "center"
    },
    contentContainer: {
        paddingBottom: CONTENT_BOTTOM_INSET
    }
});

interface UserIdentityMap {
    [userId: number]: User;
}

type ActionProps = ReturnType<typeof mapDispatchToProps>;

type Props = ActionProps;

type State = { posts: Post[]; userIdentityMap: UserIdentityMap };

const apiClient = new SocialAppAPIClient();
const postPaginator = new Paginator(apiClient.fetchPosts, 10);

class PostScreen extends React.PureComponent<Props, State> {
    static navigationOptions = {
        title: "Post"
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            posts: [],
            userIdentityMap: {}
        };
    }

    transformToUserIdentityMap(users: User[]): UserIdentityMap {
        return users.reduce((identityMap: UserIdentityMap, user: User) => {
            return {
                ...identityMap,
                [user.id]: user
            };
        }, {});
    }

    async getUsers(userIds: number[]) {
        return Promise.all(userIds.map(this.props.userAction.fetchUser));
    }

    async componentDidMount() {
        this.loadNextPage();
    }

    loadNextPage = async () => {
        const posts = await postPaginator.next();
        const users: User[] = (await this.getUsers([
            ...new Set(posts.map(p => p.userId))
        ])) as any;
        this.setState(state => {
            const { posts: currentPosts, userIdentityMap } = state;
            return {
                posts: [...currentPosts, ...posts],
                userIdentityMap: {
                    ...userIdentityMap,
                    ...this.transformToUserIdentityMap(users)
                }
            };
        });
    };

    renderPostCard(item: { item: PostItem }) {
        return <PostCard item={item.item} />;
    }

    getPostItem = (): PostItem[] => {
        const { posts, userIdentityMap } = this.state;
        return posts.map(p => ({ post: p, user: userIdentityMap[p.userId] }));
    };

    keyExtractor(_item: PostItem, index: number) {
        return index.toString();
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.contentContainer}
                    data={this.getPostItem()}
                    renderItem={this.renderPostCard}
                    keyExtractor={this.keyExtractor}
                    onEndReachedThreshold={10}
                    onEndReached={this.loadNextPage}
                />
            </View>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        userAction: bindActionCreators({ fetchUser }, dispatch)
    };
}

export default connect(null, mapDispatchToProps)(PostScreen);
