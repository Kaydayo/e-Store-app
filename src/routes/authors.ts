import express from 'express';
import { 
    getAllAuthors, 
    postAuthors, 
    updateAuthor, 
    getAuthor, 
    deleteAuthor, 
    postBook, 
    deleteBook, 
    getABook, 
    loginAuthor, 
    registerAuthor, 
    logoutAuthor, 
    getAllBooks, 
    updateBook 
} from '../controller/books.controller';
import { isAuth } from '../auth/isAuth'
import Authors from '../models/authors.model';
import Books from '../models/book.model';
import { pagination, paginateBooks } from '../utils/pagination';
const router = express.Router();

router.get('/authors', isAuth, pagination(Authors), getAllAuthors)
router.get('/authors/:id', isAuth, getAuthor)
router.get('/books/:id/:bookId', isAuth, getABook)
router.get('/books/:id', isAuth, paginateBooks(Books), getAllBooks)

router.post('/authors', isAuth, postAuthors);
router.post('/books/:id', isAuth, postBook);
router.post('/register', registerAuthor);
router.post('/login', loginAuthor);
router.post('/logout', logoutAuthor);


router.put('/authors/:id', isAuth, updateAuthor)
router.put('/books/:id/:bookId', isAuth, updateBook)


router.delete('/authors/:id', isAuth, deleteAuthor)
router.delete('/books/:id/:bookId', isAuth, deleteBook)






export default router;