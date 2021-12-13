import { Switch, Route, Redirect } from "react-router-dom";
import { LoginScreen } from "../components/screens/auth/LoginScreen";
import { RegisterScreen } from "../components/screens/auth/RegisterScreen";

export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={LoginScreen} />
      <Route exact path="/auth/register" component={RegisterScreen} />
      <Redirect to="/auth/login" />
    </Switch>
  );
};
