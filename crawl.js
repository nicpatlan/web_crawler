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
}

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
}

async function crawlPage(baseURL, currentURL = baseURL, pages = {}) {
    let fullURL;
    if (!currentURL.startsWith('/')) {
        let curObjURL = new URL(currentURL);
        let baseObjURL = new URL(baseURL);
        if (curObjURL.hostname !== baseObjURL.hostname) {
            return pages;
        }
        fullURL = curObjURL;
    } else {
        fullURL = new URL(currentURL, baseURL);
    }
    const curNormURL = normalizeURL(fullURL);
    if (curNormURL in pages) {
        pages[curNormURL]++;
        return pages;
    }
    pages[curNormURL] = 1;

    let response;
    try {
        response = await fetch(fullURL, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'text/html'
            }
        });
    } catch (err) {
        console.log(`fetch error: ${err}`);
        return;
    }
    if (response.status >= 400) {
        console.log(`response status error: ${response.status}`);
        return;
    }
    const contentType = response.headers.get('Content-Type');
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`response incorrect content type: ${contentType}`);
        return;
    }

    const text = await response.text();
    const links = getURLsFromHTML(text, baseURL);
    for (const link of links) {
        crawlPage(baseURL, link, pages);
    }
    return pages;
}

export { normalizeURL, getURLsFromHTML, crawlPage };