import { useState } from 'react';

export const useModal = (initialModalsCount = 1) => {
    const [modals, setModals] = useState(new Array(initialModalsCount).fill(false));

    const open = (index: number) => {
        setModals((prevModals) => {
            const newModals = [...prevModals];
            newModals[index] = true;
            return newModals;
        });
    };

    const close = (index: number) => {
        setModals((prevModals) => {
            const newModals = [...prevModals];
            newModals[index] = false;
            return newModals;
        });
    };

    const isOpen = (index: number) => modals[index];

    return {
        isOpen,
        open,
        close
    };
};
