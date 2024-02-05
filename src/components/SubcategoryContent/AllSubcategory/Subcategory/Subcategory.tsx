import  { FunctionComponent } from 'react';
import { SubcategoryResponse } from '../../../../types/category';
import styles from './subcategory.module.scss';

interface SubcategoryPropertiesProps {
    subcategories?: SubcategoryResponse[];
}

const Subcategory: FunctionComponent<SubcategoryPropertiesProps> =
    ({ subcategories }) => (
        <>
            {subcategories?.map((subcategory) => (
                <div key={subcategory.id} className={styles.subcategory}>
                    <div>{subcategory.categoryName}</div>
                </div>
            ))}
        </>
    );
export default Subcategory;
