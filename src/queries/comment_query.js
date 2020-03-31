import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export  const COMMENTS = gql`
{
                    allComments{
                            id
                            content
                    }
}
`;

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
                           bookId
                          }
                        }`;

export const ADD_COMMENT = gql`
   mutation createComment($content: String!, $bookId: String!){
                          createComment(input: {
                            content: $content
                            bookId: $bookId
                          })
                          {
                            comment {
                              id
                              content
                            }
                            bookId
                            errors
                          }
                        }
`;

export default UPDATE_COMMENT;