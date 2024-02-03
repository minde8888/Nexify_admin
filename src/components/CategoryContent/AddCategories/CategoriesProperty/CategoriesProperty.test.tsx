import { render } from '@testing-library/react';
import CategoriesProperty from './CategoriesProperty';
import { CATEGORY_DEPTH } from '../../../../constants/categoryConst';
import PropertyList from '../PropertyList/PropertyList';


jest.mock('../PropertyList/PropertyList.tsx', () => {
    return jest.fn(() => null);
});


// Assuming PropertyList is already mocked above

describe('CategoriesProperty', () => {
    test('renders PropertyList with correct props for given prefix and level', () => {
        const setPrefixMock = jest.fn();
        const prefix = 'test';
        const level = 1;
        render(<CategoriesProperty prefix={prefix} level={level} setPrefix={setPrefixMock} />);

        expect(PropertyList).toHaveBeenCalledWith(expect.objectContaining({
            prefix: prefix,
            level: level,
            showAddButton: expect.any(Boolean),
            setPrefix: setPrefixMock
        }), expect.anything());
    });

    test('calculates showAddButton correctly based on prefix length and level', () => {
        const setPrefixMock = jest.fn();
        const longPrefix = 'test';
        const level = 1;
        render(<CategoriesProperty prefix={longPrefix} level={level} setPrefix={setPrefixMock} />);

        const expectedShowAddButton = longPrefix.length < CATEGORY_DEPTH * level;
        expect(PropertyList).toHaveBeenCalledWith(expect.objectContaining({
            showAddButton: expectedShowAddButton
        }), expect.anything());
    });
});

