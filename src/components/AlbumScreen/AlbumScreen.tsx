import * as React from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Paginator } from "../../paginator";
import { SocialAppAPIClient } from "../../apiClient";
import { displayAlert } from "../../utils/alert";
import { Dispatch } from "../../store";
import { fetchUser } from "../../actions/userAction";
import { Album } from "../../models/Album";
import { User } from "../../models/User";
import { AlbumItem } from "../../models/AlbumItem";

import { RouteName } from "../AppNavigator";
import AlbumPreview from "./AlbumPreview";
import ImagePreviewSkeleton from "../ImagePreviewSkeleton";

import * as Color from "../../styles/colors";

const styles = StyleSheet.create({
    touchableContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: Color.codGray,
        alignItems: "center",
        justifyContent: "center"
    },
    flatList: {
        alignSelf: "stretch"
    },
    contentContainer: {
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 5
    },
    cellContainer: {
        flex: 1,
        padding: 5
    }
});

interface UserIdentityMap {
    [userId: number]: User;
}

type ActionProps = ReturnType<typeof mapDispatchToProps>;

type Props = ActionProps & NavigationScreenProps<any>;

interface State {
    albums: Album[];
    userIdentityMap: UserIdentityMap;
    isLoading: boolean;
}

const apiClient = new SocialAppAPIClient();
const albumPaginator = new Paginator(apiClient.fetchAlbums, 20);

class AlbumScreen extends React.PureComponent<Props, State> {
    static navigationOptions = {
        title: "Album"
    };

    constructor(props: Props) {
        super(props);
        this.state = {
            albums: [],
            userIdentityMap: {},
            isLoading: false
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
        if (albumPaginator.isEnd) {
            return;
        }
        this.setState({ isLoading: true });
        try {
            const albums = await albumPaginator.next();
            const users: User[] = (await this.getUsers([
                ...new Set(albums.map(p => p.userId))
            ])) as any;
            this.setState(state => {
                const { albums: currentAlbums, userIdentityMap } = state;
                return {
                    albums: [...currentAlbums, ...albums],
                    userIdentityMap: {
                        ...userIdentityMap,
                        ...this.transformToUserIdentityMap(users)
                    }
                };
            });
        } catch {
            displayAlert("Unkown Error", "Please try again later.");
        } finally {
            setTimeout(() => this.setState({ isLoading: false }), 1000);
        }
    };

    onPreviewPress = (index: number) => () => {
        const { albums, userIdentityMap } = this.state;
        const album = albums[index];
        const user = userIdentityMap[album.userId];
        this.props.navigation.navigate(RouteName.AlbumDetailsScreen, {
            albumItem: { album, user }
        });
    };

    renderAlbumPreview = (data: {
        item: AlbumItem | number;
        index: number;
    }) => {
        if (typeof data.item == "number") {
            return (
                <View style={styles.cellContainer}>
                    <ImagePreviewSkeleton />
                </View>
            );
        }
        return (
            <TouchableOpacity
                style={styles.touchableContainer}
                onPress={this.onPreviewPress(data.index)}
            >
                <View style={styles.cellContainer}>
                    <AlbumPreview albumItem={data.item} />
                </View>
            </TouchableOpacity>
        );
    };

    getAlbumItems = (): AlbumItem[] => {
        const { albums, userIdentityMap } = this.state;
        return albums.map(a => ({ album: a, user: userIdentityMap[a.userId] }));
    };

    keyExtractor(_item: AlbumItem | number, index: number) {
        return index.toString();
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.flatList}
                    contentContainerStyle={styles.contentContainer}
                    data={[
                        ...this.getAlbumItems(),
                        ...(this.state.isLoading
                            ? [0, 0, 0, 0, 0, 0, 0, 0]
                            : [])
                    ]}
                    renderItem={this.renderAlbumPreview}
                    keyExtractor={this.keyExtractor}
                    onEndReachedThreshold={20}
                    onEndReached={this.loadNextPage}
                    numColumns={2}
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

export default connect(null, mapDispatchToProps)(AlbumScreen);
