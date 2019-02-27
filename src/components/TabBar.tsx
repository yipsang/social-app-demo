import * as React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import {
  NavigationScreenProp,
  SafeAreaView,
  NavigationScreenOptions
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";

import * as Color from "../styles/colors";

import { RouteName } from "./AppNavigator";

const styles = StyleSheet.create({
  bottomView: {
    backgroundColor: Color.mineShaft
  },
  tabsContainer: {
    backgroundColor: Color.mineShaft,
    flexDirection: "row",
    paddingTop: 15
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export enum TabID {
  Post = "post",
  Album = "album"
}

interface TabConfig {
  id: TabID;
  tabLabel: string;
  iconName: string;
  onPress: () => void;
}

type Props = {
  activeTab: TabID;
  navigation: NavigationScreenProp<any, any>;
};

interface State {
  tabConfigs: TabConfig[];
}

const SAFE_AREA_FORCE_INSET = {
  top: "never" as "never",
  bottom: "always" as "always"
};

function TabConfig(
  id: TabID,
  tabLabel: string,
  iconName: string,
  onPress: () => void
): TabConfig {
  return {
    id,
    tabLabel,
    iconName,
    onPress
  };
}

export default class AppTabBar extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tabConfigs: [
        TabConfig(TabID.Post, "Post", "md-copy", this.onPressPostTab),
        TabConfig(TabID.Album, "Album", "md-photos", this.onPressAlbumTab)
      ]
    };
  }

  onPressPostTab = () => {
    this.props.navigation.navigate(RouteName.PostTab);
  };

  onPressAlbumTab = () => {
    this.props.navigation.navigate(RouteName.AlbumTab);
  };

  renderTab = (config: TabConfig) => {
    const isActive = config.id === this.props.activeTab;
    const tintColor = isActive ? "white" : Color.nobel;
    return (
      <TouchableOpacity
        key={config.id}
        style={styles.tab}
        activeOpacity={1.0}
        onPress={config.onPress}
      >
        <Ionicons size={32} name={config.iconName} color={tintColor} />
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <SafeAreaView
        forceInset={SAFE_AREA_FORCE_INSET}
        style={styles.bottomView}
      >
        <View style={styles.tabsContainer}>
          {this.state.tabConfigs.map(this.renderTab)}
        </View>
      </SafeAreaView>
    );
  }
}

export function withTabBar<P>(
  Component: React.ComponentType<P> & {
    navigationOptions?: NavigationScreenOptions;
  },
  tabId: TabID
) {
  class WrappedComponent extends React.PureComponent<
    P & { navigation: NavigationScreenProp<any, any> }
  > {
    static navigationOptions = Component.navigationOptions;
    render() {
      return (
        <React.Fragment>
          <Component {...this.props} />
          <AppTabBar activeTab={tabId} navigation={this.props.navigation} />
        </React.Fragment>
      );
    }
  }
  return WrappedComponent;
}
