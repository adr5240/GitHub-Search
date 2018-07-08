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
                <li onClick={(info) => {this.props._handleClick(url)}}>
                    <div>{info.name}</div>
                    <div>{info.language}</div>
                </li>
        );
    }
}
