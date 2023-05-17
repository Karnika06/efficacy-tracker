
  
  export const feedbackReducer = (state = { feedbacks: [] }, action) => {

    switch (action.type) {
      case 'ALL_FEEDBACK_REQUEST':
        return {
          loading: true,
          feedbacks: [],
        };
      case 'ALL_FEEDBACK_SUCCESS':
        return {
          loading: false,
          feedbacks: action.payload,
        };
  
      case 'ALL_FEEDBACK_FAIL':
        return {
          loading: false,
          feedbacks: action.payload,
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