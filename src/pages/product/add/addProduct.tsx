import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { PRODUCT_URL, POST_METHOD, CATEGORIES_URL, ATTRIBUTES_URL } from '../../../constants/apiConst';
import validationSchema from '../../../utils/validation/addPostValidationSchema';
import Preloader from '../../preloader/preloader';
import useForm from '../../../hooks/useForm';
import { useAppSelector } from '../../../hooks/useRedux';
import sortByProperty from '../../../utils/helpers/sortByProperty/sortByProperty';
import { useCheckboxContext } from '../../../context/checkboxProvider';
import { ImageFile } from '../../../types/imageFile';
import AddProductContent from '../../../components/ProductContent/AddProducts/AddProductContent';
import { CategoryResponse, DataResponse } from '../../../types/category';
import useFetchMultipleData from '../../../hooks/useFetchMultipleData';
import { Attributes } from '../../../types/attributes';

interface AddProductProps {
  title: string;
  content: string;
  price: string;
  discount?: string;
  size?: string;
  stock?: string;
  location?: string;
  images: ImageFile[];
  itemsImages: ImageFile[];
}

const AddProduct = () => {
  const { handleSubmit } = useForm(POST_METHOD, PRODUCT_URL);

  const { loading, fetchData } = useFetchMultipleData([CATEGORIES_URL, ATTRIBUTES_URL]);

  const [content, setContent] = useState<string>("");
  const [resetImages, setResetImages] = useState<boolean>(false);
  const [key, setKey] = useState(0);

  const { data: categoriesData, lastRequestStatus: catStatus }: DataResponse = useAppSelector((state) => state.data.categories);
  const { data: attributesData, lastRequestStatus: attStatus }: DataResponse = useAppSelector((state) => state.data.attributes);

  const sortedCategories = categoriesData ? sortByProperty(categoriesData, 'dateCreated') : undefined;

  const { checked, resetChecked } = useCheckboxContext();

  useEffect(() => {
    fetchData();
    resetChecked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (values: AddProductProps, { resetForm }: any) => {
    await handleSubmit(values, { resetForm });
    setContent('');
    setKey(prevKey => prevKey + 1);
    setResetImages(true);
    resetChecked();
  };

  return (
    <Preloader isLoading={loading}>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={{
          title: '',
          content: '',
          price: '',
          discount: '',
          size: '',
          stock: '',
          location: '',
          images: [],
          itemsImages: []
        }}
        validationSchema={validationSchema}
      >
        <Form>
          <h2>Add Product</h2>
          <AddProductContent
            setContent={setContent}
            content={content}
            resetImages={resetImages}
            setResetImages={setResetImages}
            categories={sortedCategories as CategoryResponse[]}
            attributes={attributesData as unknown as Attributes[]}
            checked={checked}
            componentKey={key}
            lastRequestStatus={catStatus && attStatus}
          />
        </Form>
      </Formik>
    </Preloader>
  );
};

export default AddProduct;
