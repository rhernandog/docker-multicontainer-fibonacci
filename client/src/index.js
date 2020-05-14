import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import OtherPage from "./components/OtherPage";

const App = () => {
  return <Router>
    <div className="wrapper">
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Alo Alo Vecinillo</h1>
            <hr />
          </div>
          <Route path="/" exact component={Home} />
          <Route path="/otherpage" component={OtherPage} />
        </div>
      </div>
    </div>
  </Router>;
};

render(
  <App />, document.getElementById("root")
);
