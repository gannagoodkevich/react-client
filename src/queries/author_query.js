import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const AUTHORS = gql`
{
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

export const UPDATE_AUTHOR = gql`
mutation updateAuthor($id: String!, $name: String!){
                          updateAuthor(input: {
                            id: $id
                             name: $name
                          })
                          {
                            author {
                              id
                              name
                              books{
                                  id
                                  title
                                  genre
                              }
                            }
                            errors
                          }
                        }
`;

export const DELETE_AUTHOR = gql`
mutation deleteAuthor($id: String!) {
                          deleteAuthor(input: {
                              id: $id
                          })
                          {
                           id
                           errors
                          }
                        }`;

export const ADD_AUTHOR = gql`
   mutation createAuthor($name: String!){
                          createAuthor(input: {
                            name: $name
                          })
                          {
                            author {
                              id
                              name
                            }
                            errors
                          }
                        }
`;

export default AUTHORS;