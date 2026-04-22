class NotificationChannel {
  send(message) {
    console.log(`${message}`);
  }
}

class ConsoleChannel extends NotificationChannel {
  send(message) {
    console.log(`${message}`);
  }
}

class EmailChannel extends NotificationChannel {
  send(message) {
    console.log(`${message}`); 
  }
}

class SMSChannel extends NotificationChannel {
  send(message) {
    console.log(`${message}`);
  }
}

function msgSend(channel , message) {
  channel.send(message);
}

const sms = new SMSChannel();
const consoles = new ConsoleChannel();
const email = new EmailChannel();

msgSend(sms, "Hello from SMS");
msgSend(consoles, "Hello from console");
msgSend(email, "Hello from email");
