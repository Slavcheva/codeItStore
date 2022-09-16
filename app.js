const paginationNumbers = document.getElementById("pagination-numbers");
const clearBtn = document.querySelector('.clear-btn');

const paginationLimit = 8;
let currentPage = 1;

window.addEventListener('load', () => {
    loadProducts();
})

const appendPageNumber = (index) => {
    const pageNumber = document.createElement("button");
    pageNumber.className = "pagination-number";
    pageNumber.innerHTML = index;
    pageNumber.setAttribute("page-index", index);
    pageNumber.setAttribute("aria-label", "Page " + index);

    paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = (products) => {
    const pageCount = Math.ceil(products.length / paginationLimit);

    for (let i = 1; i <= pageCount; i++) {
        appendPageNumber(i);
    }
};

const handleActivePageNumber = () => {

    document.querySelectorAll(".pagination-number").forEach((button) => {
        button.classList.remove("active");

        const pageIndex = Number(button.getAttribute("page-index"));
        if (pageIndex == currentPage) {
            button.classList.add("active");
        }
    });
};

const setCurrentPage = (pageNum, products) => {

    currentPage = pageNum;

    handleActivePageNumber();

    const prevRange = (pageNum - 1) * paginationLimit;
    const currRange = pageNum * paginationLimit;

    const board = document.querySelector('#board');
    board.innerHTML = '';

    products.forEach((product, index) => {
        // product.classList.add("hidden");
        if (index >= prevRange && index < currRange) {
            board.appendChild(createProduct(product));
        }
    });

};

const renderProducts = (products) => {
    let searchInput = document.getElementById('searchBar');

    searchInput = (searchInput.value).toLowerCase();


    products = products.filter(e => e.name.toLowerCase().includes(searchInput));

    getPaginationNumbers(products);
    setCurrentPage(1, products)
    document.querySelectorAll(".pagination-number").forEach((button) => {
        const pageIndex = Number(button.getAttribute("page-index"));

        if (pageIndex) {
            button.addEventListener("click", () => {
                setCurrentPage(pageIndex, products);
            });
        }
    });
}

const loadProducts = () => {
    fetch("./db/phonesData.json")
        .then(res => res.json())
        .then(res => {
            renderProducts(Object.values(res)[0]);
        })
}

const searchProducts = () => {

    clearBtn.disabled = false;
    paginationNumbers.innerHTML = ''

    loadProducts();

}

const clearSearch = () => {

    let searchInput = document.getElementById('searchBar');
    searchInput.value = '';

    searchProducts();

    let clearBtn = document.querySelector('.clear-btn');
    clearBtn.disabled = true;
}

const createProduct = (product) => {
    const productCard = `
        <div class="pr-card">
            <a href="#">
                <div class="card-img" onmouseover="hoverFn(event)">
                    <img src="${product.image}" alt="${product.name}"/>
                    <div class="overlay"><button class="remove-btn" onclick="removeItem(event)" >REMOVE FROM LIST</button></div>
                </div>
                <div class="card-info">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">$${product.mainPrice}</div>
                </div>
                <div class="btn-group d-flex justify-content-center">
                    <button class="card-btn cart-btn"><i class="fa-solid fa-cart-shopping"></i></button>
                    <button class="card-btn del-btn" onclick="removeItem(event)"><i class="fa-solid fa-trash-can"></i></button>
                </div>
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
const hoverFn = (event) => {

}

const removeItem = (event) => {
    event.preventDefault()
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.remove();

}

