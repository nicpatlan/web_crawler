import { JSDOM } from 'jsdom';

function normalizeURL(urlString) {
    const aURL = new URL(urlString);
    const pathName = aURL.pathname;
    let normalURL = aURL.host;
    if (pathName[pathName.length - 1] === '/') {
        normalURL += pathName.slice(0, pathName.length - 1);
    } else {
        normalURL += pathName
    }
    return normalURL;
};

function getURLsFromHTML(htmlString, rootURL) {
    const dom = new JSDOM(htmlString);
    const elements = dom.window.document.querySelectorAll('a');
    const urlArray = []
    for (const element of elements) {
        if (element.hasAttribute('href')) {
            let elementURL = element.getAttribute('href');
            try {
                elementURL = new URL(elementURL, rootURL).href;
                urlArray.push(elementURL);
            } catch (err) {
                console.log(`${err.message}: ${elementURL}`);
            }
        }
    }
    return urlArray;
};

export { normalizeURL, getURLsFromHTML };