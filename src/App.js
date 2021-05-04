import React from 'react'
import { SearchBook, ShelfList } from './components'
import { CurrentlyReading, WantToRead, Read } from './temp-data'
import { Route, Router, Switch } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
// import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    shelfs: []
  }

  getBooks = () => {
    BooksAPI.getAll().then(books => {

      if (books) {
        this.setState((currentState) => {
          console.log('books', books)
          return {
            ...currentState,
            shelfs: [
              { name: 'Currently Reading', books: books.filter(book => book.shelf === 'currentlyReading') },
              { name: 'Want to Read', books: books.filter(book => book.shelf === 'wantToRead') },
              { name: 'Read', books: books.filter(book => book.shelf === 'read') }
            ]
          }
        })
      }
    })
  }

  componentDidMount() {
    this.getBooks()
  }

  onSearchClose = (history) => {
    history.push('/')
    this.getBooks()
  }

  onShelfChange = (book, shelf) => {

    if (shelf === 'None')
      shelf = ''
    BooksAPI.update(book, shelf).then(() =>
      this.getBooks())
  }

  render() {
    return (
      <div className="app" >
        <Switch>
          <Route path="/search" render={({ history }) => (<SearchBook onShelfChange={(book, shelf) => this.onShelfChange(book, shelf)} onSearchClose={() => this.onSearchClose(history)} />)} />
          <Route path="/" render={({ history }) => (<ShelfList onShelfChange={(book, shelf) => this.onShelfChange(book, shelf)} shelfs={this.state.shelfs} history={history} />)} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp