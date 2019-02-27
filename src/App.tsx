import * as React from "react";
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
        <AppNavigator />
      </ReduxStoreProvider>
    );
  }
}
