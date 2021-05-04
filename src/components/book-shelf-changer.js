import React from 'react'

class BookShelfChanger extends React.Component {

    state = {
        shelf: this.props.currentShelf ? this.props.currentShelf : 'none'
    }

    render() {
        return (<div className="book-shelf-changer">
            <select onChange={e => {
                this.setState({ shelf: e.target.value })
                this.props.onShelfChange(e.target.value);
            }} value={this.state.shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>);
    }

}

export default BookShelfChanger