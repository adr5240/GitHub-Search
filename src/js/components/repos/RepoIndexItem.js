import React from "react";

export default class RepoIndexItem extends React.Component {
    constructor(props) {
        super();
    }

    render() {
        const info = this.props.info;
        const company = this.props.company;
        const url = `/${company}/repos/${info.name}`;

        return (
                <div className="repoIndexItem" onClick={(info) => {this.props._handleClick(url)}}>
                    <ul>
                        <li>{info.name}</li>
                        <ul>
                            <li>Language(s): {info.language}</li>
                            <li>Forks: {info.forks_count}</li>
                            <li>Stars: {info.stargazers_count}</li>
                        </ul>
                    </ul>
                </div>
        );
    }
}
