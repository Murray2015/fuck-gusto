/////////////////////////////////////////////////////////
////////////////////// Set up page //////////////////////
/////////////////////////////////////////////////////////

// Set initial state
let numCourses = 1;

// Get number of courses
const coursesOne = document.querySelector("#get-1-course");
const coursesThree = document.querySelector("#get-3-courses");
coursesOne.addEventListener("click", () => setCourses(1));
coursesThree.addEventListener("click", () => setCourses(3));

// Function to handle number of courses button click
function setCourses(num) {
  if (num !== numCourses) {
    coursesOne.classList.toggle("selectedBtn");
    coursesThree.classList.toggle("selectedBtn");
    numCourses = num;
  }
}

/////////////////////////////////////////////////////////
///////////////////// Get recipe(s) /////////////////////
/////////////////////////////////////////////////////////

// Button and handler to get recipes
const recipeBtn = document.querySelector("#get-recipes");
recipeBtn.addEventListener("click", fetchRecipeBtn);

// Function to hancle get recipe button click
function fetchRecipeBtn() {
  // Get dietary requirements from radio buttons
  const diet = document.querySelector('input[name="diet"]:checked').value;
  // Get all food intolerances from checkboxes
  const intolerances = Array.from(
    document.querySelectorAll('input[name="intolerances"]')
  )
    .filter(x => x.checked)
    .map(x => x.value);
  // Get culinary choice from radio buttons
  const cusine = document.querySelector('input[name="cusine"]:checked').value;
  // Call function to request recipe IDs
  if (numCourses === 1) {
    requestRecipeId(diet, intolerances, cusine, "main");
  } else if (numCourses === 3) {
    requestRecipeId(diet, intolerances, cusine, "appetizer");
    requestRecipeId(diet, intolerances, cusine, "main");
    requestRecipeId(diet, intolerances, cusine, "desert");
  }
  // Change recipe button text to reflect getting a new recipe
  recipeBtn.innerText = "Get a different recipe!";
}

// Function to get recipe IDs
async function requestRecipeId(
  diet = null,
  intolerances = null,
  cusine = null,
  meal = "main"
) {
  // Make fetchString with dietary requirements, intolerances and cusine choice.
  const dietString = diet ? `&diet=${diet}` : "";
  const intolerancesString = intolerances
    ? intolerances
        .reduce((a, c) => {
          return a + c + ",";
        }, "&intolerances=")
        .slice(0, -1)
    : "";
  const cusineString = cusine ? `&cuisine=${cusine}` : "";
  const fetchString = `https://api.spoonacular.com/recipes/search?&instructionsRequired=true&type=${meal}${cusineString}${dietString}${intolerancesString}&apiKey=f425a8882da9427d9fd75e19c0f1cc3c`;
  // Send fetch request for object with recipe IDs in it
  const res = await fetch(fetchString);
  const recipe = await res.json();
  // Call function to choose a random recipe from the object, and get the steps to make it
  processData(recipe);
}

// Function to randomly choose 1 recipe and request the steps to make it.
async function processData(recipeObj) {
  // Generate a random number as index to choose the recipe with.
  const randRecipeInd = Math.floor(Math.random() * recipeObj.results.length);
  // Choose the recipe with the random number, and get it's ID.
  const id = recipeObj.results[randRecipeInd].id;
  // Fetch the recipe steps
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=f425a8882da9427d9fd75e19c0f1cc3c`
  );
  const recipe = await res.json();
  recipe[0].steps.forEach(x => console.log(x.step));
}
