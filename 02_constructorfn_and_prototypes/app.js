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
person.greet()
person.pringAge()
