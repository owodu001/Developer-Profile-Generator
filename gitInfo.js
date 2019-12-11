const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdfCreator = require("./pdfCreator.js");
const domModifier = require("./domModifier.js");


// const myProfile = "owodu001";
exports.getProfile = function getProfile() {
    inquirer
        .prompt({
            message: "Enter your GitHub username:",
            name: "username"
        })
        .then(function({ username }) {
            const queryUrl = `https://api.github.com/users/${username}`;



            // const queryUrl = `https://api.github.com/users/${username}`;

            console.log(queryUrl)
            axios.get(queryUrl).then(function(res) {
                console.log("returned from call")
                    // console.log(res.data[res.data.length - 1]);
                console.log(Object.keys(res.data));
                // const repoNames = res.data.map(function(repo) {
                //     return ;
                // });

                const response = res.data;
                const googleMapsUrl = `https://www.google.com/maps/place/${response.location}`
                const getStars = response.stargazers_count;
                const result = {
                    name: response.name,
                    profileImage: response.avatar_url,
                    profileLink: response.html_url,
                    location: response.location,
                    googleMapsUrl: googleMapsUrl,
                    bio: response.bio,
                    publicRepos: response.public_repos,
                    followers: response.followers,
                    following: response.following,
                    GitHubStars: response.stargazers_count,
                };


                const colors = {
                    green: {
                        wrapperBackground: "#E6E1C3",
                        headerBackground: "#C1C72C",
                        headerColor: "black",
                        photoBorderColor: "#black"
                    },
                    blue: {
                        wrapperBackground: "#5F64D3",
                        headerBackground: "#26175A",
                        headerColor: "white",
                        photoBorderColor: "#73448C"
                    },
                    pink: {
                        wrapperBackground: "#879CDF",
                        headerBackground: "#FF8374",
                        headerColor: "white",
                        photoBorderColor: "#FEE24C"
                    },
                    red: {
                        wrapperBackground: "#DE9967",
                        headerBackground: "#870603",
                        headerColor: "white",
                        photoBorderColor: "white"
                    }
                };

                const document = domModifier.getDocument();

                const headStyle = document.querySelector("head");

                const style = `<head>
                        <meta charset="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
                        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
                        <title>Document</title>
                        <style>
                            @page {
                              margin: 0;
                            }
                           *,
                           *::after,
                           *::before {
                           box-sizing: border-box;
                           }
                           html, body {
                           padding: 0;
                           margin: 0;
                           }
                           html, body, .wrapper {
                           height: 100%;
                           }
                           .wrapper {
                           background-color: ${colors.pink.wrapperBackground};
                           padding-top: 100px;
                           }
                           body {
                           background-color: white;
                           -webkit-print-color-adjust: exact !important;
                           font-family: 'Cabin', sans-serif;
                           }
                           main {
                           background-color: #E9EDEE;
                           height: auto;
                           padding-top: 30px;
                           }
                           h1, h2, h3, h4, h5, h6 {
                           font-family: 'BioRhyme', serif;
                           margin: 0;
                           }
                           h1 {
                           font-size: 3em;
                           }
                           h2 {
                           font-size: 2.5em;
                           }
                           h3 {
                           font-size: 2em;
                           }
                           h4 {
                           font-size: 1.5em;
                           }
                           h5 {
                           font-size: 1.3em;
                           }
                           h6 {
                           font-size: 1.2em;
                           }
                           .photo-header {
                           position: relative;
                           margin: 0 auto;
                           margin-bottom: -50px;
                           display: flex;
                           justify-content: center;
                           flex-wrap: wrap;
                           background-color: ${colors.blue.headerBackground};
                           color: ${colors.green.headerColor};
                           padding: 10px;
                           width: 95%;
                           border-radius: 6px;
                           }
                           .photo-header img {
                           width: 250px;
                           height: 250px;
                           border-radius: 50%;
                           object-fit: cover;
                           margin-top: -75px;
                           border: 6px solid ${colors.red.photoBorderColor};
                           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
                           }
                           .photo-header h1, .photo-header h2 {
                           width: 100%;
                           text-align: center;
                           }
                           .photo-header h1 {
                           margin-top: 10px;
                           }
                           .links-nav {
                           width: 100%;
                           text-align: center;
                           padding: 20px 0;
                           font-size: 1.1em;
                           }
                           .nav-link {
                           display: inline-block;
                           margin: 5px 10px;
                           }
                           .workExp-date {
                           font-style: italic;
                           font-size: .7em;
                           text-align: right;
                           margin-top: 10px;
                           }
                           .container {
                           padding: 50px;
                           padding-left: 100px;
                           padding-right: 100px;
                           }
                  
                           .row {
                             display: flex;
                             flex-wrap: wrap;
                             justify-content: space-between;
                             margin-top: 20px;
                             margin-bottom: 20px;
                           }
                  
                           .card {
                             padding: 20px;
                             border-radius: 6px;
                             background-color: ${colors.pink.headerBackground};
                             color: ${colors.pink.headerColor};
                             margin: 20px;
                           }
                           
                           .col {
                           flex: 1;
                           text-align: center;
                           }
                  
                           a, a:hover {
                           text-decoration: none;
                           color: inherit;
                           font-weight: bold;
                           }
                  
                           @media print { 
                            body { 
                              zoom: .75; 
                            } 
                           }
                        </style>
                        </head>`;

                headStyle.innerHTML = style;


                const divName = document.querySelector("body");
                // divName.innerHTML = result.name;
                // const imgSrc = `<img src="${result.profileImage}"/>`;

                const imgSrc = `<body>

        <div class="container">
            <div class="row">
                <div class="photo-header img col mt-5 d-flex justify-content-center">
                    <img src="${result.profileImage}" />
                </div>
            </div>
            <div class="photo-header row">
                <div class="col mt-5 d-flex justify-content-center">
                    <h3>Hi!</h3>
                </div>
            </div>
            <div class="row">
                <div class="col d-flex justify-content-center">
                    <h3>My name is ${response.name}</h3>
                </div>
            </div>
            <div class="row">
                <div class="col d-flex justify-content-center">
                    <p>Currently @ ${response.location}</p>
                </div>
            </div>
            <div class="row">
                <div class="col d-flex justify-content-center">
                    <div class="list">
                        <a href="${googleMapsUrl}">Currently @ ${response.location}</a>
                        <a>${response.bio}</a>
                        <a></a>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col mb-5 mt-5 d-flex justify-content-center">
                    <h4>${response.bio}</h4>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <div class="card col mt-5 d-flex justify-content-center">
                        <h4>Public Repositories: ${response.public_repos}</h4>
                    </div>
                    <div class="card col mt-5 d-flex justify-content-center">
                        <h4>Followers: ${response.followers}</h4>
                    </div>
                    <div class="w-100"></div>
                    <div class="card col mt-5 d-flex justify-content-center">
                        <h4>Following: ${response.following}</h4>
                    </div>
                    <div class="card col mt-5 d-flex justify-content-center">
                        <h4>GitHub Stars: ${response.stargazers_count}</h4>
                    </div>
                </div>
            </div>
    
    
        </div>
    </body>`;

                console.log(imgSrc);
                divName.innerHTML = imgSrc;

                const html = document.querySelector("HTML").outerHTML;


                pdfCreator.createPdf(html);
                // const content = `<i>${result.name}</i>`;
                // pdfCreator.generate(content);

                // console.log(JSON.stringify(result));


                // fs.writeFile("repos.txt", repoNameStr, function(err) {
                //     if (err) {
                //         throw err;
                //     }
                //     console.log(`Saved ${repoNames.length} repos`);
                // });
            }).catch(function(err) {
                console.log("There was an error.");
                console.log(err);
            });
        })
};

