import express from 'express';

import userController from '../controllers/userController';
import bookController from '../controllers/bookController';
import transactionController from '../controllers/transactionController';

import authenticate from '../middleware/authenticate';
import shouldBorrowBook from '../middleware/shouldBorrowBook';
import ensureIsAdmin from '../middleware/ensureIsAdmin';
import validateInput from '../middleware/validateInput';
import prepareGoogleAuth from '../middleware/prepareGoogleAuth';
import validateLimitAndOffset from '../middleware/validateLimitAndOffset';


const router = express.Router();

router.get('/', (req, res) => res.status(200).send({
  message: 'Welcome to the Hello Books API!'
}))
  // Unprotected routes
  .post(
    '/users/signup',
    prepareGoogleAuth,
    validateInput.signup,
    userController.createUser
  )
  .post(
    '/users/signin',
    prepareGoogleAuth,
    validateInput.signin,
    userController.getUser
  )
  .post('/users/forgot-password',
    validateInput.requestPasswordReset,
    UserController.passwordResetMail)
  .get('/books/category', BookController.getBookCategories)

  .get(
    '/books/suggestions',
    BookController.suggestedBooks
  )
  .get('/books/:id', validateInput.validateId, BookController.getBook)

  .get('/books', validateLimitAndOffset, BookController.getBooks)

  // Protected routes
  .put(
    '/users/reset-password/:token',
    authenticate,
    validateInput.updateUser,
    userController.updateUserInfo
  )
  .put(
    '/users',
    authenticate,
    validateInput.updateUser,
    userController.updateUserInfo
  )
  .post(
    '/users/:id/books',
    authenticate,
    validateInput.validateId,
    shouldBorrowBook,
    bookController.borrowBook
  )
  .put(
    '/users/:id/books',
    authenticate,
    validateInput.validateId,
    bookController.returnBook
  )
  .get(
    '/users/:id/books',
    authenticate,
    validateInput.validateId,
    userController.getBorrowedBooks
  )
  .get(
    '/users/:id/transactions',
    authenticate,
    validateInput.validateId,
    (req, res) => transactionController(req, res, { history: true })
  )
  .post(
    '/users/reset-password/:token',
    authenticate,
    userController.updateUserInfo
  )

  // Admin-specific routes
  .post(
    '/books/category',
    authenticate,
    ensureIsAdmin,
    bookController.addCategory
  )
  .post(
    '/books',
    authenticate,
    ensureIsAdmin,
    validateInput.addBook,
    bookController.createBook
  )
  .delete(
    '/books/:id',
    authenticate,
    ensureIsAdmin,
    validateInput.validateId,
    bookController.deleteBook
  )
  .put(
    '/books/:id',
    authenticate,
    ensureIsAdmin,
    validateInput.validateId,
    validateInput.updateBook,
    bookController.editBookInfo
  )
  .get(
    '/admin-notifications',
    authenticate,
    ensureIsAdmin,
    (req, res) => transactionController(req, res, { admin: true })
  )
  // Send a message if route does not exist
  .get('*', (req, res) => res.status(404).send({
    message: 'Seems like you might be lost',
  }));

export default router;
