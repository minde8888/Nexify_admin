import { Attributes } from "../../../types/attributes";
import { processAttribute, processCategory } from "./processData";


describe('processCategory', () => {
  let formData: FormData;

  beforeEach(() => {
    formData = new FormData();
    formData.append = jest.fn(); 
  });

  test('appends basic category data correctly', () => {
    const category = {
      id: '1',
      '': 'Test Category'
    };

    processCategory(formData, category, 0);

    expect(formData.append).toHaveBeenCalledWith('categories[0].categoryName', 'Test Category');
  });

  test('appends category with properties correctly', () => {
    const category = {
      id: '2',
      '': 'Another Category',
      properties: [{ '': 'Subcategory 1' }, { '': 'Subcategory 2' }]
    };

    processCategory(formData, category, 1);

    expect(formData.append).toHaveBeenCalledWith('categories[1].categoryName', 'Another Category');
    expect(formData.append).toHaveBeenCalledWith('categories[1].subcategories[0].categoryName', 'Subcategory 1');
    expect(formData.append).toHaveBeenCalledWith('categories[1].subcategories[1].categoryName', 'Subcategory 2');
  });

  test('handles optional fields correctly', () => {
    const category = {
      id: '3',
      '': 'Category with Optional',
      categoryId: 'optionalId'
    };

    processCategory(formData, category, 2, 'optionalId');

    expect(formData.append).toHaveBeenCalledWith('categories[2].categoryId', 'optionalId');
    expect(formData.append).toHaveBeenCalledWith('categories[2].categoryName', 'Category with Optional');
  });

  test('handles multiple attributes correctly', () => {
    const attributes: Attributes[] = [
      { '': 'Attribute Name 1', attributeName: '', imageName: 'Description 1' }, 
      { '': 'Attribute Name 2', attributeName: '', imageName: 'Description 2' }
    ];
    
    attributes.forEach((attribute, index) => {
      processAttribute(formData, attribute, index);
    });

    expect(formData.append).toHaveBeenCalledWith('attributes[0].attributeName', 'Attribute Name 1');
    expect(formData.append).toHaveBeenCalledWith('attributes[1].attributeName', 'Attribute Name 2');
  });
});
