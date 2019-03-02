import * as React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import PostCard from "./PostCard";
import CardSkeleton from "../CardSkeleton";
import { RouteName } from "../AppNavigator";

import { Paginator } from "../../paginator";
import { SocialAppAPIClient } from "../../apiClient";
import { displayAlert } from "../../utils/alert";
import { Post } from "../../models/Post";
import { User } from "../../models/User";
import { PostItem } from "../../models/PostItem";

import { Dispatch } from "../../store";
import { fetchUser } from "../../actions/userAction";

import * as Color from "../../styles/colors";

const CONTENT_BOTTOM_INSET = 10;

const styles = StyleSheet.create({
    skeletonsContainer: {
        flex: 1
    },
    flatList: {
        alignSelf: "stretch"
    },
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

type Props = ActionProps & NavigationScreenProps<any>;

type State = {
    posts: Post[];
    userIdentityMap: UserIdentityMap;
    isLoading: boolean;
};

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
            userIdentityMap: {},
            isLoading: true
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

    onPostCardPress = (index: number) => () => {
        const { posts, userIdentityMap } = this.state;
        const post = posts[index];
        const user = userIdentityMap[post.userId];
        this.props.navigation.navigate(RouteName.PostDetailsScreen, {
            postItem: { post, user }
        });
    };

    loadNextPage = async () => {
        if (postPaginator.isEnd) {
            return;
        }
        this.setState({ isLoading: true });
        try {
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
        } catch {
            displayAlert("Unkown Error", "Please try again later.");
        } finally {
            this.setState({ isLoading: false });
        }
    };

    renderPostCard = (data: { item: PostItem; index: number }) => {
        return (
            <TouchableOpacity onPress={this.onPostCardPress(data.index)}>
                <PostCard postItem={data.item} />
            </TouchableOpacity>
        );
    };

    getPostItem = (): PostItem[] => {
        const { posts, userIdentityMap } = this.state;
        return posts.map(p => ({ post: p, user: userIdentityMap[p.userId] }));
    };

    keyExtractor(_item: PostItem, index: number) {
        return index.toString();
    }

    renderPostSkeletons = () => {
        return (
            <View style={styles.skeletonsContainer}>
                {[1, 2, 3, 4, 5].map(i => (
                    <CardSkeleton
                        key={i}
                        skeletonLengths={[
                            150,
                            250,
                            250,
                            null,
                            null,
                            null,
                            null
                        ]}
                    />
                ))}
            </View>
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatList}
                    contentContainerStyle={styles.contentContainer}
                    data={this.getPostItem()}
                    renderItem={this.renderPostCard}
                    keyExtractor={this.keyExtractor}
                    onEndReachedThreshold={10}
                    onEndReached={this.loadNextPage}
                    ListFooterComponent={
                        this.state.isLoading
                            ? this.renderPostSkeletons
                            : undefined
                    }
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
