import React from "react";
import { Link } from "react-router";
import axios from 'axios'

import RepoIndexItem from "./RepoIndexItem";

import repositoryStore from "../../stores/repositoryStore";

export default class RepoIndex extends React.Component {
    constructor() {
        super();
        this.state = { repos: {}, repoList: [], company: "" }
    }

    componentWillMount() {
        this.setState({
            repos: repositoryStore.getAll(),
            company: repositoryStore.getCurrentOrg()
        });
    }

    componentDidMount() {
        repositoryStore.emptyRepo();
        this._sortName();
    }

    _handleClick = (url) => {
        this.props.history.push(url);
    }

    _sortName() {
        let list = Object.keys(this.state.repos).map(key => {
            return this.state.repos[key];
        });

        list.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
            }
            return 0;
        });

        this._handleSorted(list);
    }

    _sortWatchers() {
        let list = Object.keys(this.state.repos).map(key => {
            return this.state.repos[key];
        });

        list.sort((a, b) => {
            return b.watchers - a.watchers;
        });

        this._handleSorted(list);
    }

    _sortStars() {
        let list = Object.keys(this.state.repos).map(key => {
            return this.state.repos[key];
        });

        list.sort((a, b) => {
            return b.stargazers_count - a.stargazers_count;
        });

        this._handleSorted(list);
    }

    _sortSize() {
        let list = Object.keys(this.state.repos).map(key => {
            return this.state.repos[key];
        });

        list.sort((a, b) => {
            return b.size - a.size;
        });

        this._handleSorted(list);
    }

    _sortForks() {
        let list = Object.keys(this.state.repos).map(key => {
            return this.state.repos[key];
        });

        list.sort((a, b) => {
            return b.forks_count - a.forks_count;
        });

        this._handleSorted(list);
    }

    _handleSorted(list) {
        this.repoList = [];
        for(var key in list) {
            this.repoList.push(<RepoIndexItem info={list[key]} company={this.state.company} key={list[key].id} _handleClick={this._handleClick.bind(this)}></RepoIndexItem>)
        }

        this.setState({ repoList: this.repoList })
    }

    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <div>
                                <h5>Sort By:</h5>
                                <button class="btn btn-link" key="name" onClick={this._sortName.bind(this)}>Name</button>
                                <button class="btn btn-link" key="watchers" onClick={this._sortWatchers.bind(this)}>Watchers</button>
                                <button class="btn btn-link" key="stars" onClick={this._sortStars.bind(this)}>Stars</button>
                                <button class="btn btn-link" key="size" onClick={this._sortSize.bind(this)}>Size</button>
                                <button class="btn btn-link" key="forks" onClick={this._sortForks.bind(this)}>Forks</button>
                            </div>
                            {this.state.repoList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
