import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { HomeScreen, DetailsScreen, CounterScreen } from "./Screen";
import PostScreen from "./PostScreen/PostScreen";
import PostDetailsScreen from "./PostScreen/PostDetailsScreen";
import UserDetailsScreen from "./UserDetailsScreen";
import { withTabBar, TabID } from "./TabBar";

import * as Color from "../styles/colors";

export enum RouteName {
  PostTab = "PostTab",
  AlbumTab = "AlbumTab",
  PostDetailsScreen = "PostDetailsScreen",
  UserDetailsScreen = "UserDetailsScreen"
}

const appNavigationOptions = {
  headerTintColor: "white",
  headerStyle: {
    borderBottomWidth: 0,
    borderWidth: 0,
    backgroundColor: Color.mineShaft
  }
};

const PostStackNavigator = createStackNavigator(
  {
    Posts: {
      screen: withTabBar(PostScreen, TabID.Post)
    },
    PostDetailsScreen: {
      screen: PostDetailsScreen
    },
    UserDetailsScreen: {
      screen: UserDetailsScreen
    }
  },
  {
    initialRouteName: "Posts",
    defaultNavigationOptions: appNavigationOptions,
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

const AlbumStackNavigator = createStackNavigator(
  {
    Albums: {
      screen: withTabBar(HomeScreen, TabID.Album),
      navigationOptions: appNavigationOptions
    },
    Details: {
      screen: DetailsScreen
    },
    Counter: {
      screen: CounterScreen
    }
  },
  {
    initialRouteName: "Albums",
    navigationOptions: {
      tabBarVisible: false
    }
  }
);

const MainTabNavigator = createBottomTabNavigator(
  {
    [RouteName.PostTab]: PostStackNavigator,
    [RouteName.AlbumTab]: AlbumStackNavigator
  },
  {
    initialRouteName: "PostTab",
    backBehavior: "none"
  }
);

export default createAppContainer(MainTabNavigator);
