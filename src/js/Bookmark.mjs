import ExternalServices from "./ExternalServices.mjs";
import { getLocalStorage, setLocalStorage, alertMessage } from "./utils.mjs";
import RecipeDetail from "./RecipeDetail.mjs";

const service = new ExternalServices();
const detail = new RecipeDetail(".recipeDetail");
const favorites = getLocalStorage("bookmark");

function updateBookmark(e){
    let id = e.target.getAttribute("data-id");
    let newList = favorites.filter(item => item.idMeal != id);
    alertMessage("Successfully removed from bookmark!");
    setLocalStorage("bookmark", newList);
}

export class Bookmark {
    constructor(){}
    async init(){
        this.displayRecipeList(favorites)
    }
    reset(){
        document.querySelector('.recipeList').innerHTML = "";
        document.querySelector('.recipeDetail').innerHTML = "";
        document.querySelector('.recipeMessage').innerHTML = "";
        document.querySelector('.removeBookmark').innerHTML = "";
    }
    displayRecipeList(list) {
        this.reset();
        let recipeMessage = document.querySelector('.recipeMessage');
        let recipeList = document.querySelector('.recipeList');
        let message = document.createElement('h3');
        message.textContent = "Click image to see the details";
        recipeMessage.appendChild(message);
        list.forEach(recipe => {
            let article = document.createElement('article');
            let h4 = document.createElement('h4');
            h4.textContent = recipe.strMeal;
            let img = document.createElement('img');
            img.setAttribute('src', `${recipe.strMealThumb}`);
            img.setAttribute('alt', `${recipe.strMeal}`);
            img.className = 'recipeImage';
            img.id = `${recipe.idMeal}`;
            article.appendChild(h4);
            article.appendChild(img);
            recipeList.appendChild(article);
        })
        document.querySelectorAll('.recipeImage').forEach((recipe) =>{
           recipe.addEventListener("click", this.getRecipe);
        })
        
    }

    async getRecipe(e){
        let id = e.target.getAttribute("id");
        document.querySelector('.recipeList').innerHTML = "";
        document.querySelector('.recipeDetail').innerHTML = "";
        document.querySelector('.recipeMessage').innerHTML = `<a href="/bookmark/index.html">＜Back to bookmark list</a>`;
        document.querySelector('.removeBookmark').innerHTML = `<button id="unFavorite" data-id="${id}">Remove from Bookmark</button>`
        let recipe = favorites.find(item => item.idMeal === id);
        detail.init(recipe);
        document.getElementById('unFavorite').addEventListener('click', updateBookmark);

    }

}