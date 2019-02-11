const { URL } = require('url');

function getInt(str) {
    return /[0-9]+/.test(str) ? parseInt(str) : undefined;
}

function getUrlFromPath(str) {
    let url = str.slice(1);
    if (!url.startsWith('http')) {
        return 'https://' + url;
    }
    return url;
}

function isValidUrl(str) {
    try {
        const url = new URL(str);
        return url.hostname.includes('.');
    } catch (e) {
        console.error(e.message);
        return false;
    }
}

module.exports = { getInt, getUrlFromPath, isValidUrl };