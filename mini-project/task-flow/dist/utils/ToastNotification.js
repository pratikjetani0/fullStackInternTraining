class ToastNotification {
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
        // Trigger CSS transition/animation (CSS uses `.toast.show`)
        requestAnimationFrame(() => {
            toast.classList.add("show");
        });
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}
export default new ToastNotification();
//# sourceMappingURL=ToastNotification.js.map