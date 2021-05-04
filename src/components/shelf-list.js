import React from "react"
import BookShelf from './book-shelf'


class ShelfList extends React.Component {


    render() {
        return (<div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>

                    {this.props.shelfs.map(shelf => <BookShelf onShelfChange={(book, shelf) => this.props.onShelfChange(book, shelf)} key={shelf.name} books={shelf.books} shelf={shelf.name} />)}

                </div>
            </div>
            <div className="open-search">
                <button onClick={() => this.props.history.push('/search')}>Add a book</button>
            </div>
        </div>);
    }

}

export default ShelfList