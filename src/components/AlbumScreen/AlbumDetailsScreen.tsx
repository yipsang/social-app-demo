import * as React from "react";
import {
    StyleSheet,
    View,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";
import { NavigationScreenProps } from "react-navigation";

import { Paginator, PaginatorType } from "../../paginator";
import { SocialAppAPIClient } from "../../apiClient";
import { AlbumItem } from "../../models/AlbumItem";
import { Photo } from "../../models/Photo";
import { displayAlert } from "../../utils/alert";

import { RouteName } from "../AppNavigator";
import PhotoCard, { PhotoCardSkeleton } from "./PhotoCard";

import * as Color from "../../styles/colors";

const styles = StyleSheet.create({
    touchableContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        backgroundColor: Color.codGray
    },
    contentContainer: {
        paddingBottom: 15,
        paddingHorizontal: 10
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
    cellContainer: {
        flex: 1,
        paddingTop: 10
    }
});

const apiClient = new SocialAppAPIClient();

interface RouteProps {
    albumItem: AlbumItem;
}

type Props = NavigationScreenProps<RouteProps>;

interface State {
    photos: Photo[];
    isLoading: boolean;
    photoPaginator: PaginatorType<Photo>;
}

export default class AlbumDetailsScreen extends React.PureComponent<
    Props,
    State
> {
    static navigationOptions: any = ({ navigation }: NavigationScreenProps) => {
        return {
            title: (navigation.state.params as RouteProps).albumItem.album.title
        };
    };

    constructor(props: Props) {
        super(props);
        const { album } = this.props.navigation.getParam("albumItem");
        this.state = {
            photos: [],
            isLoading: false,
            photoPaginator: new Paginator((cursor: number, limit: number) => {
                return apiClient.fetchPhotos(album.id, cursor, limit);
            }, 10)
        };
    }

    componentDidMount() {
        this.loadNextPage();
    }

    renderPhoto(data: { item: Photo | number; index: number }) {
        if (typeof data.item == "number") {
            return (
                <View style={styles.cellContainer}>
                    <PhotoCardSkeleton />
                </View>
            );
        }
        return (
            <View style={styles.cellContainer}>
                <PhotoCard photo={data.item} />
            </View>
        );
    }

    loadNextPage = async () => {
        if (this.state.photoPaginator.isEnd) {
            return;
        }
        this.setState({ isLoading: true });
        try {
            const photos = await this.state.photoPaginator.next();
            this.setState(({ photos: currentPhotos }) => ({
                photos: [...currentPhotos, ...photos]
            }));
        } catch {
            displayAlert("Unkown Error", "Please try again later.");
        } finally {
            setTimeout(() => this.setState({ isLoading: false }), 1000);
        }
    };

    onAuthorNamePress = () => {
        const { user } = this.props.navigation.getParam("albumItem");
        this.props.navigation.push(RouteName.UserDetailsScreen, { user });
    };

    renderAuthorContent = () => {
        const { user } = this.props.navigation.getParam("albumItem");
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
            </View>
        );
    };

    keyExtractor(_item: Photo | number, index: number) {
        return index.toString();
    }

    render() {
        const { photos, isLoading } = this.state;
        return (
            <View style={styles.container}>
                <FlatList
                    contentContainerStyle={styles.contentContainer}
                    data={[
                        ...photos,
                        ...(isLoading ? [0, 0, 0, 0, 0, 0, 0, 0] : [])
                    ]}
                    renderItem={this.renderPhoto}
                    keyExtractor={this.keyExtractor}
                    onEndReachedThreshold={10}
                    onEndReached={this.loadNextPage}
                    ListHeaderComponent={this.renderAuthorContent}
                />
            </View>
        );
    }
}
