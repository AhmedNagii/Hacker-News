import view from "../utils/view.js";
import Story from "../components/Stroy.js";
import baseUrl from "../utils/baseUrl.js";
import store from "../store.js";
import checkFav from "../utils/checkFav.js";

export default async function Stories(path) {
  const { favorites } = store.getState();
  console.log(favorites);
  const stories = await getStories(path);
  const hasStories = stories.length > 0;

  view.innerHTML = `<div> 
  ${
    hasStories
      ? stories
          .map((story, index) =>
            Story({
              ...story,
              index: index + 1,
              isFav: checkFav(favorites, story),
            })
          )
          .join("")
      : "nothing to show"
  } </div>`;

  document.querySelectorAll(".favorite").forEach((favBtn) => {
    favBtn.addEventListener("click", async function () {
      const story = JSON.parse(this.dataset.story);
      const isFavorited = checkFav(favorites, story);

      store.dispatch({
        type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
        payload: { favorite: story },
      });

      await Stories(path);
    });
  });
}

async function getStories(path) {
  const isHomeRoute = path === "/";
  const isNewRoute = path === "/new";

  if (isHomeRoute) {
    path = "/news";
  } else if (isNewRoute) {
    path = "/newest";
  }

  const response = await fetch(`${baseUrl}${path}`);
  const stories = await response.json();
  return stories;
}
