import { useEffect, useState } from 'react';

/* ================= STORE ================= */

let toasts = [];
let listeners = [];
let nextId = 1;

function emit() {
    listeners.forEach((fn) => fn(toasts));
}

function dismiss(id) {
    const ids = id === undefined ? toasts.map((t) => t.id) : [id];

    // a confirm toast closed without a choice counts as "cancel"
    toasts.forEach((t) => {
        if (ids.includes(t.id) && t.resolve) t.resolve(false);
    });

    toasts = toasts.map((t) => (ids.includes(t.id) ? { ...t, closing: true } : t));
    emit();

    setTimeout(() => {
        toasts = toasts.filter((t) => !ids.includes(t.id));
        emit();
    }, 300);
}

function add(type, message, options = {}) {
    const id = options.toastId !== undefined ? options.toastId : nextId++;

    if (toasts.some((t) => t.id === id && !t.closing)) return id;

    toasts = [
        ...toasts,
        {
            id,
            type,
            message,
            title: options.title,
            autoClose: options.autoClose !== undefined ? options.autoClose : 4000,
            closeOnClick: options.closeOnClick || false,
            hideProgressBar: options.hideProgressBar || false,
            closing: false,
            // only for confirm toasts
            resolve: options.resolve,
            confirmText: options.confirmText,
            cancelText: options.cancelText,
        },
    ];
    emit();
    return id;
}


export const toast = (message, options) => add('default', message, options);
toast.confirm = (message, options = {}) =>
    new Promise((resolve) => {
        add('warning', message, {
            title: options.title,
            confirmText: options.confirmText,
            cancelText: options.cancelText,
            autoClose: false,
            resolve,
        });
    });
toast.success = (message, options) => add('success', message, options);
toast.error = (message, options) => add('error', message, options);
toast.warning = (message, options) => add('warning', message, options);
toast.info = (message, options) => add('info', message, options);
toast.dismiss = dismiss;

/* ================= COMPONENTS ================= */
const svgProps = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
};

const ICONS = {
    success: (
        <svg {...svgProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12.5l2.7 2.7L16 9.5" />
        </svg>
    ),
    warning: (
        <svg {...svgProps}>
            <path d="M10.3 4.2L2.8 17.2a2 2 0 0 0 1.7 3h15a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z" />
            <path d="M12 9v4M12 17h.01" />
        </svg>
    ),
    error: (
        <svg {...svgProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5M12 16h.01" />
        </svg>
    ),
    info: (
        <svg {...svgProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
        </svg>
    ),
    default: (
        <svg {...svgProps}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
        </svg>
    ),
};

const CLOSE_ICON = (
    <svg {...svgProps} width={18} height={18}>
        <path d="M6 6l12 12M18 6L6 18" />
    </svg>
);

const TITLES = { success: 'Success', error: 'Error', warning: 'Warning', info: 'Info', default: 'Notification' };

function ToastItem({ item }) {
    return (
        <div
            className={`toast show toast-item toast-${item.type} ${item.closing ? 'toast-out' : 'toast-in'}`}
            role="alert"
            onClick={() => item.closeOnClick && dismiss(item.id)}
        >
            <div className="toast-row">
                <span className="toast-icon">{ICONS[item.type]}</span>

                <div className="toast-content">
                    <div className="toast-title">{item.title || TITLES[item.type]}</div>
                    <div className="toast-message">{item.message}</div>
                    {item.resolve && (
                        <div className="toast-actions">
                            <button
                                type="button"
                                className="toast-btn toast-btn-primary"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    item.resolve(true);
                                    dismiss(item.id);
                                }}
                            >
                                {item.confirmText || 'OK'}
                            </button>
                            <button
                                type="button"
                                className="toast-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    item.resolve(false);
                                    dismiss(item.id);
                                }}
                            >
                                {item.cancelText || 'Cancel'}
                            </button>
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    className="toast-close"
                    aria-label="Close"
                    onClick={(e) => {
                        e.stopPropagation();
                        dismiss(item.id);
                    }}
                >
                    {CLOSE_ICON}
                </button>
            </div>

            {item.autoClose !== false && !item.hideProgressBar && (
                <div className="toast-progress">
                    <div
                        className="toast-progress-bar"
                        style={{ animationDuration: `${item.autoClose}ms` }}
                        onAnimationEnd={() => dismiss(item.id)}
                    />
                </div>
            )}

            {item.autoClose !== false && item.hideProgressBar && (
                <span
                    className="toast-timer"
                    style={{ animationDuration: `${item.autoClose}ms` }}
                    onAnimationEnd={() => dismiss(item.id)}
                />
            )}
        </div>
    );
}

// position: top-right | top-left | top-center | bottom-right | bottom-left | bottom-center
export default function Toaster({ position = 'top-right', limit = 5, theme }) {
    const [list, setList] = useState(toasts);

    useEffect(() => {
        listeners.push(setList);
        return () => {
            listeners = listeners.filter((l) => l !== setList);
        };
    }, []);

    const isLight = !!document.querySelector('.light');

    const visible = list.slice(-limit);
    const ordered = position.startsWith('bottom') ? [...visible].reverse() : visible;

    return (
        <>
            <div
                className={`toast-stack toast-stack-${position} ${isLight ? 'toast-stack-light' : ''}`}
                style={position.startsWith('bottom') ? { flexDirection: 'column-reverse' } : undefined}
            >
                {ordered.map((item) => (
                    <ToastItem key={item.id} item={item} />
                ))}
            </div>
        </>
    );
}