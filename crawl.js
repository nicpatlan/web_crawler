//const url = require('node:url');

function normalizeURL(urlString) {
    const aURL = new URL(urlString);
    const pathName = aURL.pathname;
    let normalURL = aURL.host;
    if (pathName[pathName.length - 1] === '/') {
        normalURL += pathName.slice(0, pathName.length - 1);
    } else {
        normalURL += pathName
    }
    return normalURL
};

export { normalizeURL };