// _components/Modal.jsx
import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Modal({ title, children, onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
                <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800">
                    <XMarkIcon className="w-6 h-6" />
                </button>
                {title && <h2 className="text-xl font-semibold mb-4 text-center">{title}</h2>}
                <div>{children}</div>
            </div>
        </div>
    );
}
