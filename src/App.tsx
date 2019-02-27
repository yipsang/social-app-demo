import * as React from "react";
import { StatusBar } from "react-native";
import { Provider as ReduxStoreProvider } from "react-redux";

import AppNavigator from "./components/AppNavigator";
import { makeStore } from "./store";
import { SocialAppAPIClient } from "./apiClient";

const apiClient = new SocialAppAPIClient();
const store = makeStore(apiClient);

interface Props {}

export default class App extends React.PureComponent<Props> {
  render() {
    return (
      <ReduxStoreProvider store={store}>
        <React.Fragment>
          <StatusBar barStyle="light-content" />
          <AppNavigator />
        </React.Fragment>
      </ReduxStoreProvider>
    );
  }
}
