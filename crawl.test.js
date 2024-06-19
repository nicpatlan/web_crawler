import { test, expect } from "@jest/globals";
import { normalizeURL, getURLsFromHTML } from "./crawl.js";

const closingSlash = 'https://en.wikipedia.org/wiki/URI_normalization/';
const noClosingSlash = 'https://en.wikipedia.org/wiki/URI_normalization';
const httpNotHttps = 'http://en.wikipedia.org/wiki/URI_normalization';
const httpWithSlash = 'https://en.wikipedia.org/wiki/URI_normalization/';
const shouldBeDifferent1 = 'https://en.wikipedia.org/wiki/URL/';
const shouldBeDifferent2 = 'http://en.wikipedia.org/wiki/Uniform_Resource_Identifier';

const rootURL = 'https://en.wikipedia.org'
const allAbsPathHTML = `<!DOCTYPE html>
<html>
<body>

<h1> A title that says stuff </h1>
<a href='https://en.wikipedia.org/wiki/Title_(publishing)'>A link about titles</a>
<h2> Another heading </h2>
<a href='https://en.wikipedia.org/wiki/Header_(computing)'>A link about headers</a>
</body>
</html>`;

const oneRelPathHTML = `<!DOCTYPE html>
<html>
<body>

<h1> A title that says stuff </h1>
<a href='https://en.wikipedia.org/wiki/Title_(publishing)'>A link about titles</a>
<h2> Another heading </h2>
<a href='/wiki/Header_(computing)'>A link about headers</a>
</body>
</html>`;

const noLinksHTML = `<!DOCTYPE html>
<html>
<body>
<h1> A title that says stuff </h1>
<h2> Another heading </h2>
</body>
</html>`;



test('no closing slash', () => {
    expect(normalizeURL(closingSlash)).toBe(normalizeURL(noClosingSlash));
});

test('http not https', () => {
    expect(normalizeURL(noClosingSlash)).toBe(normalizeURL(httpNotHttps));
});

test('has different slash and protocol', () => {
    expect(normalizeURL(closingSlash)).toBe(normalizeURL(httpNotHttps));
});

test('has different slash and protocol reversed', () => {
    expect(normalizeURL(noClosingSlash)).toBe(normalizeURL(httpWithSlash));
});

test('different URL with slash', () => {
    expect(normalizeURL(closingSlash)).not.toBe(normalizeURL(shouldBeDifferent1));
});

test('different URL with no slash', () => {
    expect(normalizeURL(noClosingSlash)).not.toBe(normalizeURL(shouldBeDifferent2));
});

const testResult = ['https://en.wikipedia.org/wiki/Title_(publishing)', 'https://en.wikipedia.org/wiki/Header_(computing)']

test('all absolute path links in html string', () => {
    expect(getURLsFromHTML(allAbsPathHTML, rootURL)).toStrictEqual(testResult);
});

test('one relative path link in html string', () => {
    expect(getURLsFromHTML(oneRelPathHTML, rootURL)).toStrictEqual(testResult);
});

test('no link in the html string', () => {
    expect(getURLsFromHTML(noLinksHTML, rootURL)).toStrictEqual([]);
});