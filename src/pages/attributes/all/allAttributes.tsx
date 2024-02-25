import { useEffect } from "react";
import { ATTRIBUTES_URL } from "../../../constants/apiConst";
import useFetchData from "../../../hooks/useDataFetching";
import { useAppSelector } from "../../../hooks/useRedux";
import sortByProperty from "../../../utils/helpers/sortByProperty/sortByProperty";
import Preloader from "../../preloader/preloader";
import CategoryProperty from "../../../components/ComponentProperty/ComponentProperty";



const AllBlogCategories = () => {
    const { loading, fetchData } = useFetchData(ATTRIBUTES_URL);

    const {data, lastRequestStatus } = useAppSelector((state) => state.data.attributes);

    const sortedCategories = data ? sortByProperty(data, 'dateCreated') : undefined;

    useEffect(() => {
        if (!sortedCategories || sortedCategories.length === 0) {
            fetchData();
        }
    }, [sortedCategories, fetchData]);

    useEffect(() => {
        if (lastRequestStatus === true) {
            fetchData();
        }
    }, [lastRequestStatus, fetchData]);

    return (
        <Preloader isLoading={loading}>
            <h2>Edit/Remove Blog Categories</h2>
            {/* <CategoryProperty
                categories={sortedCategories as CategoryResponse[]}
                URL={ATTRIBUTES_URL}
                blog={true}
            /> */}
        </Preloader>
    );
};

export default AllBlogCategories;
