import React, { useCallback, useEffect, useState } from 'react';
import Routing from './routes/Routing';
import { CategoryResponse } from './types/category';
import { CATEGORIES_URL } from './constants/apiConst';
import { useAppDispatch } from './hooks/useRedux';
import { getAllAction } from './redux/actions/actions';
import Preloader from './pages/preloader/preloader';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [fetchedCategories, setFetchedCategories] = useState<CategoryResponse[] | undefined>(undefined);

  const fetchData = useCallback(async () => {
    const categories: CategoryResponse[] | undefined = await dispatch(getAllAction(CATEGORIES_URL));
    setFetchedCategories(categories);
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      {fetchedCategories ? (
        <div>
          <Routing />
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
};

export default App;
