type ToastType = "success" | "error" | "warning" | "info";
declare class ToastNotification {
    private container;
    constructor();
    show(message: string, type: ToastType): void;
}
declare const _default: ToastNotification;
export default _default;
//# sourceMappingURL=ToastNotification.d.ts.map