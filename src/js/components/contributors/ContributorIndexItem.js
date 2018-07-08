import React from "react";

export default class ContributorIndexItem extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const info = this.props.info,
            activeRepo = this.props.activeRepo,
            company = this.props.company,
            repo = this.props.repo;

        const url = `/contributors/${info.login}`;

        return (
                <li className="contributor" onClick={(info) => {this.props._handleClick(url)}}>
                    <img src={info.avatar_url}></img>
                    <div>{info.contributions}</div>
                    <div>{info.login}</div>
                </li>
        );
    }
}
