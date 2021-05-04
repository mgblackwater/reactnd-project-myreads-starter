import React from "react";
import * as BooksAPI from '../BooksAPI'
import Book from './book'

export default class SearchBook extends React.Component {

    state = { books: [] }

    setResult = (query) => {
        BooksAPI.search(query)
            .then(books => {
                if (books && !books.error) {
                    BooksAPI.getAll()
                        .then(booksWithShelf => {

                            // return the book with shelf details if the book is already in shelf. 
                            // Search api doesn't return shelf info.
                            if (booksWithShelf && !booksWithShelf.error && booksWithShelf.length > 0) {
                                const mergeBooks = books.map(book => {

                                    const bookInShelf = booksWithShelf.find((temp) => book.id === temp.id)
                                    console.log('name', book.name)
                                    console.log('book', book)
                                    console.log('bookInShelf', bookInShelf)

                                    if (bookInShelf) return bookInShelf
                                    return book
                                })
                                this.setState({ books: mergeBooks })
                                return
                            }

                            this.setState({ books })
                        })

                }
                else {
                    this.setState({ books: [] })
                }
            })
    }

    render() {
        return (<div className="search-books">
            <div className="search-books-bar">
                <button className="close-search" onClick={() => this.props.onSearchClose()}>Close</button>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" onChange={(event) => this.setResult(event.target.value)} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">{
                    this.state.books.map((book) =>
                        <Book onShelfChange={(shelf) => this.props.onShelfChange(book, shelf)} key={book.id} book={book} />
                    )}</ol>
            </div>
        </div>);
    }

}
