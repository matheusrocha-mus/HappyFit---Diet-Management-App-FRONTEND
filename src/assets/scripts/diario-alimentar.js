let diaryUserId;

if (userData.role == "USER")
    diaryUserId = userData.id;
else if (userData.role == "NUTRITIONIST")
    diaryUserId = parseInt(localStorage.getItem('selectedUserId'));

const apiURL = `${API_URL}/user/${diaryUserId}`;

let editMode = false;

let profile = {};
let diet = {};
let diary = {};
let userMeals = [];
let foodOptions = [];
let docMeals = [];

function loadUserMeal (mealsList, meal, foods) {
    createMeal(mealsList, `meal${meal.id}`, meal.name);
    docMeals.push(document.querySelector("#meals-list .meal:last-child"));

    for (let food of foods) {
        const foodsList = document.getElementById(`meal${meal.id}`).querySelector(".foods-list");
        createFood(foodsList, `food${food.id}`);

        const foodElement = document.getElementById(`food${food.id}`);
        foodElement.querySelector(".food-dropdown").classList.add("d-none");

        // Gambiarra pra resolver o problema de não conseguir retornar a msm foodOption duas vezes
        if (typeof food.foodOption !== 'object' && food.foodOption !== null) {
            food.foodOption = foodOptions.find((item) => item.id === food.foodOption);
        }

        finishedFood (foodElement, `food${food.id}`, food.foodOption, food.quantity);
    }
}

function createMeal (mealsList, mealId, mealName) {
    const meal = document.createElement("li");
    meal.className = "meal list-group-item";
    meal.id = mealId;
    meal.innerHTML = `
    <input type="text" placeholder="Enter meal name" value="${mealName}" disabled class="meal-title form-control-dark fs-3 text-black">
    <ul class="foods-list list-group w-100 mt-3">
        <!--Generated foods will be appended here-->
    </ul>
    <div class="d-flex justify-content-evenly w-100 mt-3">
        <button class="edit-mode add-food btn btn-dark">Adicionar Alimento</button>
        <button class="edit-mode save-meal btn btn-success">Salvar Refeição</button>
    </div>
    <div class="meal-total container-fluid mt-3">
        <h3>Total:</h3>
        <div class="row">
            <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center">
                <div class="pe-2">Calorias:</div>
                <div class="meal-calories"></div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center">
                <div class="pe-2">Proteínas:</div>
                <div class="meal-proteins"></div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center">
                <div class="pe-2">Carboidratos:</div>
                <div class="meal-carbs"></div>
            </div>
            <div class="col-12 col-sm-6 col-md-3 d-flex align-items-center">
                <div class="pe-2">Gorduras:</div>
                <div class="meal-fats"></div>
            </div>
        </div>
    </div>
    `;
    mealsList.appendChild(meal);

    if (!editMode) meal.querySelectorAll(".edit-mode").forEach((item) => { item.classList.add("d-none"); });
}

