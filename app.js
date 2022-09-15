window.addEventListener('load', () => {

    fetch("./db/phonesData.json")
        .then(res => res.json())
        .then(res => {
            renderProducts(Object.values(res)[0])
        })
})

function renderProducts(products) {
    let input = document.getElementById('searchBar').value
    input = input.toLowerCase();

    const board = document.querySelector('#board');
    board.innerHTML = '';

    products.filter(e => e.name.toLowerCase().includes(input))
        .forEach(product => {
            board.appendChild(createProduct(product));
        });
}

function searchProducts() {
    
    let clearBtn = document.querySelector('.clear-btn');
    clearBtn.disabled = false;

    fetch("./db/phonesData.json")
        .then(res => res.json())
        .then(res => {
            renderProducts(Object.values(res)[0])
        })
}

function clearSearch() {

    let input = document.getElementById('searchBar');
    input.value = '';

    searchProducts();

    let clearBtn = document.querySelector('.clear-btn');
    clearBtn.disabled = true;


}

function createProduct(product) {
    const productCard = `
        <div class="pr-card">
            <a href="#" >
                <div class="card-img">
                    <img src="${product.image}" alt="${product.name}"/>
                </div>
                <div class="card-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">$${product.mainPrice}</div>
                </div>
                <div class="btn-group d-flex justify-content-center" role="group">
                    <button class="card-btn cart-btn"><i class="fa-solid fa-cart-shopping"></i></button>
                    <button class="card-btn del-btn" onclick="removeItem(event)"><i class="fa-solid fa-trash-can"></i></button>
                </div>
                <div class="overlay"><button class="remove-btn" onclick="removeItem(event)" >REMOVE FROM LIST</button></div>

            </a>
        </div>
`;

    const productItem = document.createElement('li');
    productItem.classList.add('col-12');
    productItem.classList.add('col-md-6');
    productItem.classList.add('col-lg-3');

    productItem.innerHTML = productCard;

    return productItem;
}

function removeItem(event) {
    console.log(event.target.offsetParent);
    console.log(event.target.parentElement.parentElement.parentElement);
    event.target.parentElement.parentElement.parentElement.parentElement.remove();
}

