import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

const closingSlash = 'https://en.wikipedia.org/wiki/URI_normalization/';
const noClosingSlash = 'https://en.wikipedia.org/wiki/URI_normalization';
const httpNotHttps = 'http://en.wikipedia.org/wiki/URI_normalization';
const httpWithSlash = 'https://en.wikipedia.org/wiki/URI_normalization/';
const shouldBeDifferent1 = 'https://en.wikipedia.org/wiki/URL/';
const shouldBeDifferent2 = 'http://en.wikipedia.org/wiki/Uniform_Resource_Identifier';

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