import React, {Component} from "react";
import { FaEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import styled from "styled-components";
import BOOKS, {UPDATE_BOOK} from "./../queries/books_query";
import {DELETE_BOOK} from "./../queries/books_query";
import {Mutation} from "react-apollo";
import { useQuery, useMutation } from '@apollo/react-hooks';

const Button = styled.button`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: #282c34;
  border: 2px solid #282c34;
`;

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

const updateCache = (cache, { data: {deleteBook} }) => {
    const { allBooks } = cache.readQuery({  query: BOOKS})
    //console.log(data, cache)
    console.log(deleteBook.id);
    //console.log(data);
    cache.writeQuery({
        query: BOOKS,
        data: {
            allBooks: allBooks.filter(n => n.id !== deleteBook.id)
        }
    })
}

class BookElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: 'no'
        };

        this.onCLickEdit = this.onCLickEdit.bind(this);
        this.onCLickDelete = this.onCLickDelete.bind(this);
    }

    onCLickEdit(books_id){
        console.log("Edit pressed");
        console.log(books_id);
        this.setState({editable: 'yes'});
    };

    onCLickDelete(books_id){
        console.log("Delete pressed");
        console.log(books_id);
        this.setState({delete: 'yes'});
        //deleteBook({ variables: { id: this.props.book_id, authorId: "2"} })
    };

    render() {
        if ( this.state.editable == 'no' ){
            return (
                <div className="container">
                    <h4><b>Title: {this.props.title}</b> <b className="Title"><FaEdit onClick={() => this.onCLickEdit(this.props.book_id)}/>
                    <Mutation mutation={DELETE_BOOK} update={updateCache}>
                        { deleteBook => (
                            <TiDeleteOutline onClick={() =>
                                deleteBook({ variables: { id: this.props.book_id, authorId: "2"}})
                                //console.log(this.props.book_id);
                            } />
                        )}
                    </Mutation>

                    </b></h4>
                    <p>Genre: {this.props.genre}</p>
                    <p>Written by: {this.props.author}</p>
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
                                    updateBook({ variables: { id: this.props.book_id, authorId: "2", title: this.input_title.value, genre: this.input_genre.value } });

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
                                    <Button type="submit">Update Book</Button>
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
