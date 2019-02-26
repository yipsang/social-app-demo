import * as React from "react";
import { Provider as ReduxStoreProvider } from "react-redux";

import AppNavigator from "./components/AppNavigator";
import { makeStore } from "./store";

const store = makeStore();

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
