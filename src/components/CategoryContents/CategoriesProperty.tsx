import React, { FunctionComponent } from "react";
import { CATEGORY_DEPTH } from "../../constants/categoryConst";
import PropertyList from "./PropertyList";

interface CategoriesPropertyProps {
  prefix?: string;
}

const CategoriesProperty: FunctionComponent<CategoriesPropertyProps> = ({
  prefix = '',
}) => {
  const twoLevelsCategory = CATEGORY_DEPTH * 2;
  const showAddButton = prefix.length < twoLevelsCategory;

  return <PropertyList prefix={prefix} showAddButton={showAddButton} />;
};

export default CategoriesProperty;
