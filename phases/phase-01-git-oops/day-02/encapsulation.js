class User {
  #password;
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
  get password() {
    return `${this.#password}`;
  }

  set password(newPassword) {
    if (newPassword.length < 8) {
      console.log("❌ password must be at least 8 charcter long.");
    } else {
      this.#password = newPassword;
      console.log("✅ Password update successfully");
    }
  }

  printDetails() {
    console.log(`Name: ${this.name}`);
    console.log(`Email: ${this.email}`);
  }
}

const user1 = new User("pratik", "pratik@gmail.com", "12344321");

// Invalid password
user1.password = "123"; // op: ❌ password must be at least 8 charcter long.

// access password with getter
console.log("password:", user1.password);

// update password
user1.password = "newpassword12"; // ✅ Password update successfully
console.log("password:", user1.password); // password: newpassword12
