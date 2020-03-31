import React, { Component } from 'react';
import {Mutation, Query} from 'react-apollo';
import styled from "styled-components";
import { FaEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import BOOKS, {UPDATE_BOOK} from "../queries/books_query";
import Button from "@material-ui/core/Button";
import {COMMENTS} from "../queries/comment_query";
import UPDATE_COMMENT from "../queries/comment_query";
import {DELETE_COMMENT} from "../queries/comment_query";

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


const updateCache = (cache, { data: {deleteComment} }) => {
    const { allComments } = cache.readQuery({  query: COMMENTS});

    cache.writeQuery({
        query: COMMENTS,
        data: {
            allComments: allComments.filter(n => n.id !== deleteComment.id)
        }
    });

    const { allBooks } = cache.readQuery({  query: BOOKS});

    const mappedArray = allBooks.map((book) => {
        if (book.id === deleteComment.bookId){
            console.log(`delete comment ${deleteComment.id} in book`)
            book.comments = book.comments.filter(n => n.id !== deleteComment.id);
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

class Comment extends Component {
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
    };

    render() {
        if (this.state.editable === 'no'){
            return (
                <div>
                            <h3><b>{this.props.content}</b> <b className="Title"><FaEdit onClick={() => this.onCLickEdit(this.props.comment_id)}/>
                                <Mutation mutation={DELETE_COMMENT} update={updateCache}>
                                    { deleteComment => (
                                        <TiDeleteOutline onClick={() =>
                                            deleteComment({ variables: { id: this.props.comment_id}})
                                        } />
                                    )}
                                </Mutation>
                            </b></h3>

                </div>
            )
        }
        else{
            return (
                <Mutation mutation={UPDATE_COMMENT}>
                    {updateComment => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateComment({ variables: { id: this.props.comment_id, content: this.input_title.value } });

                                    this.setState({editable: 'no'});
                                }}
                            >
                                <div class='form-book'>
                                    <h4> <b><Input defaultValue={this.props.content}
                                                          ref={node => {
                                                              this.input_title = node;
                                                          }} /> <Button type="submit">Update Comment</Button>
                                    </b></h4>
                                </div>
                            </form>
                            <p></p>
                        </div>
                    )}
                </Mutation>
            )
        }
    }
}

export default Comment;