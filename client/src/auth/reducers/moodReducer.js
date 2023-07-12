
export const moodReducer = (state = { moodEntry: '' }, action) => {

    switch (action.type) {
      case 'MOOD_ENTRY_REQUEST':
        return {
          loading: true,
          moodEntry: '',
        };
      case 'MOOD_ENTRY_SUCCESS':
        return {
          loading: false,
          moodEntry: action.payload,
        };
  
      case 'MOOD_ENTRY_FAIL':
        return {
          loading: false,
          moodEntry: action.payload,
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