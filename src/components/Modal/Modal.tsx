import { ReactNode } from 'react';
import style from './modal.module.scss';

interface ModalType {
    children?: ReactNode;
    isOpen: boolean;
    toggle: () => void;
}

export const Modal = (props: ModalType) => {
    return (
        <>
            {props.isOpen && (
                <div className={style.modalOverlay} onClick={props.toggle} data-testid="test-toggle-id">
                    <div onClick={(e) => e.stopPropagation()} className={style.modalBox}>
                        {props.children}
                    </div>
                </div>
            )}
        </>
    );
}