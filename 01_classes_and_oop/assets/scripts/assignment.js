class Course {
  #price

  get price() {
    return `$${this.#price}`
  }

  set price(value) {
    if (value < 0) {
      throw "Invalid price."
    }
    this.#price = value
  }

  constructor(title, length, price) {
    this.title = title
    this.length = length
    this.price = price
  }

  calcLength() {
    return +(this.length / this.#price).toFixed(2)
  }

  summary() {
    return `${this.title}, ${this.length}h, $${this.price}`
  }
}

class PracticalCourse extends Course {
  constructor(title, length, price, exercisesCount) {
    super(title, length, price)
    this.numOfExercises = exercisesCount
  }
}

class TheoreticalCourse extends Course {
  publih() {
    console.log("Publishing")
  }
}

const flutter = new TheoreticalCourse("Flutter", 20, 35)
