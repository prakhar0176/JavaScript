// Immediately invoked function expressions, or IIFEs for short, are a common pattern in JavaScript. They are anonymous functions that are defined and immediately called in the same statement.
(async function () {
    const data = await fetch('data.json');
    const res = await data.json();
    // console.log(res.products);
    products = res.products;
    let selectedProductId;
    let selectedProduct;
    // let selectedProductId = products[0].id;
    // let selectedProduct = products[0];
    // console.log(selectedProduct.images[0]);

    const container = document.querySelector(".container");
    const productList = document.querySelector(".product__name--list");
    const productDesc = document.querySelector(".product__details");
    const addProductBtn = document.querySelector(".product__btn");
    const addProductForm = document.querySelector(".add__product");
    const createProductForm = document.querySelector(".create__product");
    const formCloseBtn = document.querySelector(".form__close--btn");
    // update form element
    const formTitle = document.querySelector("#title");
    const formDescription = document.querySelector("#description");
    const formImage = document.querySelector("#image");
    const formPrice = document.querySelector("#price");
    const formStock = document.querySelector("#stock");
    const formDescountPercentage = document.querySelector("#discount");
    const formBrand = document.querySelector("#brand");
    const formCategory = document.querySelector("#categary");


    const updateProduct = () => {
        if(selectedProduct) {
            formTitle.value = selectedProduct.title;
            formDescription.value = selectedProduct.description;
            formImage.value = selectedProduct.image;
            formPrice.value = selectedProduct.price;
            formStock.value = selectedProduct.stock;
            formDescountPercentage.value = selectedProduct.discountPercentage;
            formBrand.value = selectedProduct.brand;
            formCategory.value = selectedProduct.category;
        }
        renderSelectedProduct();         
        renderProducts(); 

    }
    

    //Selected Product Details
    productList.addEventListener("click", (e) => {
        if(e.target.className === 'product__list' && selectedProductId != e.target.id) {
            selectedProductId = e.target.id;
            renderProducts();

            //render selected product
            renderSelectedProduct();
        }

        if (e.target.tagName === "I") {
            products = products.filter(prod => String(prod.id) !== e.target.parentNode.id);
            selectedProductId = products[0]?.id || -1;
            selectedProduct = products[0] || {};
            renderSelectedProduct();         
            renderProducts(); 
        }
    });

   



    //Render Products List
    const renderProducts = () => {
        productList.innerHTML = ""
        products.forEach(prod => {
            const product = document.createElement("span");
            product.classList.add("product__list");

            if (parseInt(selectedProductId,10) === prod.id) {
                product.classList.add("selected");
                selectedProduct = prod
            }

            product.setAttribute("id", prod.id);
            product.innerHTML = `${prod.title} <i class="fa fa-trash" aria-hidden="true"></i>`
            productList.append(product);
        });
    };

    const renderSelectedProduct = () => {
        // deleting product
        if (selectedProductId === -1) {
            productDesc.innerHTML = "";
            return;
        }
        

        //show product details
        productDesc.innerHTML = `
        <div class="product__desc">
            <img src="${selectedProduct.image}" />
            <span class="product__heading">${selectedProduct.title}</span>
            <span>${selectedProduct.description}</span>
            <span>${selectedProduct.price}</span>
            <span>${selectedProduct.discountPercentage}</span>
            <span>${selectedProduct.brand}</span>
            <span>${selectedProduct.category}</span>
            <button class="update__btn">Update <i class="fas fa-edit product__delete"></i></button>
        </div>
        `;

        console.log(productList);
        console.log(selectedProduct);
        console.log(selectedProductId);

        // Update Product Details
        const updateBtn = document.querySelector(".update__btn");
        console.log(updateBtn);
        console.log(selectedProductId);
        updateBtn.addEventListener("click", (e) => {
            console.log(updateBtn);
            updateProduct();

            addProductForm.style.display = "block";

        });
    };


    addProductBtn.addEventListener("click", (e) => {
        console.log(addProductBtn)
        addProductForm.style.display = "block";
    });



    formCloseBtn.addEventListener("click", (e) => {
        if (e.target.className === "form__close--btn") {
            addProductForm.style.display = "none";
        }
    })

    // container.addEventListener("click", (e) => {
    //     // console.log(e.target.className);
    //     // console.log(e.target.className === "add__product");
    //     // console.log("Event",e.currentTarget);
    //     if(e.target.className !== "product__btn") {
    //         addProductForm.style.display = "none";
    //     }

    //     // if(e.target.tagName !== "FORM") {
    //     //     addProductForm.style.display = "none";
    //     // } 
    // });
    
    // addProductForm.addEventListener("click", (e) => {
    //     e.stopPropagation();
    // });

    // const createProductForm = document.querySelector(".create__product");

    createProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData(createProductForm);        
        const values = [...formData.entries()];
        console.log(values);
        const prodData = {}
        values.forEach((val) => {
                prodData[val[0]] = val[1];
        });
        prodData.id = products[products.length-1].id + 1;
        prodData.image = prodData.image || "https://c8.alamy.com/comp/E1PMDX/businesswoman-writing-the-word-product-E1PMDX.jpg";            
        products.push(prodData);
        addProductForm.style.display = "none";
        renderProducts();
        createProductForm.reset();
        console.log(products);

    });


    // console.log(products);
    renderProducts();


}) ();