import React from "react";
import axios from "axios";

import repositoryStore from "../../stores/repositoryStore";
import contributorStore from "../../stores/contributorStore";

export default class ContributorIndexItem extends React.Component {
    constructor(props) {
        super();
    }

    componentWillMount() {
        let name = this.props.params.name;
        this.setState({person: contributorStore.findPerson(name)});
    }

    componentDidMount() {
        contributorStore.updateCurrentPerson(this.state.person);
    }

    componentWillUnmount() {
        contributorStore.emptyPerson();
    }

    _handleBack = () => {
        this.props.history.goBack()
    }

    render() {
        let info = this.state.person;

        return (
            <div>
                <div>
                    <button className="btn btn-danger back" onClick={this._handleBack.bind(this)}>Back</button>
                </div>

                <img src={info.avatar_url}></img>
                <div>{info.login}</div>
                <div>{info.contributions}</div>
                <div>{info.site_admin}</div>
                <a href={`https://www.github.com/${info.login}`} target="_blank">Personal GitHub</a>
            </div>
        );
    }
}
