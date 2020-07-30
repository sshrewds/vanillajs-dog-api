

function drawListItems(items) {
    let output = "";
    items.forEach(breed => {
        output += `<li>${breed}</li>`
    })

    document.querySelector('#result-search').innerHTML = output;
    let listItems = [].slice.call(document.querySelector('ul').children);
    console.log("in func");
    listItems.forEach(item => item.addEventListener('click', fillInputWithValue));
}

function fillInputWithValue(e) {
    let value = e.target.firstChild.data
    console.log(value);
    input.value = value;
    drawListItems([]);
}


let breeds;
fetch('https://dog.ceo/api/breeds/list/all').
    then(res => res.json()).
    then(breedsList => {
        breedsList = breedsList.message;
        breeds = Object.keys(breedsList);
        let input = document.getElementById('input');
        input.addEventListener('input', handleInput);

        function handleInput(e) {
            const inputValue = e.target.value;
            const filteredBreeds = inputValue ? breeds.filter(breedName => breedName.includes(inputValue)).slice(0, 5) : [];

            drawListItems(filteredBreeds);
        }


    })

