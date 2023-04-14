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
        <span class = "star">
          <i class="bi bi-star"></i>
        </span>
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
  `);
}

// <i class="bi bi-star-fill"></i>


/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  //delete all stories in dom from previous load
  $allStoriesList.empty();

  // console.log(storyList.stories);
  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    // const $star = $("story:first-child");
    // $star.on("click", currentUser.addFavorite);
    $allStoriesList.append($story);
  }

  //show is built in method, element previously hidden by hidePageComponents
  $allStoriesList.show();
}

/** TODO: */

async function submitStoryForm(evt) {
  console.debug("submitStoryForm", evt);
  evt.preventDefault();

  // grab the username and password
  const author = $("#author").val();
  const title = $("#title").val();
  const storyUrl = $("#story-url").val();

  //console.log("author", $author, "title", $title, "story-url", $storyUrl)

  const newStory = {
    author: author,
    title: title,
    url: storyUrl,
  };

  $submitStoryForm.hide();
  //TODO: potential problem if not logged in, fix elsewhere probably by hiding
  //submit until login completed

  const storyToAdd = await storyList.addStory(currentUser, newStory);
  // console.log("storyToAdd", storyToAdd)
  let $storyMarkup = generateStoryMarkup(storyToAdd);
  $allStoriesList.prepend($storyMarkup);
  $allStoriesList.show();

}

$submitStoryForm.on("submit", submitStoryForm);
//$addStoryForm

// $allStoriesList.on("click", currentUser.addFavorite(evt));

//When someone clicks on a star, we want to know which list item that star is on, so
// we can get the story associated with that id
$storiesContainer.on("click", ".star", toggleFavorite);

function toggleFavorite(evt){

  const $target = $(evt.target);
  const id = $target.closest("li").attr("id");
  getStoryFromId(id);

}

async function getStoryFromId(id){
  const response = await axios({
    url: `${BASE_URL}/stories/${id}`,
    method: "GET",
    data: { storyId: id},
  });

  console.log(response)
  currentUser.addFavorite(response.data.story);
  // return response.data;
}
//get a story from the api using the id we have
//pass that story to a function called addFavorite/remove

