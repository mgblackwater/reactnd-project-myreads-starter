import React from 'react'
import BookShelfChanger from './book-shelf-changer'
import * as BooksAPI from '../BooksAPI'

const Book = (props) => {
    const { book } = props;


    return (
        <div className="book">
            <div className="book-top">
                {book.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>}
                <BookShelfChanger onShelfChange={(shelf) => props.onShelfChange(shelf)} currentShelf={book.shelf} />
            </div>
            <div className="book-title">{book.title}</div>
            {
                book.authors && book.authors.map((author) => <div key={author} className="book-authors">{author}</div>)
            }
        </div>)
}


export default Book