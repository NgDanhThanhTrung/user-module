const version = 'V1.0.4';

function setHeaderValue(headers, key, value) {
    var lowerKey = key.toLowerCase();
    if (lowerKey in headers) {
        headers[lowerKey] = value;
    } else {
        headers[key] = value;
    }
}

var modifiedHeaders = $request.headers;

if (modifiedHeaders) {
    setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
}

$done({
    headers: modifiedHeaders
});
