import { DELETE_METHOD, GET_METHOD, POST_METHOD, PUT_METHOD } from '../../constants/apiConst';
import { GET_ALL_REQUEST, POST_REQUEST, PUT_REQUEST, DELETE_REQUEST } from './../../constants/actionConst';
import { deleteAction, getAllAction, postAction, putAction } from './actions';

describe('API Action Creators', () => {
  const testUrl = '/test/url';

  test('postAction creates expected action', () => {
    const formData = new FormData();
    const action = postAction(formData, testUrl);

    expect(action).toEqual({
      type: POST_REQUEST,
      meta: {
        api: {
          method: POST_METHOD,
          url: testUrl,
          formData
        }
      }
    });
  });

  test('putAction filters out image from values and creates expected action', () => {
    const formData = new FormData();
    const values = { name: 'Test', description: 'Description', image: 'imageData' };
    const action = putAction(formData, values, testUrl);

    expect(action).toEqual({
      type: PUT_REQUEST,
      meta: {
        api: {
          method: PUT_METHOD,
          url: testUrl,
          formData,
          payload: {
            name: 'Test',
            description: 'Description'
          }
        }
      }
    });
  });

  test('getAllAction creates expected action', () => {
    const action = getAllAction(testUrl);

    expect(action).toEqual({
      type: GET_ALL_REQUEST,
      meta: {
        api: {
          method: GET_METHOD,
          url: testUrl,
        }
      }
    });
  });

  test('deleteAction creates expected action with optional boolean', () => {
    const id = '123';
    const action = deleteAction(testUrl, id);

    expect(action).toEqual({
      type: DELETE_REQUEST,
      meta: {
        api: {
          method: DELETE_METHOD,
          url: testUrl,
          id
        }
      }
    });
  });
});
