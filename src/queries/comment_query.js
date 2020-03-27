import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const UPDATE_COMMENT = gql`
mutation updateComment($id: String!, $content: String!){
                          updateComment(input: {
                            id: $id
                            content: $content
                          })
                          {
                            comment {
                              id
                              content
                            }
                            errors
                          }
                        }
`;

export const DELETE_COMMENT = gql`
mutation deleteComment($id: String!) {
                          deleteComment(input: {
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

export default UPDATE_COMMENT;