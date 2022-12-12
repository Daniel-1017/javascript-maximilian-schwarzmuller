function Person() {
  this.age = 17
  this.name = "Daniel"
  this.greet = function () {
    console.log(`Hi, I am ${this.name} and I am ${this.age} years old.`)
  }
}

const person = new Person()
person.greet()
