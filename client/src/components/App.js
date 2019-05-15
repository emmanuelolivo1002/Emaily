import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Components
import Header from "./Header";

const Dashboard = () => <h3>Dashboard</h3>;
const SurveyNew = () => <h3>SurveyNew</h3>;
const Landing = () => <h3>Landing</h3>;

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/surveys" component={Dashboard} />
          <Route path="/surveys/new" component={SurveyNew} />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
