const jsdom = require("jsdom");
const fs = require("fs");
const { JSDOM } = jsdom;

exports.getDocument = function getDocument() {
    const html = fs.readFileSync("./pdf.html", "utf8");
    const dom = new JSDOM(html);
    console.log(dom.window.document);
    return dom.window.document
};