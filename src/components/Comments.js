import React, { Component } from 'react';
import {Query} from 'react-apollo';
import { makeStyles } from '@material-ui/core/styles';
import {COMMENTS} from "../queries/comment_query";
import Comment from "./Comment";

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: 'no'
        };

        this.onCLickEdit = this.onCLickEdit.bind(this);
        this.onCLickDelete = this.onCLickDelete.bind(this);
    }

    onCLickEdit(comment_id){
        console.log("Edit pressed");
        console.log(comment_id);
        this.setState({editable: 'yes'});
    };

    onCLickDelete(comment_id){
        console.log("Delete pressed");
        console.log(comment_id);
        this.setState({delete: 'yes'});
    };

    render() {
        return (
            <div>
                <Query query={COMMENTS}>
                    {({ loading, error, data }) => {
                        if (loading) return <div>Fetching..</div>
                        if (error) return <div>Error! ${error.message} </div>
                        return (
                            <div className="flex flex-wrap mb-4">
                                Comments:
                                {data.allComments.map((comment) => {
                                    return (
                                        <div>
                                            <Comment comment_id={comment.id} content={comment.content}/>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }}
                </Query>
            </div>
        )
    }
}

export default CommentList;
