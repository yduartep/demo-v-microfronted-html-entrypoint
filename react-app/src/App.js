import logo from './logo.svg';
import './App.css';

import React from "react";
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.
const historyBaseName = process.env.REACT_APP_MICRO_FRONTEND === 'true' ? '/react' : process.env.PUBLIC_URL;

export default function App() {
	return (
		<Router basename={historyBaseName}>
			<div className="nav-react">
				<NavLink to="/" exact={true} activeClassName="selected">Home</NavLink> |
				<NavLink to="/about" activeClassName="selected">About</NavLink> |
				<NavLink to="/dashboard" activeClassName="selected">Dashboard</NavLink>
			</div>
			<div className="nav-react-body">

				{/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
				<Switch>
					<Route exact path="/">
						<Home/>
					</Route>
					<Route path="/about">
						<About/>
					</Route>
					<Route path="/dashboard">
						<Dashboard/>
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

// You can think of these components as "pages"
// in your app.

function Home() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo"/>
				<p>
					Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

function About() {
	return (
		<div className="content">
			<h2>About</h2>
			<p>This is the content of the about page</p>
		</div>
	);
}

function Dashboard() {
	return (
		<div className="content">
			<h2>Dashboard</h2>
			<p>This is the content of the dashboard page</p>
		</div>
	);
}

