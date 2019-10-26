import React, { Component } from "react";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";

import "./custom.css";
import IslandMap from "./pages/IslandMap";
import Dashboard from "./pages/Dashboard";

export default class App extends Component {
	static displayName = App.name;

	render() {
		return (
			<Layout>
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/plan" component={Home} />
				<Route exact path="/map" component={IslandMap} />
			</Layout>
		);
	}
}
