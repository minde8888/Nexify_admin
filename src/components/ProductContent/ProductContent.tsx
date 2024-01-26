import { TextInputField } from '../InputFields/TextInputField';
import styles from '../../styles/productContent.module.scss'
import { useState } from 'react';
import EnhancedMdxEditorComponent from '../MarkDownEditor/EnhancedMdxEditorComponent';


const ProductContent = () => {

    const [showEditor, setShowEditor] = useState<boolean>(true);

    const handleToggle = () => {
        setShowEditor((prev) => !prev);
    };

    return (
        <>
            <h3>Product</h3>
            <div className={`${styles.preview} ${styles.buttonContainer}`}>
                <button type="button" onClick={handleToggle}>
                    {showEditor ? "Preview" : "Edit"}
                </button>
            </div>
            <div className={styles.items}>
                {showEditor && (<TextInputField label="" className={styles.profileInput} name="title" id='title' />)}
                <EnhancedMdxEditorComponent  width='95%' setContent={function (value: string): void {
                    throw new Error('Function not implemented.');
                } } content={''} />
                {showEditor && (
                    <div className={styles.numberItems}>
                        <div className={styles.profileInputNumber}>
                            <TextInputField label="Price" className={styles.numberItem} id="price" name="price" />
                        </div>
                        <div className={styles.profileInputNumber}>
                            <TextInputField label="Stock" className={styles.numberItem} id="stock" name="stock" />
                        </div>
                        <div className={styles.profileInputNumber}>
                            <TextInputField label="Discount" className={styles.numberItem} id="discount" name="discount" />
                        </div>
                    </div>)}
            </div>
        </>
    );
};

export default ProductContent;