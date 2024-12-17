import { setLocalStorage, getLocalStorage, alertMessage } from "./utils.mjs";

function RecipeDetailsTemplate(recipe, ingredients, instructions) {
    return `<section class="recipe-detail"> <h3>${recipe.strMeal}</h3>
    <div class="recipe-detail__add">
    <button id="favorite" data-id="${recipe.idMeal}">Add to Bookmark</button>
    </div>
    <img class="divider"
      src="${recipe.strMealThumb}"
      alt="${recipe.strMeal}"
    />
    <h3>Ingredients</h3>
    <div class="recipe-ingredients">${ingredients}</div>
    <h3>Instructions</h3>
    <a href="${recipe.strYoutube}">YouTube</a>
    <p class="recipe-instructions">${instructions}</p>
    </section>`;
}




export default class RecipeDetail {
    constructor(render = "main"){
        this.recipe = "";
        this.ingredients = "";
        this.instruction = "";
        this.render = render;
    }
    async init(recipe) {
        this.recipe = recipe;
        this.cleanIngredients();
        this.cleanInstruction();
        this.renderRecipeDetails(this.render);
        document.getElementById('favorite')
          .addEventListener('click', this.addBookmark.bind(this));
    }
    
    cleanIngredients(){
        let element ="";
        let ingredient = "";
        let measure = "";
        let i = 1;
        while(true){
            if(i >= 21){
                break;
            }
            ingredient = this.recipe[`strIngredient${i}`];
            measure = this.recipe[`strMeasure${i}`];
            if(ingredient == ""|| ingredient == null){
                break;
            }
            element += `<li>${ingredient} : ${measure}</li>`;
            i++;
        }
        this.ingredients = element;
    }

    cleanInstruction(){
        let instruction = this.recipe["strInstructions"];
        let cleaned = instruction.replace(/\r\n/g, "<br>");
        this.instruction = cleaned;
    }

    async addBookmark(){

        let currentBookmark = await getLocalStorage("bookmark");
        let recipes = [];
        if (currentBookmark != null) {
            recipes = currentBookmark;
        }
        const isAlreadyAdded = currentBookmark.some(item => item.idMeal === this.recipe.idMeal);
        if(isAlreadyAdded){
            alertMessage(`${this.recipe.strMeal} is already added to bookmark!`);
        }else {
            recipes.push(this.recipe);
            setLocalStorage("bookmark", recipes);
            alertMessage(`${this.recipe.strMeal} added to bookmark!`);
        }
    }
    renderRecipeDetails(select){
        const element = document.querySelector(select);
        element.insertAdjacentHTML(
        "beforeend",
        RecipeDetailsTemplate(this.recipe, this.ingredients, this.instruction)
        );
    }

}