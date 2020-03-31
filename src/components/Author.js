import React, { Component } from 'react';
import {Mutation} from 'react-apollo';
import styled from "styled-components";
import AUTHORS, {UPDATE_AUTHOR, DELETE_AUTHOR} from "../queries/author_query";
import { FaEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import BOOKS from "../queries/books_query";
import Card  from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import {LIBRARIES} from "../queries/libraries_query";
import UpdateBookButton, {CreateBookButton} from "./BottunStyle";

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
    const { allAuthors } = cache.readQuery({ query: AUTHORS});

    cache.writeQuery({
        query: AUTHORS,
        data: {
            allAuthors: allAuthors.filter(n => n.id !== deleteAuthor.id)
        }
    });

    const { allBooks } = cache.readQuery({  query: BOOKS});

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

    cache.writeQuery({
        query: LIBRARIES,
        data: {
            allLibraries: allLibraries
        }
    })
};

class Author extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: 'no'
        };

        this.onCLickEdit = this.onCLickEdit.bind(this);
        this.onCLickDelete = this.onCLickDelete.bind(this);
    }

    onCLickEdit(author_id){
        console.log("Edit pressed");
        console.log(author_id);
        this.setState({editable: 'yes'});
    };

    onCLickDelete(author_id){
        console.log("Delete pressed");
        console.log(author_id);
    };

    render() {
        if (this.state.editable === 'no'){
            return (
                    <Card className={this.props.classes.root}>
                        <CardContent>
                            <h3><b>{this.props.name}</b> <b className="Title"><FaEdit onClick={() => this.onCLickEdit(this.props.author_id)}/>
                                <Mutation mutation={DELETE_AUTHOR} update={updateCache}>
                                    { deleteAuthor => (
                                        <TiDeleteOutline onClick={() =>
                                            deleteAuthor({ variables: { id: this.props.author_id}})
                                        } />
                                    )}
                                </Mutation>
                            </b></h3>
                        </CardContent>
                    </Card>
            )
        }
        else{
            return (
                <Mutation mutation={UPDATE_AUTHOR}>
                    {updateAuthor => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateAuthor({ variables: { id: this.props.author_id, name: this.input_title.value } });

                                    this.setState({editable: 'no'});
                                }}
                            >
                                <div class='form-book'>
                                    <h4> <b>Title: <Input defaultValue={this.props.name}
                                                          ref={node => {
                                                              this.input_title = node;
                                                          }} /> {UpdateBookButton()}
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

export default Author;