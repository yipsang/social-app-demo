import * as React from "react";
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity
} from "react-native";
import { NavigationScreenProps } from "react-navigation";

import { User } from "../models/User";
import { Post } from "../models/Post";
import { PostItem } from "../models/PostItem";
import { SocialAppAPIClient } from "../apiClient";
import { displayAlert } from "../utils/alert";

import { RouteName } from "./AppNavigator";
import PostCard from "./PostScreen/PostCard";
import CardSkeleton from "./CardSkeleton";

import * as Color from "../styles/colors";

const styles = StyleSheet.create({
    skeletonsContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: Color.codGray
    },
    contentContainer: {
        paddingBottom: 15
    },
    flatList: {
        alignSelf: "stretch"
    },
    userInfoContainer: {
        backgroundColor: Color.mineShaftSolid,
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingBottom: 10,
        marginTop: 10,
        marginHorizontal: 10
    },
    row: {
        marginTop: 10,
        alignSelf: "stretch",
        flexDirection: "row"
    },
    cell: {
        flex: 1,
        alignSelf: "stretch"
    },
    userInfoTitle: {
        fontSize: 14,
        color: "white"
    },
    userInfo: {
        fontSize: 14,
        color: "white",
        textAlign: "right"
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
    user: User;
}

type Props = NavigationScreenProps<RouteProps>;

interface State {
    isLoading: boolean;
    posts: Post[];
}

const apiClient = new SocialAppAPIClient();

export default class UserDetailScreen extends React.PureComponent<
    Props,
    State
> {
    static navigationOptions: any = ({ navigation }: NavigationScreenProps) => {
        const user = (navigation.state.params as RouteProps).user;
        return {
            title: `#${user.id} ${user.username}`
        };
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            isLoading: false,
            posts: []
        };
    }

    renderUserInfoRow(label: string, content: string) {
        return (
            <View style={styles.row}>
                <View style={styles.cell}>
                    <Text style={styles.userInfoTitle}>{label}</Text>
                </View>
                <View style={styles.cell}>
                    <Text style={styles.userInfo}>{content}</Text>
                </View>
            </View>
        );
    }

    async componentDidMount() {
        const user = this.props.navigation.getParam("user");
        this.setState({ isLoading: true });
        try {
            const posts = await apiClient.fetchPostsOfUser(user.id);
            this.setState({ posts });
        } catch {
            displayAlert("Unknown Error", "Please try again later.");
        } finally {
            this.setState({ isLoading: false });
        }
    }

    renderUserInfo = () => {
        const user = this.props.navigation.getParam("user");
        return (
            <React.Fragment>
                <View style={styles.userInfoContainer}>
                    {this.renderUserInfoRow("Name", user.name)}
                    {this.renderUserInfoRow("Email Address", user.email)}
                    {this.renderUserInfoRow(
                        "Address",
                        `${user.address.street}, ${user.address.suite}, ${
                            user.address.city
                        }, ${user.address.zipcode}`
                    )}
                    {this.renderUserInfoRow("Phone", user.phone)}
                    {this.renderUserInfoRow("Website", user.website)}
                </View>
                <View>
                    <Text style={styles.separator}>· · ·</Text>
                </View>
            </React.Fragment>
        );
    };

    onPostCardPress = (index: number) => () => {
        const user = this.props.navigation.getParam("user");
        const { posts } = this.state;
        const post = posts[index];
        this.props.navigation.push(RouteName.PostDetailsScreen, {
            postItem: { post, user }
        });
    };

    renderPostCard = (data: { item: PostItem; index: number }) => {
        return (
            <TouchableOpacity onPress={this.onPostCardPress(data.index)}>
                <PostCard postItem={data.item} />
            </TouchableOpacity>
        );
    };

    getPostItem = (): PostItem[] => {
        const user = this.props.navigation.getParam("user");
        const { posts } = this.state;
        return posts.map(p => ({ post: p, user: user }));
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
                    ListHeaderComponent={this.renderUserInfo}
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
