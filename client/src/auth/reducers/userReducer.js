export const employeeReducer = (state = { employees: [] }, action) => {

    switch (action.type) {
      case 'ALL_EMPLOYEES_REQUEST':
        return {
          loading: true,
          employees: [],
        };
      case 'ALL_EMPLOYEES_SUCCESS':
        return {
          loading: false,
          employees: action.payload,
        };
  
      case 'ALL_EMPLOYEESS_FAIL':
        return {
          loading: false,
          error: action.payload,
        };
        
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };

  export const userReducer = (state = { User: {} }, action) => {
    switch (action.type) {
      case 'LOGIN_REQUEST':
      case 'REGISTER_REQUEST':
      case 'LOAD_USER_REQUEST':
      case 'UPDATE_USER_REQUEST':
        return {
          loading: true,
          isAuthenticated: false,
        };
  
      case 'LOGIN_SUCCESS':
      case 'REGISTER_SUCCESS':
      case 'LOAD_USER_SUCCESS':
      case 'UPDATE_USER_DATA':
        return {
          ...state,
          loading: false,
          isAuthenticated: true,
          User: action.payload,
        };
  
      case 'LOGOUT_SUCCESS':
        return {
          loading: false,
          user: null,
          isAuthenticated: false,
        };
  
      case 'LOAD_USER_FAIL':
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: null,
          error: action.payload,
        };
  
      case 'LOGIN_FAIL':
      case 'REGISTER_FAIL':
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          User: null,
          error: action.payload,
        };
  
      case 'LOGOUT_FAIL':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case 'CLEAR_ERRORS':
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  // export const forgotReducer = (state = {}, action) => {
  //   switch (action.type) {
  //     case FORGOT_REQUEST:
  //     case RESET_PASSWORD_REQUEST:
  //       return {
  //         ...state,
  //         loading: true,
  //         error: null,
  //       };
  
  //     case FORGOT_SUCCESS:
  //       return {
  //         ...state,
  //         loading: false,
  //         message: action.payload,
  //       };
  
  //     case RESET_PASSWORD_SUCCESS:
  //       return {
  //         ...state,
  //         loading: false,
  //         success: action.payload,
  //       };
  
  //     case FORGOT_FAIL:
  //     case RESET_PASSWORD_FAIL:
  //       return {
  //         ...state,
  //         loading: false,
  //         error: action.payload,
  //       };
  
  //     case CLEAR_ERRORS:
  //       return {
  //         ...state,
  //         error: null,
  //       };
  //     default:
  //       return state;
  //   }
  // };
