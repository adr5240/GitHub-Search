import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory, Redirect } from "react-router";

import Layout from "./components/Layout";
import CompanySearch from "./components/CompanySearch";
import RepoIndex from "./components/repos/RepoIndex";
import RepoInfoCard from "./components/repos/RepoInfoCard";
import ContributorIndex from "./components/contributors/ContributorIndex";
import ContributorInfoCard from "./components/contributors/ContributorInfoCard";

const app = document.getElementById('app');

ReactDOM.render(
    <Router history={hashHistory}>
        <Route path="/" component={Layout}>
            <IndexRoute component={CompanySearch}></IndexRoute>
            <Route path="/:company/repos" name="repos" component={RepoIndex}></Route>
            <Route path="/:company/repos/:name" name="repoCard" component={RepoInfoCard}></Route>
            <Route path="/:company/contributors" name="companyContributors" component={ContributorIndex}></Route>
            <Route path="/contributors/:name" name="contributorsCard" component={ContributorInfoCard}></Route>

            <Route path="/repos/:company/:repo/contributors" name="repoContributors" component={ContributorIndex}></Route>
        </Route>
    </Router>,
app);
