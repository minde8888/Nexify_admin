import sortByProperty from './sortByProperty';

jest.mock('../../validation/isValidDate', () => ({
    isValidDate: (dateString: string) => !isNaN(Date.parse(dateString))
}));

describe('sortByProperty function', () => {
    const testArray1 = [
        { id: '3', name: 'Charlie' },
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' }
    ];

    const testArray2 = [
        { id: '1', date: '2020-01-01' },
        { id: '2', date: '2021-01-01' },
        { id: '3', date: '2019-01-01' }
    ];

    test('sorts by string property in descending order by default', () => {

        const sortedArray = sortByProperty(testArray1, 'name');
        expect(sortedArray?.map((item) => item.id)).toEqual(['3', '2', '1']);
    });

    test('sorts by string property in ascending order when descending is false', () => {
        const sortedArray = sortByProperty(testArray1, 'name', false);
        expect(sortedArray?.map((item) => item.id)).toEqual(['1', '2', '3']);
    });

    test('sorts by date property in descending order', () => {

        const sortedArray = sortByProperty(testArray2, 'date');
        expect(sortedArray?.map((item) => item.id)).toEqual(['2', '1', '3']);
    });

    test('sorts by date property in ascending order when descending is false', () => {
        const sortedArray = sortByProperty(testArray2, 'date', false);
        expect(sortedArray?.map((item) => item.id)).toEqual(['3', '1', '2']);
    });

    test('returns undefined for undefined array', () => {
        const sortedArray = sortByProperty(undefined, 'name');
        expect(sortedArray).toBeUndefined();
    });

    test('returns undefined for empty array', () => {
        const sortedArray = sortByProperty([], 'name');
        expect(sortedArray).toBeUndefined();
    });
});
