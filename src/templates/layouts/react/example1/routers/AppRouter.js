import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { useUser } from "../hooks/useUser";
import { HomeScreen } from "../components/screens/home/HomeScreen";
import "/home/<yourname>/.nvm/versions/node/v16.2.0/lib/node_modules/patucostrap/style/patucoSchema.css";

const AppRouter = () => {
  const { user } = useUser();

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route path="/auth" component={AuthRouter} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppRouter;