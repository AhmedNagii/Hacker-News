export default function checkFav (favorites, story){
  return  favorites.some(item => item.id === story.id)
}