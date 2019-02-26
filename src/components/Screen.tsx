import * as React from "react";
import {
  Platform,
  StyleSheet,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import { NavigationScreenProps } from "react-navigation";

import {
  IncrementCountAction,
  DecrementCountAction,
  incrementAction,
  decrementAction,
  changeCountAction
} from "../actions/counterAction";

import { connect } from "react-redux";
import { State } from "../reducers";
import { bindActionCreators } from "redux";
import { Dispatch, ThunkAction } from "../store";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  navigationButton: {
    marginTop: 20
  }
});

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type HomeScreenProps = NavigationScreenProps;

export class HomeScreen extends React.PureComponent<HomeScreenProps> {
  static navigationOptions = {
    title: "Home"
  };

  onPressGotoDetailsScreenButton = () => {
    this.props.navigation.navigate("Details");
  };

  onPressGotoCounterScreenButton = () => {
    this.props.navigation.navigate("Counter");
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Home Screen</Text>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={this.onPressGotoDetailsScreenButton}
        >
          <Text>Go to Details Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={this.onPressGotoCounterScreenButton}
        >
          <Text>Go to Counter Screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

type DetailsScreenProps = NavigationScreenProps;

export class DetailsScreen extends React.PureComponent<DetailsScreenProps> {
  static navigationOptions = {
    title: "Details"
  };

  onPressBackButton = () => {
    this.props.navigation.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Details Screen</Text>
        <Text style={styles.instructions}>{instructions}</Text>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={this.onPressBackButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

interface CounterScreenMapProps {
  count: number;
  increment: (count: number) => IncrementCountAction;
  decrement: (count: number) => DecrementCountAction;
  changeCount: (count: number) => ThunkAction<Promise<number>>;
}
type CounterScreenProps = NavigationScreenProps & CounterScreenMapProps;

class _CounterScreen extends React.PureComponent<CounterScreenProps> {
  static navigationOptions = {
    title: "Counter"
  };

  onPressBackButton = () => {
    this.props.navigation.pop();
  };

  onPressIncrementButton = () => {
    this.props.increment(1);
  };

  onPressDecrementButton = () => {
    this.props.decrement(1);
  };

  onPressChangeCountButton = () => {
    this.props.changeCount(this.props.count);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Counter Screen</Text>
        <Text>Current count: {this.props.count}</Text>
        <TouchableOpacity onPress={this.onPressIncrementButton}>
          <Text>Increment 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressDecrementButton}>
          <Text>Decrement 1</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onPressChangeCountButton}>
          <Text>Change count</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navigationButton}
          onPress={this.onPressBackButton}
        >
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export const CounterScreen = connect(
  (state: State) => ({
    count: state.counter.count
  }),
  (dispatch: Dispatch) => ({
    increment: bindActionCreators(incrementAction, dispatch),
    decrement: bindActionCreators(decrementAction, dispatch),
    changeCount: bindActionCreators(changeCountAction, dispatch)
  })
)(_CounterScreen);
