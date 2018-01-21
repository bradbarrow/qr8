const rejectIfResponseNotOk = (request, response) => {
  const { status, statusText } = response;

  const error = new Error(`${status}: ${statusText}`);

  error.request = request;
  error.response = response;

  if (!response.ok) throw error;

  return response;
};

export const mockRequest = error => (!error.request ? null : {
  method: error.request.method,
  url: error.request.url,
  protocol: error.request.protocol,
  hostname: error.request.hostname,
  port: error.request.port,
  path: error.request.path,
  headers: error.request.headers,
  referrer: error.request.referrer,
});

export const mockResponse = error => (!error.response ? null : {
  status: error.response.status,
  statusText: error.response.statusText,
  url: error.response.url,
  headers: error.response.headers,
});

const handleFetchError = () => (e) => {
  console.error(e);
};

const defaultConfig = {
  resourceName: 'resource',
  transformResponse: r => r,
  transformError: (err, defaultReturnValue) => defaultReturnValue,
  defaultReturnValue: null,
  fetchConfig: {},
  context: {},
};

const fetchJson = (url, opts) => {
  const config = { ...defaultConfig, ...opts };
  const fetchConfig = config.fetchConfig || {};
  const timeout = fetchConfig.timeout || 3000;

  const req = new Request(url, {
    ...fetchConfig,
  });

  return fetch(req, { timeout })
    .then(response => rejectIfResponseNotOk(req, response))
    .then(response => response.json())
    .then(config.transformResponse)
    .catch(handleFetchError(config.resourceName, config.defaultReturnValue, config.transformError));
};

export default fetchJson;
