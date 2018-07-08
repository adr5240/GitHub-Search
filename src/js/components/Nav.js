import React from "react";
import { IndexLink, Link } from "react-router";

import repositoryStore from "../stores/repositoryStore";

export default class Nav extends React.Component {
    constructor() {
        super()
        this.state = {
            collapsed: true,
        };
    }

    toggleCollapse() {
        const collapsed = !this.state.collapsed;
        this.setState({collapsed});
    }

    render() {
        const { location } = this.props;
        const { collapsed } = this.state;
        const featuredClass = location.pathname === "/" ? "active" : "";
        const reposClass = location.pathname.match(/^\/repos/) ? "active" : "";
        const settingsClass = location.pathname.match(/^\/contributors/) ? "active" : "";
        const navClass = collapsed ? "collapse" : "";

        const company = repositoryStore.getCompany();

        return (
            <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div class="container">
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                    </div>
                    <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li class={featuredClass}>
                                <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Search</IndexLink>
                            </li>
                            <li class={reposClass}>
                                <Link to={`${company}/repos`} onClick={this.toggleCollapse.bind(this)}>Repos</Link>
                            </li>
                            <li class={settingsClass}>
                                <Link to={`${company}/contributors`} onClick={this.toggleCollapse.bind(this)}>People</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
