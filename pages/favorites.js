import view from "../utils/view.js";
import store from "../store.js";
import Story from "../components/Stroy.js";
import checkFav from "../utils/checkFav.js";



export default  function Favorites() {
  const { favorites } =  store.getState();
  const hasFavorites = favorites.length > 0;

  view.innerHTML = `<div> 
${hasFavorites? favorites.map(story =>
          Story({
            ...story,
            isFav: checkFav(favorites, story)
          })
        )
        .join("")
    : "You can add some favorites and come back"
} </div>`;

document.querySelectorAll(".favorite").forEach((favBtn) => {
    favBtn.addEventListener("click", async function () {
      const story = JSON.parse(this.dataset.story);
      const isFavorited = checkFav(favorites, story);

      store.dispatch({
        type: isFavorited ? "REMOVE_FAVORITE" : "ADD_FAVORITE",
        payload: { favorite: story },
      });

      Favorites();
    });
  });
}

