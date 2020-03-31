import React, { Component } from 'react';
import styled from "styled-components";
import { Mutation } from 'react-apollo';
import BOOKS from './../queries/books_query';
import {ADD_COMMENT, COMMENTS} from "../queries/comment_query";
import { MdAddBox } from 'react-icons/md';
import {CreateBookButton} from "./BottunStyle";

const Input = styled.input.attrs(props => ({
    type: "text",
    size: "1em",
}))`
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  color: #282c34;
  font-size: 1em;
  border: 2px solid #282c34;
  border-radius: 3px;
`;

const updateCache = (cache, { data: {createComment} }) => {

    const { allComments } = cache.readQuery({  query: COMMENTS});

    console.log(createComment.comment)
    cache.writeQuery({
        query: COMMENTS,
        data: {
            allComments: allComments.concat(createComment.comment)
        }
    });

    const { allBooks } = cache.readQuery({  query: BOOKS});

    const mappedArray = allBooks.map((book) => {
        if (book.id === createComment.bookId){
            console.log(`create comment ${createComment.comment.id} in book`)
            book.comments = book.comments.concat(createComment.comment)
        }
        return book;
    });

    cache.writeQuery({
        query: BOOKS,
        data: {
            allBooks: mappedArray
        }
    });
};

class NewComment extends Component {

    input_title;

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            adding: 'no'
        };

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.onCLickEdit = this.onCLickEdit.bind(this)
    }

    onCLickEdit(){
        console.log("Adding new book");
        this.setState({adding: 'yes'});
    }

    handleChangeTitle(event) {
        console.log("Eeey");
        this.setState({title: event.target.value});
    }

    render(){
        if (this.state.adding === 'no'){
            return(
                <div className="add-author">
                    <p></p>
                    <MdAddBox onClick={() => this.onCLickEdit()}/>
                    <p></p>
                </div>
            );
        }
        else {
            return (
                <Mutation mutation={ADD_COMMENT} update={updateCache}>
                    {createComment => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    createComment({variables: { bookId: this.props.book_id, content: this.input_title.value}});

                                    this.input_title.value = '';
                                    this.setState({adding: 'no'});
                                }}
                            >
                                <div className='form-book'>
                                    <Input
                                    ref={node => {
                                        this.input_title = node;
                                    }}
                                />
                                <p></p>
                                <div className="book-button">
                                    {CreateBookButton()}
                                </div>
                                </div>
                            </form>
                        </div>
                    )}
                </Mutation>
            );
        }
    }
}

export default NewComment;
