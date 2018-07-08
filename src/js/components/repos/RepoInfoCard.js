import React from "react";
import axios from "axios";

import repositoryStore from "../../stores/repositoryStore";
import contributorStore from "../../stores/contributorStore";

export default class RepoIndexItem extends React.Component {
    constructor(props) {
        super();
        this.state = { repo: {} };
    }

    componentWillMount() {
        let name = this.props.params.name;
        this.setState({repo: repositoryStore.findRepo(name)});
    }

    componentDidMount() {
        repositoryStore.updateCurrentRepo(this.state.repo);
    }

    _handleBack = () => {
        this.props.history.goBack()
    }

    _handleClick = () => {
        let repo = repositoryStore.getCurrentRepo().name;
        let owner = repositoryStore.getCompany();

        let callback = this.linkToContributors.bind(this, owner, repo);

        axios.get(`https://api.github.com/repos/${owner}/${repo}/contributors`)
            .then(response => {
                contributorStore.updateContributors(response.data);
                callback();
            }, error => {
                document.getElementById("error").style.display = "block";
            });
    }

    linkToContributors = (company, repo) => {
        this.props.history.push(`/repos/${company}/${repo}/contributors`);
    }

    render() {
        const repo = this.state.repo;

        return (
            <div>
                <div>
                    <button className="btn btn-danger back" onClick={this._handleBack.bind(this)}>Back</button>
                </div>
                <div id="error" style={{display: "none"}}>This is a Private Repo</div>
                <ul>
                    <li>Name: {repo.name}</li>
                    <li>Description: {repo.description}</li>
                    <li>URL: <a href={repo.html_url} target="_blank">Repo on Github</a></li>
                    <li>Stars: {repo.stargazers_count}</li>
                    <li>Watchers: {repo.watchers_count}</li>
                    <li>Forks: {repo.forks_count}</li>
                    <button class="btn btn-success" onClick={this._handleClick}>See Contributors</button>
                </ul>
            </div>
        );
    }
}
