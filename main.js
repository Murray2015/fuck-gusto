async function processData(recipeObj) {
    const id = recipeObj.results[0].id
    const res = await fetch(`https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=29f96c91e7b64bd690b4d3bbb695847b`)
    const recipe = await res.json();
    recipe[0].steps.forEach(x => console.log(x.step))
}

async function requestRecipeId(diet = null, intolerances = null, cusine = null) {
    // Request all recipes for a certain meal and cuisine type
    const meal = "main"; // appetizer, main course, desert
    const dietString = diet ? `&diet=${diet}` : "";
    const cusineString = cusine ? `&cuisine=${cusine}` : "";
    const intolerancesString = intolerances ? intolerances.reduce((a, c) => {
        return a + c + ","
    }, "&intolerances=").slice(0, -1) : "";
    const fetchString = `https://api.spoonacular.com/recipes/search?&instructionsRequired=true&type=${meal}` + cusineString + dietString + intolerancesString + `&apiKey=29f96c91e7b64bd690b4d3bbb695847b`
    console.log(fetchString)
    const res = await fetch(fetchString)
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