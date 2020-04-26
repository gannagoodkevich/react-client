import React, { Component } from 'react';
import styled from "styled-components";
import { Mutation } from 'react-apollo';
import LIBRARIES from "../queries/libraries_query";
import {ADD_LIBRARY} from "../queries/libraries_query";
import {CreateBookButton} from "./BottunStyle";
import Cookies from "js-cookie";

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

const updateCache = (cache, { data: {createLibrary} }) => {
    const { allLibraries } = cache.readQuery({  query: LIBRARIES})
    console.log(createLibrary.library);
    cache.writeQuery({
        query: LIBRARIES,
        data: {
            allLibraries: allLibraries.concat(createLibrary.library)
        }
    })
}

class NewLibrary extends Component {

    input_title;

    constructor(props) {
        super(props);
        this.state = {title: ''};

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
    }


    handleChangeTitle(event) {
        console.log("Eeey");
        this.setState({title: event.target.value});
    }

    render(){
        return (
            <Mutation mutation={ADD_LIBRARY} update={updateCache}>
                {createLibrary => (
                    <div>
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                console.log(Cookies.get('user_id'))
                                createLibrary({ variables: { title: this.input_title.value, userId: Cookies.get('user_id') } });

                                this.input_title.value = '';
                            }}
                        >
                            <div class='form-book'>
                                Title: <Input
                                ref={node => {
                                    this.input_title = node;
                                }}
                            />
                                {CreateBookButton()}
                            </div>
                        </form>
                        <p></p>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default NewLibrary;