function createFood (foodsList, foodId) {
    const food = document.createElement("li");
    food.className = "food container-fluid list-group-item list-group-item-dark p-4 rounded";
    food.id = foodId;
    food.innerHTML = `
    <div class="food-dropdown row">
        <div class="col-12 col-md-6 col-lg-8">
            <div class="food-options-dropdown dropdown col-12 col-sm-10 w-100">
                <button class="edit-mode btn btn-secondary dropdown-toggle w-100" id="${foodId}-dropdown-button" data-bs-toggle="dropdown" aria-expanded="false">Opções de Alimentos
                    <div class="dropdown-menu dropdown-menu-dark row w-100" aria-labelledby="${foodId}-dropdown-button">
                        <div class="container-fluid">
                            <div class="food-options-row row">
                                <!--Get options from foodData.json-->
                            </div>
                        </div>
                    </div>
                </button>
            </div>
        </div>
        <div class="col-6 col-md-3 col-lg-2">
            <button class="edit-mode create-new-food btn btn-primary w-100" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path d="M435.478-275.478h89.044v-160h160v-89.044h-160v-160h-89.044v160h-160v89.044h160v160ZM480-60.782q-87.522 0-163.906-32.96-76.385-32.96-132.888-89.464-56.504-56.503-89.464-132.888Q60.782-392.478 60.782-480t32.96-163.906q32.96-76.385 89.464-132.888 56.503-56.504 132.888-89.464 76.384-32.96 163.906-32.96t163.906 32.96q76.385 32.96 132.888 89.464 56.504 56.503 89.464 132.888 32.96 76.384 32.96 163.906t-32.96 163.906q-32.96 76.385-89.464 132.888-56.503 56.504-132.888 89.464Q567.522-60.782 480-60.782Zm0-106.001q131.739 0 222.478-90.739T793.217-480q0-131.739-90.739-222.478T480-793.217q-131.739 0-222.478 90.739T166.783-480q0 131.739 90.739 222.478T480-166.783ZM480-480Z"/>
                </svg> Criar Alimento
            </button>
        </div>
        <div class="col-6 col-md-3 col-lg-2">
            <button class="edit-mode delete-food btn btn-danger w-100" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                </svg> Deletar Alimento
            </button>
        </div>
    </div>
    `;
    foodsList.appendChild(food);

    const foodOptionsRow = food.querySelector(".food-options-row");
    let foodOptionsArray = foodsList.querySelectorAll(".food-info-name");
    if (foodOptionsArray.length === 0) {
        foodOptions.forEach(foodOption => {
            const foodOptionsColumn = document.createElement("div");
            foodOptionsColumn.className = "col-12 col-sm-6 col-lg-4 col-xl-3"
            foodOptionsRow.appendChild(foodOptionsColumn);
            const foodOptionElement = document.createElement("a");
            foodOptionElement.className = "dropdown-item fs-6";
            foodOptionElement.textContent = foodOption.name;
            foodOptionsColumn.appendChild(foodOptionElement);
        });
    } else {
        foodOptions.forEach(foodOption => {
            const foodOptionsArray = Array.from(foodsList.querySelectorAll(".food-info-name"));
            const isDuplicate = foodOptionsArray.some(food => food.value.trim() === foodOption.name);
            if (!isDuplicate) {
                const foodOptionsColumn = document.createElement("div");
                foodOptionsColumn.className = "col-12 col-sm-6 col-lg-4 col-xl-3"
                foodOptionsRow.appendChild(foodOptionsColumn);
                const foodOptionElement = document.createElement("a");
                foodOptionElement.className = "dropdown-item fs-6";
                foodOptionElement.textContent = foodOption.name;
                foodOptionsColumn.appendChild(foodOptionElement);
            }
        });
    }
}

function createFoodOption (food, foodId) {
    const newFood = document.createElement("form");
    newFood.className = "new-food container-fluid needs-validation";
    newFood.setAttribute("novalidate", "");
    newFood.innerHTML = `
    <div class="row">
        <div class="new-food-form col-12 col-lg-10">
            <div class="row">
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="new-${foodId}-name">Name:</label>
                    <input class="form-control new-food-name" required type="text" id="new-${foodId}-name" placeholder="Food name">
                </div>
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="new-${foodId}-calories">Calorias:</label>
                    <input class="form-control new-food-calories" required type="number" step=".01" min="0" id="new-${foodId}-calories" placeholder="In grams, only numbers">
                </div>
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="new-${foodId}-proteins">Proteínas:</label>
                    <input class="form-control new-food-proteins" required type="number" step=".01" min="0" id="new-${foodId}-proteins" placeholder="In grams, only numbers">
                </div>
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label for="new-${foodId}-carbs">Carboidratos:</label>
                    <input class="form-control new-food-carbs" required type="number" step=".01" min="0" id="new-${foodId}-carbs" placeholder="In grams, only numbers">
                </div>
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="new-${foodId}-fats">Gorduras:</label>
                    <input class="form-control new-food-fats" required type="number" step=".01" min="0" id="new-${foodId}-fats" placeholder="In grams, only numbers">
                </div>
                <div class="col-12 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="new-${foodId}-portion">Porção:</label>
                    <select class="form-select new-food-portion" required id="new-${foodId}-portion">
                        <option selected disabled>Selecione o tipo de porção</option>
                        <option value="0">1 unidade</option>
                        <option value="1">100 g</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="new-food-buttons col-12 col-lg-2">
            <div class="row">
                <button class="cancel-new-food col-5 col-lg-12 btn btn-secondary" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                        <path d="M256-181.912 181.912-256l224-224-224-224L256-778.088l224 224 224-224L778.088-704l-224 224 224 224L704-181.912l-224-224-224 224Z"/>
                    </svg> Cancelar
                </button>
                <button class="confirm-new-food col-5 col-lg-12 btn btn-success" type="submit">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                        <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                    </svg> Criar
                </button>
            </div>
        </div>
    </div>
    `;
    food.appendChild(newFood);
}