// inquirer
//     .prompt({
//         message: "Enter your GitHub username:",
//         name: "username"
//     })
//     .then(getProfile);


// To do:
// The user will be prompted for a favorite color, which will be used as the background color for cards.

// The PDF will be populated with the following:

// * Profile image

// * User name
// * Links to the following:
//   * User location via Google Maps
//   * User GitHub profile
//   * User blog
// * User bio
// * Number of public repositories
// * Number of followers
// * Number of GitHub stars
// * Number of users following

// Following the [common templates for user stories](https://en.wikipedia.org/wiki/User_story#Common_templates), we can frame this challenge as follows:

// ```
// AS A product manager

// I WANT a developer profile generator

// SO THAT I can easily prepare reports for stakeholders
// ```

// Refer to the [design mockup](./Assets/09-NodeJS-homework-demo.pdf).

// ## Business Context

// When preparing a report for stakeholders, it is important to have up-to-date information about members of the development team. Rather than navigating to each team member's GitHub profile, a command-line application will allow for quick and easy generation of profiles in PDF format.

// ## Minimum Requirements

// * Functional, deployed application.

// * GitHub repository with a unique name and a README describing project.

// * The application generates a PDF resume from the user provided GitHub profile.

// * The generated resume includes a bio image from the user's GitHub profile.

// * The generated resume includes the user's location and a link to their GitHub profile.

// * The generated resume includes the number of: public repositories, followers, GitHub stars and following count.

// * The background color of the generated PDF matches the color that the user provides.

// ```
// GIVEN the developer has a GitHub profile

// WHEN prompted for the developer's GitHub username and favorite color

// THEN a PDF profile is generated
// ```
// - - -

// ## Commit Early and Often

// One of the most important skills to master as a web developer is version control. Building the habit of committing via Git is important for two reasons:

// * Your commit history is a signal to employers that you are actively working on projects and learning new skills.

// * Your commit history allows you to revert your code base in the event that you need to return to a previous state.

// Follow these guidelines for committing:

// * Make single-purpose commits for related changes to ensure a clean, manageable history. If you are fixing two issues, make two commits.

// * Write descriptive, meaningful commit messages so that you and anyone else looking at your repository can easily understand its history.

// * Don't commit half-done work, for the sake of your collaborators (and your future self!).

// * Test your application before you commit to ensure functionality at every step in the development process.

// We would like you to have more than 200 commits by graduation, so commit early and often!

// ## Submission on BCS

// You are required to submit the following:

// * An animated GIF demonstrating the app functionality

// * A generated PDF of your GitHub profile

// * The URL of the GitHub repository;