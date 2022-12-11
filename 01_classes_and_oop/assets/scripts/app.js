class Product {
  constructor(title, image, desc, price) {
    this.title = title
    this.imageUrl = image
    this.description = desc
    this.price = price
  }
}

class ShoppingCart {
  items = []

  set cartItems(value) {
    this.items = value
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmmount.toFixed(
      2
    )}</h2>`
  }

  get totalAmmount() {
    const sum = this.items.reduce((prevVal, currItem) => {
      return prevVal + currItem.price
    }, 0)
    return sum
  }

  addProduct(product) {
    const updatedItems = [...this.items]
    updatedItems.push(product)
    this.cartItems = updatedItems
  }

  render() {
    const cartEl = document.createElement("section")
    cartEl.innerHTML = `
            <h2>Total: \$${0}</h2>
            <button>Order now</button>
        `
    cartEl.className = "cart"
    this.totalOutput = cartEl.querySelector("h2")
    return cartEl
  }
}

class ProductItem {
  constructor(product) {
    this.product = product
  }

  addToCart() {
    App.addProductToCart(this.product)
  }

  render() {
    const prodEl = document.createElement("li")
    prodEl.className = "product-item"
    prodEl.innerHTML = `
        <div>
            <img src="${this.product.imageUrl}" alt="${this.product.title}" />
            <div class="product-item__content">
                <h2>${this.product.title}</h2>
                <h3>\$${this.product.price}</h3>
                <p>${this.product.description}</p>
                <button>Add to cart</button>
            </div>
        </div>
      `
    const addCartButton = prodEl.querySelector("button")
    addCartButton.addEventListener("click", this.addToCart.bind(this))
    return prodEl
  }
}

class ProductList {
  products = [
    new Product(
      "A pillow",
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=737&q=80",
      "A soft pillow.",
      10
    ),
    new Product(
      "Carpet",
      "https://images.unsplash.com/photo-1588421874990-1fe162747f9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
      "A carpet which you might like - or not.",
      50
    ),
  ]

  render() {
    const prodList = document.createElement("ul")
    for (const prod of this.products) {
      const productItem = new ProductItem(prod)
      const prodEl = productItem.render()
      prodList.append(prodEl)
    }
    prodList.className = "product-list"
    return prodList
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById("app")
    this.cart = new ShoppingCart()
    const cartEl = this.cart.render()
    const productList = new ProductList()
    const prodListEl = productList.render()
    renderHook.append(cartEl)
    renderHook.append(prodListEl)
  }
}

class App {
  static cart

  static init() {
    const shop = new Shop()
    shop.render()
    this.cart = shop.cart
  }

  static addProductToCart(product) {
    this.cart.addProduct(product)
  }
}

App.init()
