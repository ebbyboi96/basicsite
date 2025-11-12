/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name: Everett Goldfarb
 * Email: goldfare@oregonstate.edu
 */
const sellStuff = document.querySelector("#sell-something-modal");
const background = document.querySelector("#modal-backdrop");
const sellButton = document.querySelector("#sell-something-button")
const cancelButton = document.querySelector("#modal-cancel");
const postButton = document.querySelector("#modal-accept");
const closeButton = document.querySelector("#modal-close");
const update = document.querySelector("#filter-update-button");

function showModal() {
    sellStuff.classList = '';
    background.classList = '';
}

function hideModal() {
    sellStuff.classList = 'hidden';
    background.classList = 'hidden';
    document.querySelector("#post-text-input").value = "";
    document.querySelector("#post-photo-input").value = "";
    document.querySelector("#post-price-input").value = "";
    document.querySelector("#post-city-input").value = "";
    document.querySelector("#post-condition-new").checked = true;
}

sellButton.addEventListener('click', (e) => {
    showModal();
})

cancelButton.addEventListener('click', (e) => {
    hideModal();
})

closeButton.addEventListener('click', (e) => {
    hideModal();
})

postButton.addEventListener('click', (e) => {
    let description = document.querySelector("#post-text-input").value;
    let photo = document.querySelector("#post-photo-input").value;
    let price = document.querySelector("#post-price-input").value;
    let city = document.querySelector("#post-city-input").value;
    let cityFilters = document.querySelectorAll("option");
    let cityFilterer = document.querySelector("#filter-city");
    let cities = []
    cityFilters.forEach((option) => {
        if (!cities.includes(option.textContent.toLowerCase())) {
            cities.push(option.textContent.toLowerCase());
        }

    })
    console.log(cities);
    const posts = document.querySelector("#posts");
    const conditions = document.querySelectorAll("input[name='post-condition']");
    var condition;
    for (var i = 0; i < conditions.length; i++) {
        if (conditions[i].checked) {
            condition = conditions[i].value;
        }
    }
    if (!description || !photo || !condition || !price || !city) {
        alert("Please fill out all fields.");
        return;
    }
    const newPost = document.createElement("div");
    newPost.setAttribute('data-price', price);
    newPost.setAttribute('data-city', city);
    newPost.setAttribute('data-condition', condition);
    newPost.classList = "post";
    const postDiv = document.createElement("div");
    postDiv.classList = "post-contents";
    const imgCont = document.createElement("div");
    imgCont.classList = "post-image-container";
    const img = document.createElement("img");
    img.src = photo;
    img.alt = description;
    const info = document.createElement("div");
    info.classList = "post-info-container";
    const postdescription = document.createElement("a");
    postdescription.textContent = description;
    postdescription.href = "#";
    postdescription.classList = "post-title";
    const postPrice = document.createElement("span");
    postPrice.textContent = `$${price}`;
    postPrice.classList = "post-price";
    const postCity = document.createElement("span");
    postCity.textContent = `(${city})`;
    postCity.classList = "post-city";
    imgCont.appendChild(img);
    info.appendChild(postdescription);
    info.appendChild(postPrice);
    info.appendChild(postCity);
    postDiv.appendChild(imgCont);
    postDiv.appendChild(info);
    newPost.appendChild(postDiv);
    posts.appendChild(newPost);
    if (!cities.includes(city.toLowerCase())) {
        cities.push(city);
        const newCity = document.createElement("option");
        newCity.textContent = city;
        cityFilterer.appendChild(newCity);
    }
    hideModal();
})

update.addEventListener('click', (e) => {
    const posts = document.querySelectorAll(".post");
    let textFilter = document.querySelector("#filter-text").value.toLowerCase();
    let priceMin = document.querySelector("#filter-min-price").value || 0;
    let priceMax = document.querySelector("#filter-max-price").value || Infinity;
    let filterCity = document.querySelector("#filter-city").value.toLowerCase();
    let conditionSelectors = document.querySelectorAll("#filter-condition input[type='checkbox']");
    let conditions = [];
    conditionSelectors.forEach((checkbox) => {
        if (checkbox.checked) {
            conditions.push(checkbox.value);
        }
    })
    for (let i = 0; i < posts.length; i++) {
        const postPrice = posts[i].getAttribute('data-price');
        const city = posts[i].getAttribute('data-city').toLowerCase();
        const description = posts[i].querySelector(".post-title").textContent.toLowerCase();
        let filtered = false;
        const postCondition = posts[i].getAttribute('data-condition');
        if (parseFloat(postPrice) < parseFloat(priceMin) || parseFloat(postPrice) > parseFloat(priceMax)) {
            filtered = true;
        }
        if (city !== filterCity && filterCity !== "") {
            filtered = true;
        }
        if (!description.includes(textFilter)) {
            filtered = true;
        }
        let found = false;
        console.log(conditions.length);
        if (conditions.length > 0) {
            for (let j = 0; j < conditions.length; j++) {
                if (postCondition === conditions[j]) {
                    found = true;
                    posts[i].classList.add("active");
                }
            }
        } else {
            found = true;
        }
        if (found === true && filtered === false) {
            filtered = false;
        } else {
            filtered = true;
        }
        if (filtered === true) {
            posts[i].classList.add("hidden");
        } else {
            posts[i].classList.remove("hidden");
        }
    }
})