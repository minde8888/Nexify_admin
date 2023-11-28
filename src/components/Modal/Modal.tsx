import { ReactNode } from 'react';
import style from './modal.module.scss';

interface ModalProps {
    children?: ReactNode;
    isOpen: boolean;
    open: () => void;
}

export const Modal = ({ children, isOpen, open }: ModalProps) => {
    
    return (
        <>
            {isOpen && (
                <div className={style.modalOverlay} onClick={open} data-testid="modal-overlay">
                    <div onClick={(e) => e.stopPropagation()} className={style.modalBox} data-testid="modal-box">
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}
