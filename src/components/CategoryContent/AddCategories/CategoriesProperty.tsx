import { FunctionComponent, useEffect } from "react";
import { CATEGORY_DEPTH } from "../../../constants/categoryConst";
import PropertyList from "./PropertyList";

interface CategoriesPropertyProps {
  prefix?: string;
  level: number;
  setPrefix: (value: boolean) => void;
}

const CategoriesProperty: FunctionComponent<CategoriesPropertyProps> = ({
  prefix = '',
  level,
  setPrefix
}) => {
  const twoLevelsCategory = CATEGORY_DEPTH * level;
  const showAddButton = prefix.length < twoLevelsCategory;
  
  useEffect(() => {
    setPrefix((!prefix));
  }, [prefix, setPrefix]);

  return <PropertyList
    prefix={prefix}
    showAddButton={showAddButton}
    level={level}
    setPrefix={setPrefix} />;
};

export default CategoriesProperty;