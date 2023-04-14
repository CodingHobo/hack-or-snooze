"use strict";

// const FORM_CONTAINER = document.querySelector(".account-forms-container");
// const NAV_BAR_DIV = document.querySelector(".navbar-brand");

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  //delete all stories in dom from previous load
  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  //show is built in method, element previously hidden by hidePageComponents
  $allStoriesList.show();
}

function submitStoryForm(evt){

  console.debug("submitStoryForm", evt);
  evt.preventDefault();

  // grab the username and password
  const $author = $("#author").val();
  const $title = $("#title").val();
  const $storyUrl = $("#story-url").val();

  console.log("author", $author, "title", $title, "story-url", $storyUrl)

  // // User.login retrieves user info from API and returns User instance
  // // which we'll make the globally-available, logged-in user.
  // currentUser = await User.login(username, password);

  // $loginForm.trigger("reset");

  // saveUserCredentialsInLocalStorage();
  // updateUIOnUserLogin();


  //TODO: call addStory(user, newStory)
  //TODO: put story on page
}

$submitStoryForm.on("submit", submitStoryForm);
//$addStoryForm
