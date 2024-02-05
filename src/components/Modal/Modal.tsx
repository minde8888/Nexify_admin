import { ReactNode } from 'react';
import style from './modal.module.scss';

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

export const Modal = ({ children, isOpen, toggle, }: ModalType) => {
    return (
        <>
            {isOpen && (
                <div className={style.modalOverlay} onClick={toggle} data-testid="test-toggle-id">
                    <div onClick={(e) => e.stopPropagation()} className={style.modalBox}>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}