function finishedFood (food, foodId, foodData, foodQuantity) {
    const portionPlaceholder = foodData.portion == "UNIDADE" ? "(Em unidades)" : "(Em gramas)";

    const foodInfo = document.createElement("form");
    foodInfo.className = "food-info container-fluid needs-validation";
    foodInfo.setAttribute("novalidate", "");
    foodInfo.innerHTML = `
    <div class="row">
        <div class="food-info-display col-12 col-lg-9">
            <div class="row">
                <div class="col-12 col-lg-8 d-flex align-items-center">
                    <input value="${foodData.name}" class="food-info-name form-control" disabled type="text">
                </div>
                <div class="col-6 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="${foodId}-calories">Calorias:</label>
                    <input value="${foodData.calories}" class="food-info-calories form-control" disabled type="number" step=".01" id="${foodId}-calories">
                </div>
                <div class="col-6 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="${foodId}-proteins">Proteínas:</label>
                    <input value="${foodData.proteins}" class="food-info-proteins form-control" disabled type="number" step=".01" id="${foodId}-proteins">
                </div>
                <div class="col-6 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="${foodId}-carbs">Carboidratos:</label>
                    <input value="${foodData.carbs}" class="food-info-carbs form-control" disabled type="number" step=".01" id="${foodId}-carbs">
                </div>
                <div class="col-6 col-lg-4 d-flex align-items-center">
                    <label class="me-2" for="${foodId}-fats">Gorduras:</label>
                    <input value="${foodData.fats}" class="food-info-fats form-control" disabled type="number" step=".01" id="${foodId}-fats">
                </div>
            </div>
        </div>
        <div class="food-info-interactions col-12 col-lg-3">
            <div class="row">
                <div class="col-7 col-lg-12 d-flex align-items-center">
                    <label class="me-2" for="${foodId}-quantity">Quantidade:</label>
                    <input class="food-info-quantity form-control" type="number" value="${foodQuantity}" step=".01" min="0" id="${foodId}-quantity" placeholder="${portionPlaceholder}">
                </div>
                <button class="edit-mode delete-food col-5 col-lg-12 btn btn-danger" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"></path>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"></path>
                    </svg> Deletar
                </button>
            </div>
        </div>
    </div>
    `;
    food.appendChild(foodInfo);

    if (!editMode) {
        foodInfo.querySelector(".food-info-quantity").disabled = true;
        foodInfo.querySelector(".edit-mode").remove();
    }

    const quantityInput = foodInfo.querySelector(".food-info-quantity");

    quantityInput.addEventListener("input", function() {
        const quantity = parseFloat(quantityInput.value) || 0;
        updateFoodInfo(food, foodInfo, quantity, foodData);
    });

    const initialQuantity = parseFloat(quantityInput.value) || 0;
    updateFoodInfo(food, foodInfo, initialQuantity, foodData);
}

function updateFoodInfo(food, foodInfo, quantity, foodData) {
    let updatedCalories = ((foodData.portion == "UNIDADE") ? foodData.calories : (foodData.calories / 100)) * quantity;
    let updatedProteins = ((foodData.portion == "UNIDADE") ? foodData.proteins : (foodData.proteins / 100)) * quantity;
    let updatedCarbs = ((foodData.portion == "UNIDADE") ? foodData.carbs : (foodData.carbs / 100)) * quantity;
    let updatedFats = ((foodData.portion == "UNIDADE") ? foodData.fats : (foodData.fats / 100)) * quantity;

    const caloriesInput = foodInfo.querySelector(".food-info-calories");
    const proteinsInput = foodInfo.querySelector(".food-info-proteins");
    const carbsInput = foodInfo.querySelector(".food-info-carbs");
    const fatsInput = foodInfo.querySelector(".food-info-fats");

    caloriesInput.value = updatedCalories.toFixed(2);
    proteinsInput.value = updatedProteins.toFixed(2);
    carbsInput.value = updatedCarbs.toFixed(2);
    fatsInput.value = updatedFats.toFixed(2);

    const meal = food.closest(".meal");
    updateMealTotal(meal);
}

