// Set initial state
let numCourses = 1;

// Get number of courses
const coursesOne = document.querySelector("#get-1-course");
const coursesThree = document.querySelector("#get-3-courses");
coursesOne.addEventListener("click", () => setCourses(1));
coursesThree.addEventListener("click", () => setCourses(3));

// Function to get the required number of recipes set by numCourses
function setCourses(num) {
  if (num !== numCourses) {
    coursesOne.classList.toggle("selectedBtn");
    coursesThree.classList.toggle("selectedBtn");
    numCourses = num;
  }
}

// Get recipe(s)

// Function to return 1 recipe

async function processData(recipeObj) {
  const id = recipeObj.results[0].id;
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${id}/analyzedInstructions?apiKey=f425a8882da9427d9fd75e19c0f1cc3c`
  );
  const recipe = await res.json();
  recipe[0].steps.forEach(x => console.log(x.step));
}

async function requestRecipeId(
  diet = null,
  intolerances = null,
  cusine = null,
  meal = "main"
) {
  // Request all recipes for a certain meal and cuisine type
  const dietString = diet ? `&diet=${diet}` : "";
  const cusineString = cusine ? `&cuisine=${cusine}` : "";
  const intolerancesString = intolerances
    ? intolerances
        .reduce((a, c) => {
          return a + c + ",";
        }, "&intolerances=")
        .slice(0, -1)
    : "";
  const fetchString =
    `https://api.spoonacular.com/recipes/search?&instructionsRequired=true&type=${meal}` +
    cusineString +
    dietString +
    intolerancesString +
    `&apiKey=f425a8882da9427d9fd75e19c0f1cc3c`;
  console.log(fetchString);
  const res = await fetch(fetchString);
  const recipe = await res.json();
  console.log(recipe);
  processData(recipe);
}

// async function

// requestRecipeId()

const recipeBtn = document.querySelector("#get-recipes");
recipeBtn.addEventListener("click", fetchRecipeBtn);

function fetchRecipeBtn() {
  const diet = document.querySelector('input[name="diet"]:checked').value;
  const intolerances = Array.from(
    document.querySelectorAll('input[name="intolerances"]')
  )
    .filter(x => x.checked)
    .map(x => x.value);
  const cusine = document.querySelector('input[name="cusine"]:checked').value;
  // Fetch recipes
  if (numCourses === 1) {
    requestRecipeId(diet, intolerances, cusine, "main");
  } else if (numCourses === 3) {
    requestRecipeId(diet, intolerances, cusine, "appetizer");
    requestRecipeId(diet, intolerances, cusine, "main");
    requestRecipeId(diet, intolerances, cusine, "desert");
  }
}
