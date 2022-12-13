function Person() {
  this.age = 17
  this.name = "Daniel"
  this.greet = function () {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`)
  }
}

Person.prototype = {
  pringAge() {
    console.log(this.age)
  },
}

const person = new Person()

const course = {
  title: "Js The Complete Guide",
  rating: 5,
}

Object.setPrototypeOf(course, {
  // ...Object.getPrototypeOf(course),
  printRating: function () {
    console.log(`${this.rating}/5`)
  },
})

course.printRating()

const student = Object.create(
  {
    pringProgress: function () {
      console.log(this.progress)
    },
  },
  {
    name: {
      configurable: true,
      enumerable: true,
      value: "Daniel",
      writable: true,
    },
  }
)

student.email = "test@gmail.com"

Object.defineProperty(student, "progress", {
  configurable: true,
  enumerable: true,
  value: 0.8,
  writable: true,
})
