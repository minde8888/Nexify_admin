import { useEffect } from "react";
import { ATTRIBUTES_URL } from "../../../constants/apiConst";
import useFetchData from "../../../hooks/useDataFetching";
import { useAppSelector } from "../../../hooks/useRedux";
import Preloader from "../../preloader/preloader";
import AllAttributesProperty from "../../../components/AttributesContent/AllAttributes/AllPostProperty/AllAttributesProperty";



const AllAttributes = () => {
    const { loading, fetchData } = useFetchData(ATTRIBUTES_URL);

    const { data, lastRequestStatus } = useAppSelector((state) => state.data.attributes);
    useEffect(() => {
        fetchData();
    }, [fetchData, lastRequestStatus]);

    return (
        <Preloader isLoading={loading}>
            <h2>Edit/Remove Blog Categories</h2>
            <AllAttributesProperty attributes={data} URL={ATTRIBUTES_URL} />
        </Preloader>
    );
};

export default AllAttributes;
