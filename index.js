$(document).ready(function (){
});

function searchRepositories() {
  const searchTerms = $('#searchTerms').val()
  $.get(`https://api.github.com/search/repositories?q=${searchTerms}`, function(data) {
    $("#results").html(showResults(data));
  }).fail(displayError());
}

function showResults(data) {
  return data.items.map(item =>
    `<p> ${item.full_name} </p>
    <p> <strong> Repository Name: ${item.name} </strong> </p>
    <p> Description: ${item.description} </p>
    <p>Link to Repository: <a href="${item.url}">Repo Url</a> </p>
    <p>Owner Login: ${item.owner.login} </p>
    <p>Owner Avatar: <br> <img src=${item.owner.avatar_url}> </p>
    <p>Owner Profile Page: <a href="${item.owner.url}">Profile</a> </p>
    <p><a href="#" data-repository="${item.name}" data-owner="${item.owner.login}" onClick="showCommits(this)">Show Commits</a></p>`
   )
  }

  function showCommits(data) {
    const repository = data.dataset.repository
    const owner = data.dataset.owner

    $.get(`https://api.github.com/repos/${owner}/${repository}/commits`, function(data) {
    $("#details").html(formatCommits(data));
    }).fail(displayError());
  }

  function formatCommits(data) {
    console.log(data)
    return data.map(d=>
      `<p> Author Name: ${d.commit.author.name}</p>
      <p> Author Login: ${d.author.login} </p>
      <p>Author Avatar: <br> <img src=${d.author.avatar_url}> </p>
      <p>SHA: ${d.sha} </p>`
    )
}

function displayError() {
  $("#errors").html("There was an error. Please try again.");
}

// Create a "Search Repositories" link that calls a searchRepositories function on click, takes the value of a searchTerms text input, and queries the GitHub repository search API.

// Add a "Show Commits" link to each repository result that will call a showCommits function that gets the repository's commits from the GitHub API and display them in the details div. For each commit, list the SHA, the author, the author's login, and the author's avatar as an image.

// Handle errors on each API call. If $.get fails, call a function displayError and display "I'm sorry, there's been an error. Please try again." in the errors div. Hint: You can test your error callbacks by turning off Wi-Fi or temporarily changing the URL you use in the $.get request.
