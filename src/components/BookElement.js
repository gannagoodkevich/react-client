import React, {Component} from "react";
import { FaEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import styled from "styled-components";
import BOOKS, {UPDATE_BOOK} from "./../queries/books_query";
import {DELETE_BOOK} from "./../queries/books_query";
import {Mutation} from "react-apollo";
import {LIBRARIES} from "../queries/libraries_query";
import Comment from "./Comment";
import NewComment from "./NewComment";
import { makeStyles } from '@material-ui/core/styles';
import UpdateBookButton from "./BottunStyle";

const Input = styled.input.attrs(props => ({
    type: "text",
    size: "0.5em",
}))`
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  color: #282c34;
  font-size: 0.5em;
  border: 2px solid #282c34;
  border-radius: 3px;
`;

class BookElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: 'no'
        };

        this.onCLickEdit = this.onCLickEdit.bind(this);
        this.onCLickDelete = this.onCLickDelete.bind(this);
    }

    updateCache = (cache, { data: {deleteBook} }) => {
            const { allBooks } = cache.readQuery({  query: BOOKS});

            console.log(deleteBook.id);

            cache.writeQuery({
                query: BOOKS,
                data: {
                    allBooks: allBooks.filter(n => n.id !== deleteBook.id)
                }
            });
            const { allLibraries } = cache.readQuery({  query: LIBRARIES });

            const mappedArray = allLibraries.map((library) => {
                    library.books = library.books.filter(n => n.id !== deleteBook.id);
                    return library
            });
            cache.writeQuery({
                query: LIBRARIES,
                data: {
                    allLibraries: allLibraries
                }
            })
    };

    onCLickEdit(books_id){
        console.log("Edit pressed");
        console.log(books_id);
        this.setState({editable: 'yes'});
    };

    onCLickDelete(books_id){
        console.log("Delete pressed");
        console.log(books_id);
        this.setState({delete: 'yes'});
    };

    render() {
        if ( this.state.editable == 'no' ){
            return (
                <div className="container">
                    <h4><b>Title: {this.props.title}</b> <b className="Title"><FaEdit onClick={() => this.onCLickEdit(this.props.book_id)}/>
                    <Mutation mutation={DELETE_BOOK} update={this.updateCache}>
                        { deleteBook => (
                            <TiDeleteOutline onClick={() =>
                                deleteBook({ variables: { id: this.props.book_id, authorId: this.props.author.id}})
                            } />
                        )}
                    </Mutation>

                    </b></h4>
                    <p>Genre: {this.props.genre}</p>
                    <p>Written by: {this.props.author.name}</p>
                        Comments:
                        {this.props.comments.map((comment) => {
                            return <Comment comment_id={comment.id} content={comment.content}/>
                        })}
                        <NewComment book_id={this.props.book_id} />
                </div>
            )
        }
        else{
            return (
                <Mutation mutation={UPDATE_BOOK}>
                    {updateBook => (
                        <div className="container">
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateBook({ variables: { id: this.props.book_id, authorId: this.props.author.id, title: this.input_title.value, genre: this.input_genre.value } });

                                    this.setState({editable: 'no'});
                                }}
                            >
                                <div class='form-book'>
                                    <h4> <b>Title: <Input defaultValue={this.props.title}
                                                          ref={node => {
                                                              this.input_title = node;
                                                          }} />
                                    </b></h4>

                                    <p></p>
                                    Genre: <Input defaultValue={this.props.genre}
                                    ref={node => {
                                        this.input_genre = node;
                                    }}
                                />
                                <p></p>
                                    <div className="book-button">
                                        {UpdateBookButton()}
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                </Mutation>
            )
        }

    }
}

export default BookElement;
