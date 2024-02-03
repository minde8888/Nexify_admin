import { FunctionComponent } from "react";
import { CATEGORY_DEPTH } from "../../../../constants/categoryConst";
import PropertyList from "../PropertyList/PropertyList";

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
  const showAddButton = prefix.length < CATEGORY_DEPTH * level;

  return (
    <PropertyList
      prefix={prefix}
      showAddButton={showAddButton}
      level={level}
      setPrefix={setPrefix} />
  );
};

export default CategoriesProperty;