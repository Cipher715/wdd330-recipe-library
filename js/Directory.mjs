import ExternalServices from "./ExternalServices.mjs";
import RecipeDetail from "./RecipeDetail.mjs";

const detail = new RecipeDetail(".recipeDetail");
const service= new ExternalServices();

export default class Directory {
    constructor(ingredients, categories, areas){
        this.ingredients = ingredients;
        this.categories = categories;
        this.areas = areas;
    }
    async init(){
        this.getFilters();
    }
    reset(){
        document.querySelector('.recipeList').innerHTML = "";
        document.querySelector('.recipeDetail').innerHTML = "";
        document.querySelector('.recipeMessage').innerHTML = "";
    }
    getFilters(){
        const ingredientSelector = document.querySelector("#ingre");
        const categorySelector = document.querySelector("#category");
        const areaSelector = document.querySelector("#area");
        this.ingredients.forEach(ingredient => {
            let option = document.createElement('option');
            option.setAttribute('value', `${ingredient.strIngredient}`);
            option.textContent = `${ingredient.strIngredient}`;
            ingredientSelector.appendChild(option);
        });
        this.categories.forEach(category => {
            let option = document.createElement('option');
            option.setAttribute('value', `${category.strCategory}`);
            option.textContent = `${category.strCategory}`;
            categorySelector.appendChild(option);
        });
        this.areas.forEach(area => {
            let option = document.createElement('option');
            option.setAttribute('value', `${area.strArea}`);
            option.textContent = `${area.strArea}`;
            areaSelector.appendChild(option);
        });
        ingredientSelector.addEventListener("change", () => {this.getFilteredIngredient()});
        categorySelector.addEventListener("change", () => {this.getFilteredCategory()});
        areaSelector.addEventListener("change", () => {this.getFilteredArea()});
    }

    async getFilteredIngredient(){
        const ingredient = document.querySelector('#ingre').value;
        document.querySelector('#category').value = "";
        document.querySelector('#area').value  = "";
        const filteredRecipe = await service.filterListByIngredient(ingredient);
        this.displayRecipeList(filteredRecipe);
    }

    async getFilteredCategory(){
        document.querySelector('#ingre').value = "";
        const category = document.querySelector('#category').value;
        document.querySelector('#area').value = "";
        const filteredRecipe = await service.filterListByCategory(category);
        this.displayRecipeList(filteredRecipe);
    }

    async getFilteredArea(){
        document.querySelector('#ingre').value = "";
        document.querySelector('#category').value = "";
        const area = document.querySelector('#area').value;
        const filteredRecipe = await service.filterListByArea(area);
        this.displayRecipeList(filteredRecipe);
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
        document.querySelector('.recipeMessage').innerHTML = "";
        const recipe = await service.getDetail(id);
        detail.init(recipe);
    }

}