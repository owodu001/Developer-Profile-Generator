const axios = require("./gitInfo.js");
const domModifier = require("./domModifier.js");
const pdfCreator = require("./pdfCreator.js");

const myProfile = "owodu001";
// const document = domModifier.getDocument();
// const html = document.getElementById("find-doc").outerHTML;

// pdfCreator.createPdf(html)
// console.log(document.getElementById("find-doc").outerHTML)
axios.getProfile();