import authReducer, {
    registerFail,
    loginSuccess,
    loginFail,
    userLogout,
    changeRefreshToken,
  } from './authSlice';
  
  describe('auth reducer', () => {
    const initialState = {
      isLoggedIn: true,
      error: null,
      token: '',
      refreshToken: '',
    };
  
    test('should handle initial state', () => {       
        const expectedInitialState = {
          isLoggedIn: true,
        };      
        expect(authReducer(undefined, { type: 'unknown' })).toEqual(expectedInitialState);
      });
      
  
    test('should handle registerFail', () => {
      const errorMessage = 'Failed to register';
      const nextState = authReducer(initialState, registerFail(errorMessage));
      expect(nextState).toEqual({
        ...initialState,
        isLoggedIn: false,
        error: errorMessage,
      });
    });
  
    test('should handle loginSuccess', () => {
      const payload = { token: 'newToken', refreshToken: 'newRefreshToken' };
      const nextState = authReducer(initialState, loginSuccess(payload));
      expect(nextState).toEqual({
        ...initialState,
        isLoggedIn: true,
        token: payload.token,
        refreshToken: payload.refreshToken,
      });
    });
  
    test('should handle loginFail', () => {
      const errorMessage = 'Login failed';
      const nextState = authReducer(initialState, loginFail(errorMessage));
      expect(nextState).toEqual({
        ...initialState,
        isLoggedIn: false,
        error: errorMessage,
      });
    });
  
    test('should handle userLogout', () => {
      const nextState = authReducer(initialState, userLogout());
      expect(nextState).toEqual({
        ...initialState,
        isLoggedIn: false,
        token: '',
        refreshToken: '',
      });
    });
  
    test('should handle changeRefreshToken', () => {
      const payload = { token: 'changedToken', refreshToken: 'changedRefreshToken' };
      const nextState = authReducer(initialState, changeRefreshToken(payload));
      expect(nextState).toEqual({
        ...initialState,
        token: payload.token,
        refreshToken: payload.refreshToken,
      });
    });
  });
  