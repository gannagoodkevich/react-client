import React, { Component } from 'react';
import {Mutation, Query} from 'react-apollo';
import styled from "styled-components";
import LIBRARIES, {UPDATE_LIBRARY, DELETE_LIBRARY} from './../queries/libraries_query';
import BookElement from "./BookElement";
import { FaEdit } from 'react-icons/fa';
import { TiDeleteOutline } from 'react-icons/ti';
import { makeStyles } from '@material-ui/core/styles';
import Card  from '@material-ui/core/Card';
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import NewBook from "./NewBook";

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


const updateCache = (cache, { data: {deleteLibrary} }) => {
    const { allLibraries } = cache.readQuery({  query: LIBRARIES})
    console.log(deleteLibrary.id);
    cache.writeQuery({
        query: LIBRARIES,
        data: {
            allLibraries: allLibraries.filter(n => n.id !== deleteLibrary.id)
        }
    })
};

class Library extends Component {
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
                    <h3><b>{this.props.title}</b> <b className="Title"><FaEdit onClick={() => this.onCLickEdit(this.props.library_id)}/>
                        <Mutation mutation={DELETE_LIBRARY} update={updateCache}>
                            { deleteLibrary => (
                                <TiDeleteOutline onClick={() =>
                                    deleteLibrary({ variables: { id: this.props.library_id}})
                                } />
                            )}
                        </Mutation>
                    </b></h3>
                    <p></p>
                        {this.props.books.map((book) => {
                            return (
                                <Card className={this.props.classes.root}>
                                        <BookElement book_id={book.id} title={book.title} genre={book.genre} author={book.author} library_id={this.props.library_id} comments={book.comments}/>
                                </Card>
                            )
                        })}
                    <Card className={this.props.classes.root}>
                        <NewBook library={this.props.library_id}/>
                    </Card>
                </div>
            )
        }
        else{
            return (
                <Mutation mutation={UPDATE_LIBRARY}>
                    {updateLibrary => (
                        <div>
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    updateLibrary({ variables: { id: this.props.library_id, title: this.input_title.value } });

                                    this.setState({editable: 'no'});
                                }}
                            >
                                <div class='form-book'>
                                    <h4> <b>Title: <Input defaultValue={this.props.title}
                                                          ref={node => {
                                                              this.input_title = node;
                                                          }} /> <Button type="submit">Update Library</Button>
                                    </b></h4>
                                </div>
                            </form>
                        <p></p>
                        {this.props.books.map((book) => {
                        return (
                        <Card className={this.props.classes.root}>
                            <CardContent>
                                <BookElement book_id={book.id} title={book.title} genre={book.genre} author="name" />
                            </CardContent>
                        </Card>
                        )
                        })}
                        <Card className={this.props.classes.root}>
                        <CardContent>
                        <div className="add-book">
                        <NewBook library={this.props.library_id}/>
                        </div>
                        </CardContent>
                        </Card>
                        </div>
                    )}
                </Mutation>
            )
        }
    }
}

export default Library;