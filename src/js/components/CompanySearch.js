import React from "react";
import axios from "axios";

import repositoryStore from "../stores/repositoryStore";
import contributorStore from "../stores/contributorStore";

export default class CompanySearch extends React.Component {
    constructor(props) {
        super();
        this.safetyValue = 0;
        this.state = { companyName: "" }
    }

    _handleChange = (e) => {
        this.setState({ companyName: e.target.value })
    }

    _handleSubmit = (callback) => {
        axios.get(`https://api.github.com/orgs/${this.state.companyName}/repos`)
            .then(response => {
                repositoryStore.updateRepos(response.data);
                callback();
            })

        axios.get(`https://api.github.com/orgs/${this.state.companyName}/members`)
            .then(response => {
                console.log(response.data);
                contributorStore.updateContributors(response.data);
                callback();
            })
    }

    _linkToRepos = () => {
        this.safetyValue += 1;
        repositoryStore.updateCompany(this.state.companyName);
        if(this.safetyValue == 2) {
            this.safetyValue = 0;
            this.props.history.push(`${this.state.companyName}/repos`);
        }
    }

    render() {
        return (
            <div>
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <h3>Please enter a Company Name</h3>
                            <input value={this.state.companyName} onChange={(e) => {this._handleChange(e)}}></input>
                            <button class="btn btn-success" onClick={() => {this._handleSubmit(this._linkToRepos.bind(this))}}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
