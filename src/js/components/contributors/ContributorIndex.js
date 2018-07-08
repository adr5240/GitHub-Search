import React from "react";
import { Link } from "react-router";
import axios from 'axios'

import ContributorIndexItem from "./ContributorIndexItem";

import repositoryStore from "../../stores/repositoryStore";
import contributorStore from "../../stores/contributorStore";

export default class ContributorIndex extends React.Component {
    constructor() {
        super();
        this.state = { people: {}, peopleList: [], activeRepo: false }
        this.peopleList = [];
        this.company = repositoryStore.getCompany();
        this.currentRepo = [];
    }

    componentWillMount() {
        let activeRepo = Object.keys(repositoryStore.getCurrentRepo()).length == 0 ? false : true;

        this.setState({ people: contributorStore.getAll(), activeRepo: activeRepo });

        let callback = () => {this.setState({ people: contributorStore.getAll() });};

        if(activeRepo) {
            this.company = repositoryStore.getCompany();
            this.repo = repositoryStore.getCurrentRepo();

            axios.get(`https://api.github.com/repos/${this.company}/${this.repo.name}/contributors`)
            .then(response => {
                contributorStore.updateContributors(response.data);
                callback();
            })
        }
    }

    componentDidMount() {
        this._sortName();
    }

    _handleClick = (url) => {
        this.props.history.push(url);
    }

    _sortName() {
        let list = Object.keys(this.state.people).map(key => {
            return this.state.people[key];
        });

        list.sort((a, b) => {
            return a.login > b.login;
        });

        this._handleSorted(list);
    }

    _sortContributions(name) {
        let list = Object.keys(this.state.people).map(key => {
            return this.state.people[key];
        });

        list.sort((a, b) => {
            return a.contributions < b.contributions;
        });

        this._handleSorted(list);
    }

    _handleSorted(list) {
        this.peopleList = [];
        for(var key in list) {
            this.peopleList.push(<ContributorIndexItem info={list[key]}
                                                        activeRepo={this.state.activeRepo}
                                                        repo={this.repo}
                                                        company={this.company}
                                                        key={list[key].id}
                                                        _handleClick={this._handleClick.bind(this)}>
                                </ContributorIndexItem>)
        }

        this.setState({ peopleList: this.peopleList })
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
                                <button class="btn btn-link" key="contributions" onClick={this._sortContributions.bind(this)}>Contributions</button>
                            </div>
                            {this.peopleList}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
