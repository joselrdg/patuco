import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { useUser } from "../hooks/useUser";

export const AppRouter = () => {
  const { user } = useUser();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/auth" component={AuthRouter} />
        <Route path={pahtCareLink} component={CarelinkRouter} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
