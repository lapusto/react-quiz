import { render } from "@testing-library/react";
import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Logout from "./components/Logout/Logout";
import Auth from "./containers/Auth/Auth";
import Quiz from "./containers/quiz/quiz";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import Layout from "./hoc/Layout/Layout";
import { autoLogin } from "./store/actions/auth";

function App(props) {
  function componentDidMount() {
    props.autoLogin();
  }

  let routes = (
    <Switch>
      <Route path="/auth" component={Auth} />
      <Route path="/quiz/:id" component={Quiz} />
      <Route path="/" exact component={QuizList} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/quiz-creator" component={QuizCreator} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return <Layout>{routes}</Layout>;
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    autoLogin: () => dispatch(autoLogin),
  };
}

export default withRouter(connect(mapStateToProps)(App));
