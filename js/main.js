(function () {
  'use strict';

  // Use Github API Token for development purposes
  // Will not be present in production
  var headers = {};
  if (GITHUB_TOKEN) {
    // Set the AJAX header to send the token
    headers['Authorization'] = 'token ' + GITHUB_TOKEN;
  }
  function fetchContent (url, headers, callback) {
    fetch(url, {headers: headers}).then(function (response) {
      response.json().then(function (response) {
        console.groupCollapsed('json');
        console.log(response);
        console.table(response);
        console.groupEnd();
        callback(response);
        return null;
      });
      return null;
    });
    return null;
  }
  function buildProfile (response) {
    logProfile(response);
    console.log(response.name);
    // Parent Container
    var profile = document.getElementById('profile');
    profile.innerHTML = `
    <img src="${response.avatar_url}" alt="me" class="profile__image" width="230px" height="230px">
    <h2 class="profile__name">${response.name}</h2>
    <h3 class="profile__username">${response.login}</h3>
    `; }
  function buildRepos (response) {
    logRepos(response);
    var repositories = document.getElementById('repositories');
    for (var i = 0; i < response.length; i++) {
      var repository = response[i]
      var repositoryContainer = document.createElement('li');
      repositoryContainer.setAttribute('class', 'repositories__repository repository');
      var repositoryTime = moment(repository.updated_at).fromNow();
      repositoryContainer.innerHTML = `
      <h3 class="respository__title"><a href="${repository.html_url}">${repository.name}</a></h3>
      <p class="repository__desciption">${repository.description}</p>
      <time>${repositoryTime}</time>
      <p class="respository__language">${repository.language}</p>
      `
      repositories.appendChild(repositoryContainer);
    }
  }
  function buildOrgs (response) {

  }
  function logProfile (response) {
    console.groupCollapsed('profile object');
    for (var property in response) {
      console.log(property);
    }
    console.groupEnd();
  }
  function logRepos (response) {
    console.groupCollapsed('repos array');
    for (var i = 0; i < response.length; i++) {
      console.log(response[i]);
      console.log(moment(response.updated_at).fromNow());
    }
    console.groupEnd();
  }
  function logOrgs (response) {
    console.groupCollapsed('orgs array');
    console.log('still empty');
    console.groupEnd();
  }
  fetchContent('https://api.github.com/users/jlarmstrongiv', headers, buildProfile);
  fetchContent('https://api.github.com/users/jlarmstrongiv/repos?sort=updated', headers, buildRepos);
  fetchContent('https://api.github.com/users/jlarmstrongiv/organizations', headers, buildOrgs)
}());
