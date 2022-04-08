const settings = {
	appsByRoute: {
		'/': {projectDir: 'angular-app', staticFiles: '/public/angular'},
		'/angular': {projectDir: 'angular-app', staticFiles: '/public/angular'},
		'/react': {projectDir: 'react-app', staticFiles: '/public/react'},
		'/vue': {projectDir: 'vue-app', staticFiles: '/public/vue'},
		'/error': {projectDir: 'not-found', staticFiles: '/public/error'},
	},
	defaultPath: '/angular',
	notFoundPath: '/error'
};

export {settings};
