import React, { Component } from 'react';
import axios from 'axios';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';
import styled from "styled-components";
import BookElement from "./BookElement";
import { FaEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import BOOKS, {UPDATE_BOOK} from "../queries/books_query";
import { makeStyles } from '@material-ui/core/styles';
import Card  from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import NewBook from "./NewBook";
import {LIBRARIES} from "../queries/libraries_query";
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


const updateCache = (cache, { data: {deleteAuthor} }) => {

    const { allBooks } = cache.readQuery({  query: BOOKS})

    //console.log(data, cache)
    //console.log(data);
    //console.log(mappedArray)
    cache.writeQuery({
        query: BOOKS,
        data: {
            allBooks: allBooks.filter(n => n.author.id !== deleteAuthor.id)
        }
    });

    const { allLibraries } = cache.readQuery({  query: LIBRARIES });

    const newMappedArray = allLibraries.map((library) => {
        library.books = library.books.filter(n => n.author.id !== deleteAuthor.id);
        return library
    });

    //console.log(data, cache)
    console.log("This is serious!!!");
    console.log(newMappedArray)
    cache.writeQuery({
        query: LIBRARIES,
        data: {
            allLibraries: allLibraries
        }
    })
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
        //this.setState({delete: 'yes'});
        //deleteBook({ variables: { id: this.props.book_id, authorId: "2"} })
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
                                            //console.log(this.props.book_id);
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