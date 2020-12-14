const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use("/", express.static(`${__dirname}/orchestrator/dist`));
app.use('/public/angular', express.static(`${__dirname}/angular-app/dist/angularApp`));
app.use('/public/vue', express.static(`${__dirname}/vue-app/dist`));
app.use('/public/react', express.static(`${__dirname}/react-app/build`));
app.use('/public/error', express.static(`${__dirname}/not-found`));

app.get('*', function (req, res) {
	res.sendFile('index.html', {root: './orchestrator/dist'});
});

// Listen for HTTP requests on port 3000
app.listen(port, () => {
	console.log('listening on %d', port);
});
