"use client";

export default function ConfirmDialog({ 
  isOpen, 
  title, 
  message, 
  confirmText = "Onayla",
  cancelText = "İptal",
  confirmColor = "cyan",
  onConfirm, 
  onCancel 
}) {
  if (!isOpen) return null;

  const colorStyles = {
    cyan: "bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600",
    red: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700",
    green: "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700",
    purple: "bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700",
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
      <div className="glass rounded-2xl max-w-md w-full border border-slate-700 animate-fade-in-up">
        <div className="p-6">
          {/* Icon */}
          <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-white text-center mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-slate-400 text-center mb-6">
            {message}
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors font-medium"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`flex-1 px-4 py-3 text-white rounded-xl transition-all font-medium ${colorStyles[confirmColor] || colorStyles.cyan}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

