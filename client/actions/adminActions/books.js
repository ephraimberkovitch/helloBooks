import axios from 'axios';
import actionTypes from '../actionTypes';
import API from '../api';
import notify from '../notify';

/**
 * action creator for editing book
 *
 * @param  {Object} book
 *
 * @return {Object}     action object
 */
export const editBookAction = book => ({
  type: actionTypes.EDIT_BOOK_INFO,
  book,
});

/**
 * edit book Detail
 * @param  {Integer} id book Id
 * @param  {Object} data book data with with to update database
 *
 * @return {Object}      dispatches an action to the redux store
 */
export const editBook = (id, data) => () => (
  axios.put(`${API}/books/${id}`, data)
    .then((response) => {
      notify.success(response.data.message);
    })
    .catch(error => notify.error(error.response.data.message))
);

/**
 * action creator for adding new book
 *
 * @param  {Object} book
 *
 * @return {Object}     action object
 */
export const createBook = book => ({
  type: actionTypes.CREATE_BOOK,
  book,
});


/**
 * add new book to database
 *
 * @param  {Object} data  book data
 *
 * @return {Promise}      resolves with success message
 */
export const addBook = data => () => (
  axios.post(`${API}/books`, data)
    .then(response => notify.success(response.data.message))
    .catch(error => notify.error(error.response.data.message))
);


/**
 * action creator for borrowing books
 * @param  {Integer} id book id
 *
 * @return {Object}     action object
 */
export const deleteBookAction = id => ({
  type: actionTypes.DELETE_BOOK,
  id,
});


/**
 * send request to borrow a book from library
 * @param  {integer} bookId book id
 * @return {any}    dispatches an action to store
 */
export const deleteBook = bookId => dispatch => (
  axios.delete(`${API}/books/${bookId}`, { id: bookId })
    .then((response) => {
      dispatch(deleteBookAction(bookId));
      notify.success(response.data.message);
      return response;
    })
    .catch(error => notify.error(error.response.data.message))
);

/**
 * action creator for adding book category
 *
 * @param  {Object} category
 *
 * @return {Object}     action object
 */
export const addCategory = category => ({
  type: actionTypes.ADD_BOOK_CATEGORY,
  category,
});

/**
 * action creator for adding book category
 *
 * @param  {string} message
 *
 * @return {Object}     action object
 */
export const addCategoryFailure = message => ({
  type: actionTypes.ADD_BOOK_CATEGORY_FAILURE,
  message,
});

/**
 * addds a new book category
 *
 * @param  {Object} category new book category
 *
 * @return {Promise}          resolves with success message
 */
export const addBookCategory = category => () => (
  axios.post(`${API}/books/category`, { category })
    .then((response) => {
      notify.success(response.data.message);
    })
    .catch(error => notify.error(error.response.data.message))
);
