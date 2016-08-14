var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        // Normalize paths to RequireJS module names.
        allTestFiles.push(file);
    }
});

//allTestFiles.push("public/javascript/main")
require.config({
    // Karma serves files under /base, which is the basePath from your config file
    baseUrl: '/base/public/javascript',
    paths: {
        "Handlebars": "/base/test/browser/lib/handlebars-v1.3.0",
        "text": "/base/test/browser/lib/text"
    },
    shim: {
        "Handlebars": {
            exports: "Handlebars"
        }
    },
    // dynamically load all test files
    deps: allTestFiles,

    // we have to kickoff jasmine, as it is asynchronous
    callback: window.__karma__.start
});