function updateMealTotal(meal) {
    const mealTotalCalories = meal.querySelector(".meal-calories");
    const mealTotalProteins = meal.querySelector(".meal-proteins");
    const mealTotalCarbs = meal.querySelector(".meal-carbs");
    const mealTotalFats = meal.querySelector(".meal-fats");

    let totalMealCalories = 0;
    let totalMealProteins = 0;
    let totalMealCarbs = 0;
    let totalMealFats = 0;

    const foodItems = meal.querySelectorAll(".food-info");

    foodItems.forEach((foodItem) => {
        const mealCalories = parseFloat(foodItem.querySelector(".food-info-calories").value) || 0;
        const mealProteins = parseFloat(foodItem.querySelector(".food-info-proteins").value) || 0;
        const mealCarbs = parseFloat(foodItem.querySelector(".food-info-carbs").value) || 0;
        const mealFats = parseFloat(foodItem.querySelector(".food-info-fats").value) || 0;

        totalMealCalories += mealCalories;
        totalMealProteins += mealProteins;
        totalMealCarbs += mealCarbs;
        totalMealFats += mealFats;
    });

    const proteinsPercentage = ((totalMealProteins * 4 * 100) / totalMealCalories).toFixed(2);
    const carbsPercentage = ((totalMealCarbs * 4 * 100) / totalMealCalories).toFixed(2);
    const fatsPercentage = ((totalMealFats * 9 * 100) / totalMealCalories).toFixed(2);

    mealTotalCalories.textContent = `${totalMealCalories.toFixed(2)}kcal`;
    mealTotalProteins.textContent = `${totalMealProteins.toFixed(2)}g (${proteinsPercentage}%)`;
    mealTotalCarbs.textContent = `${totalMealCarbs.toFixed(2)}g (${carbsPercentage}%)`;
    mealTotalFats.textContent = `${totalMealFats.toFixed(2)}g (${fatsPercentage}%)`;

    updateDiaryTotal();
}

const getDietGoals = () => {
    const caloriesGoal = diet.totalCalories;
    const proteinsGoal = diet.totalProteins;
    const carbsGoal = diet.totalCarbs;
    const fatsGoal = diet.totalFats;

    return { caloriesGoal, proteinsGoal, carbsGoal, fatsGoal };
};

function updateDiaryTotal() {
    const calories = document.getElementById("calories");
    const proteins = document.getElementById("proteins");
    const carbs = document.getElementById("carbs");
    const fats = document.getElementById("fats");

    const caloriesGoal = document.getElementById("calories-goal");
    const proteinsGoal = document.getElementById("proteins-goal");
    const carbsGoal = document.getElementById("carbs-goal");
    const fatsGoal = document.getElementById("fats-goal");

    let totalCalories = 0;
    let totalProteins = 0;
    let totalCarbs = 0;
    let totalFats = 0;

    docMeals.forEach((meal) => {
        totalCalories += parseFloat(meal.querySelector(".meal-calories").textContent) || 0;
        totalProteins += parseFloat(meal.querySelector(".meal-proteins").textContent) || 0;
        totalCarbs += parseFloat(meal.querySelector(".meal-carbs").textContent) || 0;
        totalFats += parseFloat(meal.querySelector(".meal-fats").textContent) || 0;
    });

    const requestBody = {
        totalCalories,
        totalProteins,
        totalCarbs,
        totalFats
    };

    putData(`${apiURL}/diary/${diary.id}`, requestBody, 'Successfully updated diary in the database').then((data) => {
        //console.log("Updated diary: ", data);
    }).catch((error) => {
        console.error("Error while updating diary:", error);
    });

    calories.textContent = `${totalCalories.toFixed(2)}kcal`;
    proteins.textContent = `${totalProteins.toFixed(2)}g`;
    carbs.textContent = `${totalCarbs.toFixed(2)}g`;
    fats.textContent = `${totalFats.toFixed(2)}g`;

    const dietGoals = getDietGoals();
    const dietMacros = {totalCalories, totalProteins, totalCarbs, totalFats};

    const macrosDifference = compareGoals(dietGoals, dietMacros);

    caloriesGoal.textContent = `${macrosDifference.calories}kcal`;
    proteinsGoal.textContent = `${macrosDifference.proteins}g`;
    carbsGoal.textContent = `${macrosDifference.carbs}g`;
    fatsGoal.textContent = `${macrosDifference.fats}g`;
    
    caloriesGoal.style.color = getCaloriesDifferenceColor(macrosDifference.calories);
    proteinsGoal.style.color = getProteinsDifferenceColor(macrosDifference.proteins);
}

function showToast(content, type) {
    const delay = 3500;
    const toastHtml = `
    <div class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
            <div class="toast-body h6 p-3 m-0">${content}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
    </div>
    `;
    const toastElement = htmlToElement(toastHtml);
    const toastContainer = document.querySelector("#toast-container");
    toastContainer.appendChild(toastElement);
    const toast = new bootstrap.Toast(toastElement, {delay:delay, animation:true});
    toast.show();
    setTimeout(() => toastElement.remove(), delay + 1000);
}

