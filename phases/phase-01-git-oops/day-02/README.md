# Day 02 — OOPS

- OOP(Object Oriented Progmming) a software development paradigm that organizes code around "objects" (data and behaviors) rather than just functions and logic.

## Class & Objects

- `Class` : A class is a blueprint (ex. Car)
  - Inside a class you define properties(variable) and method (functions) that will belong to the objects created from the class.

- `Object` : It is an instance (ex. Tesla)

- (code : class-object.js)

## Constructor and Destructor

- `Constructor` : It initialize objects and allocate memory, and Constructors are called automatically when an object is created.

```js
class Demo {
  Demo() {
    console.log("constructor called");
  }
}
```

- `Destructor` : It destroy objects and deallocate memory, and destructors are called automatically when an object goes out of scope or is explicitly deleted

```js
class Demo{
 ~Demo() {
       console.log('destructor called')
    }
}
```

## Access Modifiers (public, private, protected)

`Public (Default)` : All class members (properties and methods) in JavaScript are public by default.

```js
class User {
  name = "Jhon";
  greet() {
    console.log("Hello");
  }
}
```

`Private` : Can only be accessed from within the class where they are defined.

```js
class User {
  #bankbalance = 90000;
  #hide() {
    console.log("Hello");
  }
}
```

`Protected` : It allows access within the class and its subclasses. (Not inbuild in JS)

```js
class User {
  _email = "user@gmail.com";
}
```

# The Four Pillars of OOPs 🚀

## Abstraction

- It means hide the complex implemntation details and shows only essential features.
- It show only what is needed.
- It focus on what fucntionality is provided.
- It is achieved by abstracts methods and interfaces(TS).
- EX. : User can withdraw money from bank without knowing how the ATM works.

- (code: abstraction.js)

- Importatnt to add the safeguard ( error throwing )

## Encapsulation

- It means binding data(properties) and functions(behaviour) in to unit(class/object) and hiding internal details.
- It do Data protection.
- It focus on 'How data is protected'
- It is achieved by private variables, getter/setter methods, closures, classes.
- Protect the data from accidential modification.
- Ex. : Bank account balance can not be accessed directly.

- (code: encapsulation.js)

- `Getter (get)` : A special method used to retrieve a property value. 
- `Setter (set)`: A method used to update a property value. 

## Inheritance

- It creates an "is-a" relationship between classes.
- It allows a Child class(derived class) to inherit properties and methods from its Parent class(Base class), by promoting code reuse.
- It is for code resusability and better oragnization.
- `extends` : Keyword used to inherit another class.
- `super()` : used to call the parent constructor inside the child class.
- EX. : Employee has name, salary, work but Developer extend the same properties and its own like writecode().

- code: (inheritance.js)

## Polymorphism

- It derived from the Greek words "poly" means many and "morph" means shape.
- It means one name(same action) , multiple(differnt) behaviour.
- It allows objects of different classes to be treated as object of a common superclass.

- (code:polymorphism.js)

## Method Overloading 
- JS does not native supported method overloading.
- It define multiple function with same name but differnt parameter.
- Within a single class (have to add with logic).
- Must have differnt parameters.

## Method Overriding
- JS fully support method overriding modern class syntax.
- Overrides occurs when Child class have same fucntion(method) as Parent class alredy define.
- There we use Inheritance.
- Must have a same name.