import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { PRODUCT_URL, POST_METHOD, CATEGORIES_URL } from '../../../constants/apiConst';
import validationSchema from '../../../utils/validation/addPostValidationSchema';
import useFetchData from '../../../hooks/useDataFetching';
import Preloader from '../../preloader/preloader';
import useForm from '../../../hooks/useForm';
import { useAppSelector } from '../../../hooks/useRedux';
import sortByProperty from '../../../utils/helpers/sortByProperty';
import { useCheckboxContext } from '../../../context/checkboxProvider';
import { ImageFile } from '../../../types/imageFile';
import AddProductContent from '../../../components/ProductContent/AddProduct/AddProductContent';
import { CategoryResponse, DataResponse } from '../../../types/category';

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

  const { loading, fetchData } = useFetchData(CATEGORIES_URL);

  const [content, setContent] = useState<string>("");

  const [resetImages, setResetImages] = useState<boolean>(false);

  const { data, lastRequestStatus }: DataResponse = useAppSelector((state) => state.data.categories);

  const sortedCategories = data ? sortByProperty(data, 'dateCreated') : undefined;

  const { checkedCategories, resetCheckedCategories } = useCheckboxContext();

  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!sortedCategories || sortedCategories.length === 0) {
      fetchData();
    }
  }, [sortedCategories, fetchData]);

  const handleFormSubmit = async (values: AddProductProps, { resetForm }: any) => {
    await handleSubmit(values, { resetForm });
    setContent('');
    setKey(prevKey => prevKey + 1);
    setResetImages(true);
    resetCheckedCategories();
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
            checkedCategories={checkedCategories}
            componentKey={key}
            lastRequestStatus={lastRequestStatus}
          />
        </Form>
      </Formik>
    </Preloader>
  );
};

export default AddProduct;
