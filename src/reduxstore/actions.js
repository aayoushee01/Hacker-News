import { fetchSearchResults, fetchPostDetails } from '../utils/api';

export const SET_SEARCH_RESULTS_PENDING = 'SET_SEARCH_RESULTS_PENDING';
export const SET_MORE_SEARCH_RESULTS_PENDING = 'SET_MORE_SEARCH_RESULTS_PENDING';
export const SET_MORE_SEARCH_RESULTS = 'SET_MORE_SEARCH_RESULTS';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_POST_DETAILS = 'SET_POST_DETAILS';
export const CLEAR_POST_DETAILS = 'CLEAR_POST_DETAILS';

export const setSearchResults = (results) => ({
  type: SET_SEARCH_RESULTS,
  payload: results,
});
export const setMoreSearchResults = (results) => ({
  type: SET_MORE_SEARCH_RESULTS,
  payload: results,
});

export const clearSearchResults = () => {
  return {
    type: 'CLEAR_SEARCH_RESULTS'
  };
};
export const setPostDetails = (details) => ({
  type: SET_POST_DETAILS,
  payload: details,
});

export const clearPostDetails = () => ({
  type: CLEAR_POST_DETAILS,
});


export function fetchSearchResultsActionPending() {
  return {
    type: SET_SEARCH_RESULTS_PENDING
  }
}

export function fetchMoreSearchResultsActionPending() {
  return {
    type: SET_MORE_SEARCH_RESULTS_PENDING
  }
}
export const fetchSearchResultsAction = (query) => {
  return async (dispatch) => {
    dispatch(fetchSearchResultsActionPending());
    try {
      const results = await fetchSearchResults(query, 1);
      dispatch(setSearchResults(results));
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
};
export const fetchMoreSearchResultsAction = (query, page) => {
  return async (dispatch) => {
    dispatch(fetchMoreSearchResultsActionPending());
    try {
      const results = await fetchSearchResults(query, page);
      dispatch(setMoreSearchResults(results));
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
};

export const fetchPostDetailsAction = (postId) => {
  return async (dispatch) => {
    try {
      const details = await fetchPostDetails(postId);
      dispatch(setPostDetails(details));
    } catch (error) {
      // Handle error
      console.error('Error fetching post details:', error);
    }
  };
};
