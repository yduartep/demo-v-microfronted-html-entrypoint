module.exports = {
	publicPath: process.env.NODE_ENV === 'microfrontend'
		? './'
		: '/'
}