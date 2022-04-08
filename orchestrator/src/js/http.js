export default function (url, method, responseType, headers, data) {
	if (!method) method = 'GET';
	if (!responseType) responseType = 'json';

	var request = new XMLHttpRequest();
	request.responseType = responseType;

	return new Promise((resolve, reject) => {
		request.ontimeout = () => reject(new Error(`Error timeout while trying to load file ${url}`));
		request.onerror = () => reject(new Error(`An error occurred while trying to load file ${url}`));
		request.onload = () => {
			if (request.status >= 400) {
				reject(new Error(`Error while trying to load file ${url}`));
			}
			resolve(request.response);
		};
		request.open(method, url);

		if (headers && Object.keys(headers).length > 0) {
			for (const key in headers) {
				request.setRequestHeader(key, headers[key]);
			}
		}

		request.send(data ? JSON.stringify(data) : null);
	});
};