import React, { Component } from 'react';
import { Query } from 'react-apollo';
import BOOKS from './../queries/books_query';
import {AUTHORIZED} from "./../queries/books_query";
import LibraryList from "./Libraries";
import NewLibrary from "./NewLibrary";
import { makeStyles } from '@material-ui/core/styles';
import AuthorList from "./Authors";
import CommentList from "./Comments";
import Cookies from "js-cookie";

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    maxWidth: 500,
    minHeight: 350,
    maxHeight: 600,
    display: 'inline-block',
    margin: '15px',
    color: '#282c34',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const bookList = (
  <div>
    <Query query={AUTHORIZED}>
      {({ loading, error, data }) => {
        let email
        if (Cookies.get('user_id') !== 'nil'){
          //email = data.authorized.email
          if (data !== undefined){
            console.log(data.authorized.id)
          }
          return (
              <div className="content">
                <h1>Hello, {Cookies.get('name')}</h1>
                <Query query={BOOKS}>
                  {({ loading, error, data }) => {
                    if (loading) return <div>Fetching..</div>
                    if (error) return <div>Error! ${error.message} </div>
                    return (
                        <div className="app-div">
                          <LibraryList />
                          <NewLibrary />
                          <AuthorList />
                          <CommentList />
                        </div>
                    )
                  }}
                </Query>
              </div>
          )
        }
        else{
          return (
              <div className="content">
                <h1>Hello, new one, join us!</h1>
              </div>
          )
        }
      }}
    </Query>
  </div>
);



class ListsContainer extends Component {
  constructor(props) {
    super(props);
  }

    render() {
      return (
            bookList
      )
    }
}

export default ListsContainer;
