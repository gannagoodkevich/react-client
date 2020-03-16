import React, { Component } from 'react';
import axios from 'axios';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from "styled-components";
import NewBook from './NewBook';

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

const USERS_QUERY = gql`
  query {
    allAuthors{
                            id
                            name
                            books{
                                id
                                title
                                genre
                            }
                          }
  }
`;

class ListsContainer extends Component {
    render() {
      return (
   <Query query={USERS_QUERY}>
     {({ loading, error, data }) => {
       if (loading) return <div>Fetching..</div>
       if (error) return <div>Error!</div>
       return (
         <div className="flex flex-wrap mb-4">
         <div>
           <Button> Button </Button>
       </div>
         Authors:
         {data.allAuthors.map((user) => {
               return <div key={user.id} className="m-4 w-1/4 rounded overflow-hidden shadow-lg">
                 <div className="px-6 py-4"> Author {user.id}:
                   <div className="font-bold text-xl mb-2">{user.name}</div>
                   <div className="font-bold text-xl">Books: {user.books.map((book) =>{
                      return <div key={book.id} className="m-4 w-1/4 rounded overflow-hidden shadow-lg">
                        <div className="font-bold text-xl mb-2">{book.title}</div>
                      </div>
                   })}
                   </div>
                 </div>
                 <NewBook />
               </div>
             })}
         </div>
       )
     }}
   </Query>
 )
    }
}

export default ListsContainer;
