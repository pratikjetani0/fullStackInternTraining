class Product{
    constructor(name, price, category){
    this.name = name;
    this.price = price;
    this.category = category;
    }

    printDetails(){
        console.log(`Product : ${this.name}`)
        console.log(`Price : ${this.price}`)
        console.log(`Category : ${this.category}`)
        console.log('\n')
    }
}

class User{
    constructor(name, email, role){
    this.name = name;
    this.email = email;
    this.role = role;
    }

    printDetails(){
        console.log(`User : ${this.name}`)
        console.log(`Email : ${this.email}`)
        console.log(`Role : ${this.role}`)
        console.log('\n')
    }
}

const product1 = new Product('Laptop', 80000, 'Electronics');
const product2 = new Product('Shoes', 3000, 'Footwear');

const user1 = new User('Pratik', 'pratik@exmple.com', 'Full stack' )
const user2 = new User('Yagnik', 'yagnik@exmple.com', 'MERN stack' )

product1.printDetails();
product2.printDetails();

user1.printDetails();
user2.printDetails();