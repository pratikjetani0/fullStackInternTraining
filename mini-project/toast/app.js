"use strict";
class ToastNotification {
    container;
    constructor() {
        this.container = document.createElement("div");
        this.container.className = "toast-container";
        document.body.appendChild(this.container);
    }
    show(message, type) {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        this.container.appendChild(toast);
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}
const toast = new ToastNotification();
const successBtn = document.getElementById("successBtn");
const errorBtn = document.getElementById("errorBtn");
const warningBtn = document.getElementById("warningBtn");
const infoBtn = document.getElementById("infoBtn");
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
