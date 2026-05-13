type ToastType = "success" | "error" | "warning" | "info";

class ToastNotification {
  private container: HTMLDivElement; // Encapsulation

  constructor() {
    this.container = document.createElement("div");
    this.container.className = "toast-container";
    document.body.appendChild(this.container);
  }

  public show(message: string, type: ToastType): void {
    const toast = document.createElement("div");

    toast.className = `toast ${type}`;
    toast.textContent = message;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2000);
  }
}

const toast = new ToastNotification();

const successBtn = document.getElementById("successBtn") as HTMLButtonElement;
const errorBtn = document.getElementById("errorBtn") as HTMLButtonElement;
const warningBtn = document.getElementById("warningBtn") as HTMLButtonElement;
const infoBtn = document.getElementById("infoBtn") as HTMLButtonElement;

successBtn.addEventListener("click", () => {
  toast.show("Operation Successful!", "success");
});

errorBtn.addEventListener("click", () => {
  toast.show("Something went wrong!", "error");
});

warningBtn.addEventListener("click", () => {
  toast.show("Warning: Check your input!", "warning");
});

infoBtn.addEventListener("click", () => {
  toast.show("Information Updated!", "info");
});