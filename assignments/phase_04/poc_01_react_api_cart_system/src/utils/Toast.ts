export type ToastType = "success" | "error" | "info" | "warning";

export class Toast {
  private container: HTMLElement;

  constructor() {
    const existing = document.getElementById("toastContainer");

    if (existing) {
      this.container = existing;
    } else {
      this.container = document.createElement("div");
      this.container.id = "toastContainer";
      this.container.className = "fixed bottom-5 right-5 space-y-2";
      document.body.appendChild(this.container);
    }
  }

  show(message: string, type: ToastType = "info", duration: number = 3000) {
    const toast = document.createElement("div");

    const styles = {
      success: "bg-green-500",
      error: "bg-red-500",
      info: "bg-blue-500",
      warning: "bg-yellow-500",
    };

    toast.className = `${styles[type]} text-white px-4 py-2 rounded-lg shadow-lg 
  flex items-center gap-2 
  animate-slideIn`;
    toast.innerText = message;

    this.container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, duration);
  }
}
