function processData(recipePromise) {
    console.log(recipePromise)
    console.log(recipePromise.results[0].id)
}

async function requestRecipeId() {
    // Request all recipes for a certain meal and cuisine type
    const meal = "appetizer";
    const cuisine = "italian"
    const res = await fetch(`https://api.spoonacular.com/recipes/search?&instructionsRequired=true&type=${meal}&cuisine=${cuisine}&apiKey=29f96c91e7b64bd690b4d3bbb695847b`)
    const recipe = await res.json();
    processData(recipe);
}

// async function 

requestRecipeId()

// fetch("https://api.spoonacular.com/food/products/search?query=yogurt&number=2&apiKey=29f96c91e7b64bd690b4d3bbb695847b").then(res => res.json()).then(data => console.log(data))