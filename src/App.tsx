import { useCallback, useEffect } from 'react';
import Routing from './routes/Routing';
import { CategoryResponse } from './types/category';
import { CATEGORIES_URL } from './constants/apiConst';
import { useAppDispatch } from './hooks/useRedux';
import { getAllAction } from './redux/actions/actions';

const App = (): JSX.Element => {
    const dispatch = useAppDispatch();

    const fetchData = useCallback(async () => {
        const fetchedCategories: CategoryResponse[] | undefined = dispatch(getAllAction(CATEGORIES_URL));
        if (!fetchedCategories) return;
    }, [dispatch]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div >
            <Routing />
        </div>
    );
}

export default App;