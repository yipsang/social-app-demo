import {
  createAppContainer,
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import { HomeScreen, DetailsScreen, CounterScreen } from "./Screen";
import PostScreen from "./PostScreen/PostScreen";
import { withTabBar, TabID } from "./TabBar";

import * as Color from "../styles/colors";

export enum RouteName {
  PostTab = "PostTab",
  AlbumTab = "AlbumTab"
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
      screen: withTabBar(PostScreen, TabID.Post),
      navigationOptions: appNavigationOptions
    }
  },
  {
    initialRouteName: "Posts",
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
