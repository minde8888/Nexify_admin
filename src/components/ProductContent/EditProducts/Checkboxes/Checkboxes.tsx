import React from "react";
import { CategoryResponse } from "../../../../types/category";
import { CheckboxField } from "../../../InputFields/CheckboxField";
import { Attributes } from "../../../../types/attributes";
import styles from '../../../../styles/productContent.module.scss';

type CheckboxesProps = {
    categories?: CategoryResponse[];
    attributes?: Attributes[];
};

const Checkboxes: React.FC<CheckboxesProps> = ({ categories, attributes }) => (
    <>
        {categories && <div className={`${styles.columns} ${styles.checkboxContainer}`}>
            {categories?.map((category) => (
                <div key={category.id}>
                    <>
                        <CheckboxField
                            name={category.id}
                            label={category.title}
                            className={styles.checkbox}
                        />
                        {category.subcategories?.map((subcategory) => (
                            <div key={subcategory.id} className={styles.subcategories}>
                                <CheckboxField
                                    name={subcategory.id}
                                    label={subcategory.title}
                                    className={styles.checkbox}
                                />
                            </div>
                        ))}
                    </>
                </div>
            ))}
        </div>}
        {attributes && <div>
            {attributes?.map((attribute) => (
                <div key={attribute.id} className={styles.subcategories}>
                    <CheckboxField
                        name={attribute.id?.toString() || ''}
                        label={attribute.attributeName}
                        className={styles.checkbox}
                    />
                </div>
            ))}
        </div>}
    </>
);

export default Checkboxes;
