import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const LIBRARIES = gql`
{
                    allLibraries{
                            id
                            title
                            books{
                              id
                              title
                              genre
                            }
                          }
                          }
`;

export const LIBRARY = gql`
query library($id: String!){
                          library(id: $id){
                            id
                            title
                            books{
                              id
                              title
                              genre
                            }
                          }
                        }
                       
`;

export const UPDATE_LIBRARY = gql`
mutation updateLibrary($id: String!, $title: String!){
updateLibrary(input: {
        id: $id
            title: $title
                    })
{
    library {
                              id
                              title
                              books{
                                id
                                title
                              }
}
    errors
}
}`;

export const DELETE_LIBRARY = gql`mutation deleteLibrary($id: String!){
deleteLibrary(input: {
        id: $id
            })
{
    id
    errors
}
}`;

export const ADD_LIBRARY = gql`
    mutation createLibrary($title: String!){
                          createLibrary(input: {
                            title: $title
                          })
                          {
                            library {
                              id
                              title
                              books {
                                id
                                title
                              }
                            }
                            errors
                          }
                        }
`;

export const ADD_BOOK_TO_LIBRARY = gql`
    mutation createBookForLibrary($libraryId: String!, $authorId: String!, $title: String!, $genre: String!){
                        createBookForLibrary(input: {
                          authorId: $authorId
                          libraryId: $libraryId
                          title: $title
                          genre: $genre
                        })
                        {
                          book {
                            id
                            title
                            genre
                            author{
                              id
                              name
                            }
                          }
                          errors
                        }
                      }
`;

export default LIBRARIES;