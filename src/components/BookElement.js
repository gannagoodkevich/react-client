import React, {Component} from "react";
import { FaEdit } from 'react-icons/fa';
import styled from "styled-components";
import {UPDATE_BOOK} from "./../queries/books_query";
import {Mutation} from "react-apollo";

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

class BookElement extends Component {
    constructor(props) {
        super(props);
        this.state = {editable: 'no'};

        this.onCLickEdit = this.onCLickEdit.bind(this);
    }

    onCLickEdit(books_id){
        console.log("Edit pressed");
        console.log(books_id);
        this.setState({editable: 'yes'});
    };

    render() {
        if ( this.state.editable == 'no' ){
            return (
                <div className="container">
                    <h4><b>Title: {this.props.title}</b> <b className="Title"><FaEdit onClick={() => this.onCLickEdit(this.props.book_id)}/></b></h4>
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
