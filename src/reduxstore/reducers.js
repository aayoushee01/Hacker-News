const initialState = {
  searchResults: [],
  postDetails: null,
  pending:false,
  morePending:false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS_PENDING':
      return {
        ...state,
        pending: true
      }
    case 'SET_MORE_SEARCH_RESULTS_PENDING':
      return {
        ...state,
        morePending: true
      }
    case 'SET_SEARCH_RESULTS':
      return { ...state, pending: false, searchResults: action.payload };
    case 'SET_MORE_SEARCH_RESULTS':
      const {searchResults} = state
      return { 
        ...state, 
        morePending: false, 
        searchResults:[...searchResults, ...action.payload ] 
      };
    case 'SET_POST_DETAILS':
      return { ...state, postDetails: action.payload };
    case 'CLEAR_SEARCH_RESULTS':
      return {
          ...state,
          searchResults: []
      };
    case 'CLEAR_POST_DETAILS':
      return {
          ...state,
          postDetails: null
      };
    
    default:
      return state;

  }
};

export default rootReducer;
