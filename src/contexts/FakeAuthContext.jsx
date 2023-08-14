import { createContext, useContext, useReducer } from 'react';

const AuthContext = createContext();

const LOGIN = 'login';
const LOGOUT = 'logout';

/**
 * The initial state object representing the starting state of the user authentication.
 *
 * @type {Object}
 * @property {null} user - The current user object. Defaults to null.
 * @property {boolean} isAuthenticated - Indicates whether the user is authenticated. Defaults to false.
 */
const initialState = {
  user: null,
  isAuthenticated: false,
};

/**
 * This method takes in the current state and an action, and returns an updated state based on the action type.
 *
 * @param {typeof initialState} state - The current state of the application.
 * @param {object} action - An object containing the action type and payload.
 * @param action.payload {any} - Action payload
 * @param action.type {string} - Type of an action
 * @return {typeof initialState} - The updated state with the user property modified.
 */
function reducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };

    case LOGOUT:
      return initialState;

    default:
      throw new Error('Unknown action!');
  }
}

const FAKE_USER = {
  name: 'Jack',
  email: 'jack@example.com',
  password: 'qwerty',
  avatar: 'https://i.pravatar.cc/100?u=zz',
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  /**
   * Login the user
   *
   * @param email {string}
   * @param password {string}
   */
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: LOGIN, payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: LOGOUT });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * @return {typeof initialState}
 */
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error('Context was use outside the AuthProvider');

  return context;
}

export { AuthProvider, useAuth };
