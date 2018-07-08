import React from "react";
import { Link } from "react-router";
import axios from 'axios'

import RepoIndexItem from "./RepoIndexItem";

import repositoryStore from "../../stores/repositoryStore";

export default class RepoIndex extends React.Component {
    constructor() {
        super();
        this.state = { repos: [], company: "" }
    }

    componentWillMount() {
        this.setState({
            repos: repositoryStore.getAll(),
            company: repositoryStore.getCompany()
        });
    }

    componentDidMount() {
        repositoryStore.emptyRepo();
    }

    _handleClick = (url) => {
        this.props.history.push(url);
    }

    render() {
        var repoList = [];
        var state = this.state.repos;

        for(var key in state) {
            repoList.push(<RepoIndexItem info={state[key]} company={this.state.company} key={state[key].id} _handleClick={this._handleClick.bind(this)}></RepoIndexItem>)
        }

        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            {repoList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
