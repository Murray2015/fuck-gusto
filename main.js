async function processData(recipeObj) {
    const id = recipeObj.results[0].id
    const res = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=29f96c91e7b64bd690b4d3bbb695847b`)
    const recipe = await res.json();
    recipe[0].steps.forEach(x => console.log(x.step))
}

async function requestRecipeId() {
    // Request all recipes for a certain meal and cuisine type
    const meal = "main"; // appetizer, main course, desert
    const cuisine = "italian"
    const res = await fetch(`https://api.spoonacular.com/recipes/search?&instructionsRequired=true&type=${meal}&cuisine=${cuisine}&apiKey=29f96c91e7b64bd690b4d3bbb695847b`)
    const recipe = await res.json();
    console.log(recipe)
    processData(recipe);
}

// async function 

// requestRecipeId()

const recipeBtn = document.querySelector("#get-recipes")
recipeBtn.addEventListener("click", fetchRecipeBtn);

function fetchRecipeBtn() {
    const diet = document.querySelector('input[name="diet"]:checked').value
    const intolerances = Array.from(document.querySelectorAll('input[name="intolerances"]')).filter(x => x.checked).map(x => x.value)
    const cusine = document.querySelector('input[name="cusine"]:checked').value
    requestRecipeId(diet, intolerances, cusine);
}