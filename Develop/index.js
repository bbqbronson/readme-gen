const inquirer = require("inquirer");
const fs = require('fs');
const axios = require("axios");
const generate = require('./utils/generateMarkdown');

// array of questions for user
const questions = [
  {
    type: "input",
    name: "title",
    message: "Title of project"
  },
  {
    type: "input",
    name: "badge",
    message: "Badge link"
  },
  {
    type: "input",
    name: "description",
    message: "Enter description"
  },
  {
    type: "input",
    name: "contents",
    message: "Table of contents"
  },
  {
    type: "input",
    name: "installation",
    message: "Installation instructions"
  },
  {
    type: "input",
    name: "usage",
    message: "Project usage"
  },
  {
    type: "input",
    name: "licence",
    message: "Project license"
  },
  {
    type: "input",
    name: "contributing",
    message: "Contributing"
  },
  {
    type: "input",
    name: "test",
    message: "Project tests"
  },
  {
    type: "input",
    name: "username",
    message: "What is your github username?"
  },
  {
    type: "input",
    name: "repo",
    message: "What is the repo link?"
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?"
  },
];

inquirer
  .prompt(questions)
  .then(function (data) {
    const queryUrl = `https://api.github.com/users/${data.username}`;

    axios.get(queryUrl).then(function (res) {

      const githubInfo = {
        githubImage: res.data.avatar_url,
        email: res.data.email,
        profile: res.data.html_url,
        name: res.data.name
      };

      fs.writeFile("README.md", generate(data, githubInfo), function (err) {
        if (err) {
          throw err;
        };

        console.log("New README file created with success!");
      });
    });

  });

function init() {

}

init();