import React from "react";
import indexRoutes from "./routes/";
import { Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
// import { configureStore } from "./redux/Store";
import { persistor, store } from "./redux/Store";
import { PersistGate } from "redux-persist/lib/integration/react";
import { History } from "./jwt/_helpers";
import { PrivateRoute } from "./routes/PrivateRoutes";
import BlankLayout from "./layouts/BlankLayout";
import { Spin } from "antd";

const App = () => {
  //const [currentUser, SetcurrentUser] = useState(null);
  return (
    <Provider store={store}>
      <Router history={History}>
        <Switch>
          <Route exact path="/authentication/Login" component={BlankLayout} />;
          <Route exact path="/authentication/registro/:codigo" component={BlankLayout} />;
          <PersistGate loading={<Spin />} persistor={persistor}>
            {indexRoutes.map((prop, key) => {
              return (
                <PrivateRoute
                  path={prop.path}
                  key={key}
                  component={prop.component}
                />
              );
            })}
          </PersistGate>
        </Switch>
      </Router>
    </Provider>
  );
};
export default App;
