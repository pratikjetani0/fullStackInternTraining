export type ToastType = "success" | "error" | "info" | "warning"; // UNION TYPE

// a class to encapsulate toast creation, styling, and lifecycle into a reusable component
export class Toast {
  // private ensures it cannot be accessed outside the class
  private container: HTMLElement; // Stores reference to the toast container


  // constructor is a special method that is automatically called when a new instance of the class is created
  constructor() {
    // check if the toast container already exists
    const existing = document.getElementById("toastContainer");

      if (existing) {
      // if it exists, use the existing container
      this.container = existing; // this refers to the current object (instance) of a class. So, this.container is the container of the current object.
    } else {
      // if it doesn't exist, create a new container
      this.container = document.createElement("div");
      this.container.id = "toastContainer"; // set the id of the container to "toastContainer"
      this.container.className = "fixed bottom-5 right-5 space-y-2";
      document.body.appendChild(this.container);
    }
  }

  // show method is used to display a toast message
  show(message: string, type: ToastType = "info", duration: number = 3000) {
    const toast = document.createElement("div"); // create a new div element for the toast

    // define the styles for the toast based on the type
    const styles = {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500",
      warning: "bg-yellow-500"
    };

    toast.className = `${styles[type]} text-white px-4 py-2 rounded-lg shadow-lg 
  flex items-center gap-2 
  animate-slideIn`;
    toast.innerText = message;

    this.container.appendChild(toast);

    // remove the toast after 3 seconds
    setTimeout(() => {
      toast.remove();
    }, duration);
  }
}