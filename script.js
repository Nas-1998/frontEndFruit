const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitSection ul");
const fruitNutrition = document.querySelector("#nutritionSection p");
const createForm = document.querySelector('#create-form')

let cal = 0;
const fruitCal = {};
const apiKey = "44888590-d967e4e6b92c1473bdae74caf"

fruitForm.addEventListener("submit", extractFruit);
createForm.addEventListener("submit", createNewFruit);

function extractFruit(e) {
    e.preventDefault();
    fetchFruitData(e.target.fruitInput.value);
    e.target.fruitInput.value = "";
}

async function createNewFruit(e) {
    e.preventDefault();

    const data = {name: e.target.fruitInput.value}

    const options = {
// Type of method
        method: "POST",
// Headers
        headers: {
            "Content-Type": "application/json"
        },
// Body
        body: JSON.stringify(data)



    }
    const response = await fetch("https://crud-server-wbu7.onrender.com/fruits", options)
    if (response.status === 201){
        console.log("YES DONE")
    }
    else{
        console.log("NO NOT DONE")
    }

}

async function fetchFruitData(fruit) {
    try {
        //Make sure to replace this link with your deployed API URL in this fetch
        const respData = await fetch(`https://crud-server-wbu7.onrender.com/fruits/${fruit}`);
        const respImg = await fetch(
            `https://pixabay.com/api/?q=${fruit}+fruit&key=${apiKey}`
        );

        if (respData.ok && respImg.ok) {
            const data = await respData.json();
            const imgData = await respImg.json();
            addFruit(data, imgData);
        } else {
            throw "Something has gone wrong with one of the API requests";
        }
    } catch (e) {
        console.log(e);
    }
}

function addFruit(fruit, fruitImg) {
    const img = document.createElement("img");
    img.classList.add('fruits');
    img.alt = fruit.name;
    img.src = fruitImg.hits[0].previewURL;

    img.addEventListener("click", removeFruit, { once: true });
    fruitList.appendChild(img);

    fruitCal[fruit.name] = fruit.nutritions.calories;

    cal += fruit.nutritions.calories;
    fruitNutrition.textContent = "Total Calories: " + cal;
}

function removeFruit(e) {
    const fruitName = e.target.alt;
    cal -= fruitCal[fruitName];
    fruitNutrition.textContent = "Total Calories: " + cal;

    delete fruitCal[fruitName];
    e.target.remove();
}
