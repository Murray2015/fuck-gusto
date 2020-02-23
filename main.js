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

// fetch("https://api.spoonacular.com/food/products/search?query=yogurt&number=2&apiKey=29f96c91e7b64bd690b4d3bbb695847b").then(res => res.json()).then(data => console.log(data))