function htmlToElement(toastHtml) {
    const template = document.createElement('template');
    toastHtml = toastHtml.trim();
    template.innerHTML = toastHtml;
    return template.content.firstChild;
}

document.addEventListener("DOMContentLoaded", () => {

    if (userData.role === "USER") editMode = true;

    getData(`${API_URL}/foodOption`, 'Successfully fetched food options from the database').then((data) => {
        foodOptions = data;
        //console.log("foodOptions: ", foodOptions);
    }).catch((error) => {
        console.error('Error while fetching food options:', error);
    });

    getData(`${apiURL}/diet`, 'Successfully fetched diet data from the database').then((data) => {
        diet = data;
        //console.log("diet: ", diet);
    }).catch((error) => {
        console.error('Error while fetching diet data:', error);
    });

    getData(`${apiURL}/profile`, 'Successfully fetched user profile data from the database').then((data) => {
        //console.log("profile: ", profile);
        profile = data;
    }).catch((error) => {
        console.error('Error while fetching user profile data:', error);
    });

    const mealsList = document.getElementById("meals-list");

    getData(`${apiURL}/diary/latest`, 'Successfully fetched latest diary from the database').then((data) => {
        diary = data;
        //console.log("diary: ", diary);

        userMeals = diary.meals;
        if (userMeals.length > 0) {
            for (let meal of userMeals) {
                mealFoods = meal.foods;
                loadUserMeal(mealsList, meal, mealFoods);
            }
        }

    }).catch((error) => {
        console.error('Error while fetching latest diary:', error);
    });



    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("add-food")) {
            const mealInput = event.target.closest(".meal").querySelector(".meal-title");
            const mealName = mealInput.value.trim();
            
            if (!mealName) {
                alert("Você deve inserir um nome para a refeição antes de adicionar um alimento.");
                mealInput.style.border = "1px solid red";
            } else {
                mealInput.style.border = "none";
                const foodsList = event.target.closest(".meal").querySelector(".foods-list");
                createFood(foodsList, `dummy-food${document.querySelectorAll(".food[id^='dummy-food']").length + 1}`);
            }
        }

        else if (event.target.classList.contains("save-meal")) {
            const meal = event.target.closest(".meal");
            const mealName = meal.querySelector(".meal-title").value.trim();

            let emptyQuantity = false;
            const foodData = Array.from(meal.querySelectorAll(".food-info")).map(food => {
                let foodOptionName = food.querySelector(".food-info-name").value.trim();

                let foodOption = foodOptions.find(food => {
                    return food.name == foodOptionName;
                }).id;

                let quantity = food.querySelector(".food-info-quantity");
                if (quantity.value.trim() == "") {
                    emptyQuantity = true;
                    quantity.style.border = "2px solid red";
                    quantity.addEventListener("input", function() {
                        quantity.style.border = "none";
                    });
                }
                quantity = parseFloat(quantity.value.trim());
                return { foodOption, quantity };
            });

            if (foodData.length < 1) {
                alert("Você deve ter pelo menos um alimento na refeição antes de salvá-la no banco de dados.");
            } else {
                if (emptyQuantity) alert("Todos os campos de 'Quantidade' devem estar preenchidos antes de salvar a refeição");
                else {
                    const requestBody = {
                        name: mealName,
                        foods: foodData
                    };

                    putData(`${apiURL}/diary/${diary.id}/meal/${meal.id.replace('meal','')}`, requestBody, 'Successfully updated meal in the database').then((data) => {
                        //console.log("Updated meal: ", data);

                        const updatedMealIndex = userMeals.findIndex((item) => item.id === data.id);
                        if (updatedMealIndex !== -1) userMeals[updatedMealIndex] = data;

                        const updatedFoods = data.foods;
                        const foodElements = Array.from(document.querySelectorAll('.food')).filter(food => food.querySelector('.food-info'));
                        for (foodElement of foodElements) {
                            if (foodElement.id.includes("dummy")) {
                                const matchingFood = updatedFoods.find((food) => {
                                    return food.foodOption.name === foodElement.querySelector(".food-info-name").value.trim();
                                });

                                if (matchingFood) {
                                    foodElement.id = `food${matchingFood.id}`;
                                    foodElement.querySelector(".food-info-calories").id = `food${matchingFood.id}-calories`;
                                    foodElement.querySelector(".food-info-proteins").id = `food${matchingFood.id}-proteins`;
                                    foodElement.querySelector(".food-info-carbs").id = `food${matchingFood.id}-carbs`;
                                    foodElement.querySelector(".food-info-fats").id = `food${matchingFood.id}-fats`;
                                    foodElement.querySelector(".food-info-quantity").id = `food${matchingFood.id}-quantity`;
                                }
                            }
                        }

                        showToast(`Refeição "${mealName}" atualizada com sucesso`, "success");
                    }).catch((error) => {
                        console.error('Error while posting new meal:', error);
                        showToast(`Erro ao atualizar refeição "${mealName}"`, "danger");
                    });
                }
            }
        }

        else if (event.target.classList.contains("cancel-new-food")) {
            event.target.closest(".food").querySelector(".new-food").classList.add("d-none");
            event.target.closest(".food").querySelector(".food-dropdown").classList.remove("d-none");
        }

        else if (event.target.classList.contains("create-new-food")) {
            const food = event.target.closest(".food");
            let newFoodForm = food.querySelector(".new-food");
            event.target.closest(".food").querySelector(".food-dropdown").classList.add("d-none");

            if (newFoodForm) newFoodForm.classList.remove("d-none");
            else createFoodOption (food, food.id);
        }

        else if (event.target.classList.contains("confirm-new-food"))  {
            const food = event.target.closest(".food");
            const newFoodForm = food.querySelector(".new-food");

            if (newFoodForm.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();

                const requestBody = {
                    name: newFoodForm.querySelector(".new-food-name").value,
                    calories: parseFloat(newFoodForm.querySelector(".new-food-calories").value),
                    proteins: parseFloat(newFoodForm.querySelector(".new-food-proteins").value),
                    carbs: parseFloat(newFoodForm.querySelector(".new-food-carbs").value),
                    fats: parseFloat(newFoodForm.querySelector(".new-food-fats").value),
                    portion: newFoodForm.querySelector(".new-food-portion").value
                };

                const existingFood = foodOptions.find((item) => {
                    const itemName = item.name.toLowerCase().replace(/[\s-]/g, '');
                    return itemName === requestBody.name.toLowerCase().replace(/[\s-]/g, '');
                });

                if (existingFood) {
                    alert("Já existe um alimento com o mesmo nome no banco de dados.");

                    const inputFields = newFoodForm.querySelectorAll('input');
                    inputFields.forEach((input) => {
                        input.value = '';
                    });

                } else {
                    postData(`${API_URL}/foodOption`, requestBody, 'Successfully posted new food option to the database').then((data) => {
                        //console.log("foodOption: ", data);

                        requestBody.portion = requestBody.portion == "0" ? "UNIDADE" : "GRAMAS"; // Gambiarra pra exibir a porção direito
                        foodOptions.push(data);
                        food.querySelector(".new-food").remove();
                        finishedFood(food, food.id, requestBody, "");
                    }).catch((error) => {
                        console.error("Error while adding new food:", error);
                    });
                }

            } else {
                event.preventDefault();
                event.stopPropagation();
                newFoodForm.classList.add('was-validated');
            }
        }

        else if (event.target.classList.contains("dropdown-item")) {
            const food = event.target.closest(".food");
            food.querySelector(".food-dropdown").remove();

            const selectedFoodName = event.target.textContent;
            const selectedFoodItem = foodOptions.find((item) => item.name === selectedFoodName);

            finishedFood(food, food.id, selectedFoodItem, "");
        }

        else if (event.target.classList.contains("delete-meal")) {
            const meal = event.target.closest(".meal");
            console.log(meal);
            if (meal) {
                if (confirm("Tem certeza que deseja deletar essa refeição?")) {
                    if (meal.id.startsWith("meal")) {
                        const mealId = meal.id.replace('meal','');
                        console.log("mealId: ", mealId);
                        deleteData(`${apiURL}/diary/${diary.id}/meal/${mealId}`, 'Successfully deleted meal in the database').then((data) => {
                            //console.log("Deleted meal: ", data);
                        }).catch((error) => {
                            console.error("Error while deleting meal:", error);
                        });
                    }
                    meal.remove();
                    userMeals.splice(userMeals.indexOf(meal), 1);
                    docMeals.splice(docMeals.indexOf(meal), 1);
                    updateDiaryTotal();
                }
            }
        }

        else if (event.target.classList.contains("delete-food")) {
            const food = event.target.closest(".food");
            if (food) {
                const meal = food.closest(".meal");
                food.remove();
                updateMealTotal(meal);
            }
        }
    });
});