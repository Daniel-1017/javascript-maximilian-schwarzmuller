class Product {
  title = "DEFAULT"
  imageUrl
  price
  description

  constructor(title, image, desc, price) {
    this.title = title
    this.imageUrl = image
    this.description = desc
    this.price = price
  }
}

const productsList = {
  products: [
    new Product(
      "A pillow",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=737&q=80",
      "A soft pillow.",
      19.99
    ),
    new Product(
      "Carpet",
      "https://images.unsplash.com/photo-1588421874990-1fe162747f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "A carpet which you might like - or not.",
      89.99
    ),
  ],
  render() {
    const renderHook = document.getElementById("app")
    const prodLit = document.createElement("ul")
    for (const prod of this.products) {
      const prodEl = document.createElement("li")
      prodEl.className = "product-item"
      prodEl.innerHTML = `
        <div>
            <img src="${prod.imageUrl}" alt="${prod.title}" />
            <div class="product-item__content">
                <h2>${prod.title}</h2>
                <h3>\$${prod.price}</h3>
                <p>${prod.description}</p>
                <button>Add to cart</button>
            </div>
        </div>
      `
      prodLit.append(prodEl)
    }
    prodLit.className = "product-list"
    renderHook.append(prodLit)
  },
}

productsList.render()
