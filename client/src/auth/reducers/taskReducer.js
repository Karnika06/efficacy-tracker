
  
  export const taskReducer = (state = { tasks: [] }, action) => {

    switch (action.type) {
      case 'ALL_TASKS_REQUEST':
        return {
          loading: true,
          tasks: [],
        };
      case 'ALL_TASKS_SUCCESS':
        return {
          loading: false,
          tasks: action.payload,
        };
  
      case 'ALL_TASKS_FAIL':
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