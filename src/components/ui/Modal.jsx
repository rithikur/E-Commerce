import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white shadow-2xl w-full max-w-lg overflow-hidden border border-brand-tertiary/60">
        <div className="px-6 py-4 border-b border-brand-tertiary/60 flex items-center justify-between bg-brand-bg/30">
          <h3 className="font-heading text-xl font-semibold text-brand-dark tracking-wide">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 text-brand-dark/50 hover:text-brand-dark transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
