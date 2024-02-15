import { findIndexById } from "./findIndexById";

describe('findIndexById function', () => {
    const testArray = [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' },
        { id: '3', name: 'Item 3' },
      ];

    test('should return the correct index for a matching ID', () => {
      const result = findIndexById(testArray, '2', 'id');
      expect(result).toBe(1);
    });
  
    test('should return -1 when no element with the specified ID is found', () => {
      const result = findIndexById(testArray, '4', 'id');
      expect(result).toBe(-1);
    });
  
    test('should return -1 for an empty array', () => {
      const testArray: any[] = [];
      const result = findIndexById(testArray, '1', 'id');
      expect(result).toBe(-1);
    });
  
    test('should handle arrays where elements do not have the specified ID property', () => {
      const testArray = [
        { name: 'Item 1' },
        { name: 'Item 2' },
        { name: 'Item 3' },
      ];
      const result = findIndexById(testArray, '1', 'id');
      expect(result).toBe(-1);
    });
  });
  