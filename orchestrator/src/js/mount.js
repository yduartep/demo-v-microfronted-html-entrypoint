import {settings} from "./settings";
import http from './http';

const setAttributes = (source, target) => {
	for (let i = 0; i < source.attributes.length; i++) {
		const attr = source.attributes[i];
		target[attr.name] = source[attr.name];
	}
}

const copyNodeElements = (source, target) => {
	while (source.children.length > 0) {
		const item = source.children[0];

		if ('SCRIPT' === item.nodeName) {
			const script = document.createElement("script");
			if (item.src) {
				setAttributes(item, script);
			} else {
				const inlineScript = document.createTextNode(item.textContent);
				if (item.attributes.length > 0) setAttributes(item, inlineScript);
				script.appendChild(inlineScript);
			}
			target.appendChild(script);
			source.removeChild(item);
		} else {
			target.appendChild(document.adoptNode(item));
		}
	}
}

const createBaseTag = (header, route) => {
	if (header.getElementsByTagName('base').length <= 0) {
		var base = document.createElement("base");
		base.href = getMicroFrontendRelativePath(route);
		document.querySelector('head').appendChild(base);
	}
}

const getMicroFrontendByRoute = (route) => {
	const parts = (route || '/').substring(1).split('/');
	if (parts.length > 0) {
		return settings.appsByRoute['/' + parts[0]];
	}
	return null;
}

const getMicroFrontendRelativePath = (route) => {
	const microFrontend = getMicroFrontendByRoute(route);
	if (microFrontend) return `${microFrontend.staticFiles}/`;

	return '';
}

const showLoading = (show) => {
	document.getElementById('loading-mf').hidden = !show;
}

const getValidRoute = (route) => {
	const microFronted = getMicroFrontendByRoute(route);
	if (!microFronted) {
		return settings.notFoundPath;
	} else {
		return route === '/' ? settings.defaultPath : route;
	}
}

const getRouteWithoutLastSlash = () => {
	let route = location.pathname;
	if (location.pathname.length > 1 && location.pathname[location.pathname.length - 1] === '/') {
		route = route.substring(0, route.length - 1);
	}
	return route;
}

const mount = (route) => {
	showLoading(true);

	const indexUrl = `${window.location.origin}${getMicroFrontendRelativePath(route)}index.html`;
	return http(indexUrl, 'GET', 'document', null, null)
		.then((doc) => {
			const mfHeader = doc.getElementsByTagName('head')[0];
			const mfBody = doc.getElementsByTagName('body')[0];
			const documentHeader = document.getElementsByTagName('head')[0];
			const documentBody = document.getElementById('microfrontend-content');

			createBaseTag(mfHeader, route);
			copyNodeElements(mfHeader, documentHeader);
			copyNodeElements(mfBody, documentBody);

			if (route !== settings.notFoundPath) window.history.pushState({}, '', route);
			activeNav(route);
			setTimeout(() => showLoading(false), 100)
		});

}

const activeNav = (pathName) => {
	let pathNoSlash = '';
	const parts = (pathName || '/').substring(1).split('/');
	if (parts.length > 0) {
		pathNoSlash = parts[0];
	}

	const navItems = document.getElementsByClassName('nav-link');
	for (let i = 0; i < navItems.length; i++) {
		const navItem = navItems[i];
		navItem.classList.remove('active');

		if (navItem.classList.contains(pathNoSlash)) {
			navItem.classList.add("active");
		}
	}
}

const start = () => {
	const route = getValidRoute(getRouteWithoutLastSlash());
	mount(route).then(() => {
		console.log('Micro-frontend loaded successfully!');
	});
}

export {start};