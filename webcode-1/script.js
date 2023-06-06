const searchInput = document.getElementById("searchInput");
const productList = document.getElementById("productList");

async function getProducts() {
  try {
    const response = await fetch(
      "https://makeup-api.herokuapp.com/api/v1/products.json"
    );
    if (!response.ok) {
      throw new Error("Unable to fetch products.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

function displayProducts(products) {
  productList.innerHTML = "";
  products.forEach((product) => {
    const { brand, name, price, image_link, product_link, description } =
      product;

    const productElement = document.createElement("div");
    productElement.classList.add("product");

    const imageElement = document.createElement("img");
    imageElement.src = image_link;
    productElement.appendChild(imageElement);

    const detailsElement = document.createElement("div");
    detailsElement.classList.add("details");

    const titleElement = document.createElement("h2");
    titleElement.textContent = `${brand} - ${name}`;
    detailsElement.appendChild(titleElement);

    const priceElement = document.createElement("p");
    priceElement.textContent = `Price: ${price}`;
    detailsElement.appendChild(priceElement);

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = description;
    detailsElement.appendChild(descriptionElement);

    const linkElement = document.createElement("a");
    linkElement.href = product_link;
    linkElement.textContent = "View Product";
    detailsElement.appendChild(linkElement);

    productElement.appendChild(detailsElement);
    productList.appendChild(productElement);
  });
}

async function searchProducts() {
  const searchText = searchInput.value.toLowerCase();
  const products = await getProducts();
  const filteredProducts = products.filter((product) => {
    const brand = product.brand.toLowerCase();
    const name = product.name.toLowerCase();
    return brand.includes(searchText) || name.includes(searchText);
  });
  displayProducts(filteredProducts);
}

searchInput.addEventListener("input", searchProducts);

// Initial load
getProducts().then(displayProducts);
