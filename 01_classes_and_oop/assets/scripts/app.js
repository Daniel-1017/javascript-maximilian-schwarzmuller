class Product {
  constructor(title, image, desc, price) {
    this.title = title
    this.imageUrl = image
    this.description = desc
    this.price = price
  }
}

class ProductItem {
  constructor(product) {
    this.product = product
  }

  render() {
    const prodEl = document.createElement("li")
    prodEl.className = "product-item"
    prodEl.innerHTML = `
        <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}" />
            <div class="this.productucproduct-item__content">
                <h2>${this.product.title}</h2>
                <h3>\$${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add to cart</button>
            </div>
        </div>
      `
    return prodEl
  }
}

class ProductList {
  products = [
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
  ]

  constructor() {}

  render() {
    const renderHook = document.getElementById("app")
    const prodList = document.createElement("ul")
    for (const prod of this.products) {
      const productItem = new ProductItem(prod)
      const prodEl = productItem.render()
      prodList.append(prodEl)
    }
    prodList.className = "product-list"
    renderHook.append(prodList)
  }
}

const productList = new ProductList()
productList.render()
