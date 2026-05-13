// It is Parent class 
// We can direct access the parent class but here i add safe guard (for class it is blueprint and for method no actual logic)
class PaymentProcessor {
  constructor() {
    // it is for user to force the use child class
    if (this.constructor === PaymentProcessor) {
      throw new Error("Can not instance abtract class");
    }
  }
  //it force the child to override it
  processPayment(amount) {
    throw new Error("abstract method not implement");
  }
}

class CreditCardProcessor extends PaymentProcessor {
  processPayment(amount) {
    console.log(`Credit card payment process ${amount}`);
    console.log("creadit card payment done✅");
  }
}

// It remove the method for this class it will give me error but without safeguard no error but not any logic for this class
class UPIProcessor extends PaymentProcessor {
  processPayment(amount) {
    console.log(`UPI payment process ${amount}`);
    console.log("UPI payment done✅");
  }
}

function makePayment(process, amount) {
  process.processPayment(amount);
}

const credit = new CreditCardProcessor();
const upi = new UPIProcessor();

// upi.processPayment(7000)
makePayment(credit, 3000);
makePayment(upi, 2000)
