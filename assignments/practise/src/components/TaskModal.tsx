import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const TaskModal = ({ isOpen, onClose, children }: TaskModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div ref={modalRef} className="bg-[#161616] border border-white/15 w-full max-w-md rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition cursor-pointer"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
};

export default TaskModal;