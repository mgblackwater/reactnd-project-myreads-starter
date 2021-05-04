import React from 'react'
import Book from './book'

const BookShelf = (props) => (
    <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelf}</h2>
        <div className="bookshelf-books">
            <ol className="books-grid">
                {
                    props.books.map((book) =>
                        <Book onShelfChange={(shelf) => props.onShelfChange(book, shelf)} key={book.id} book={book} />
                    )
                }
            </ol>
        </div>
    </div>
)

export default BookShelf;