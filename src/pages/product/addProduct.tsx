import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import styles from '../../styles/productContent.module.scss'
import UploadImages from '../../components/UploadImages/UploadImages';
import ProductContent from '../../components/ProductContent/ProductContent';
import type { Product } from '../../types/product';
import type { ImageFile } from '../../types/imageFile';
import { submitProduct } from '../../api/productAPI';

interface ResetFunctions {
  resetForm: () => void;
  setImages: (ImageData: Array<ImageFile>) => void;
  setContent: (content: string) => void;
}

interface Props extends Product {
  onSubmit: (values: Product, resets: ResetFunctions) => Promise<void>;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
  isSubmitting: boolean;
}

const InnerForm: React.FC<Props> = ({
  title,
  price,
  discount,
  stock,
  imageNames,
  onSubmit,
  setIsSubmitting,
  isSubmitting,
}: Props) => {
  const [images, setImages] = useState<Array<ImageFile>>([]);
  const [content, setContent] = useState<string>('');

  const getImagesData = async (files: ImageFile[]): Promise<void> => {
    if (files.length !== 0) {
      setImages(files);
    }
  };

  const handleSubmit = useCallback(
    async (values: Product, resets: ResetFunctions) => {
      try {
        const updatedValues = { ...values, images, content };
        setIsSubmitting(true);
        await onSubmit(updatedValues, resets);
        setIsSubmitting(false);
      } catch (err) {
        console.error('Error during image processing:', err);
      }
    },
    [onSubmit, setIsSubmitting, images, content]
  );

  return (
    <Formik
      initialValues={{
        id: null,
        title: title || '',
        content: content || '',
        price: price || 0,
        discount: discount || 0,
        stock: stock || 0,
        imageNames: imageNames || '',
      }}
      onSubmit={(values, formikHelpers) =>
        handleSubmit(values, {
          resetForm: formikHelpers.resetForm,
          setImages,
          setContent,
        })
      }
      validationSchema={Yup.object().shape({
        title: Yup.string(),
        content: Yup.string(),
        price: Yup.number().positive().required('Price is required.'),
        discount: Yup.number(),
        stock: Yup.number(),
      })}
    >
  
        <div className={styles.container}>
          <Form>
            <div className={styles.columns}>
              <UploadImages getImages={getImagesData}  maxNumber={10} />
            </div>
            <div className={styles.columns}>
              <ProductContent
                setContent={setContent}
                content={content}
              />
              <div className={styles.saveButton}>
                <button type="submit" disabled={isSubmitting}>
                  Save
                </button>
              </div>
            </div>
          </Form>
        </div>
    </Formik>
  );
};

const AddProduct: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (
    values: Product, resets: ResetFunctions
  ): Promise<void> => {
    const { resetForm, setImages, setContent } = resets;
    const formData = appendDataToFormData(values);
    // console.log(Object.fromEntries(formData));
    submitProduct(formData);
    resetForm();
    setImages([]);
    setContent('');
  };

  return (
    <div>
      <InnerForm
        isSubmitting={isSubmitting}
        setIsSubmitting={setIsSubmitting}
        onSubmit={handleSubmit}
        title=""
        content=""
        price={0}
        discount={0}
        stock={0}
        imageNames=""
        id={null}
      />
    </div>
  );
};

const appendDataToFormData = (values: Product): FormData => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if ('file' in item) {
          formData.append(`images`, item.file);
        } else {
          console.error(`Invalid item format at index ${index}:`, item);
        }
      });
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

export default AddProduct;
