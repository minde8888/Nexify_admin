import { ReactNode } from 'react';
import style from './modal.module.scss';

interface CustomModalProps {
    children?: ReactNode;
    isOpen: boolean;
    open: () => void;
}

export const CustomModal = ({ children, isOpen, open }: CustomModalProps) => {
    
    return (
        <>
            {isOpen && (
                <div className={style.modalOverlay} onClick={open} data-testid="modal-overlay-id">
                    <div onClick={(e) => e.stopPropagation()} className={style.modalBox} >
                        {children}
                    </div>
                </div>
            )}
        </>
    );
}
