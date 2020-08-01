let breeds;
let input = document.getElementById('input');
let form = document.getElementById('dog-image-form');
let resultImage = document.getElementById('result-image');


function drawListItems(items) {
    let output = "";
    items.forEach(breed => {
        output += `<li>${breed}</li>`
    })

    document.querySelector('#result-search').innerHTML = output;
    let listItems = [].slice.call(document.querySelector('ul').children);

    listItems.forEach(item => item.addEventListener('click', fillInputWithValue));
}

function fillInputWithValue(e) {
    let value = e.target.firstChild.data

    input.value = value;
    drawListItems([]);
}

function handleSubmit(e) {
    e.preventDefault();
    if (input.value) {
        fetch(`https://dog.ceo/api/breed/${input.value}/images/random`)
            .then(res => res.json())
            .then(value => {
                let url = value.message;
                // url = url.slice(0, -1);
                console.log(url)
                let output = `<img style="" src="${url}"/>`
                console.log(output);
                resultImage.innerHTML = output;

            });
    }

}



fetch('https://dog.ceo/api/breeds/list/all').
    then(res => res.json()).
    then(breedsList => {
        breedsList = breedsList.message;
        breeds = Object.keys(breedsList);

        input.addEventListener('input', handleInput);
        form.addEventListener('submit', handleSubmit);

        function handleInput(e) {
            const inputValue = e.target.value;
            const filteredBreeds = inputValue ? breeds.filter(breedName => breedName.includes(inputValue)).slice(0, 5) : [];
            if (!inputValue)
                resultImage.innerHTML = "";
            drawListItems(filteredBreeds);
        }


    })

