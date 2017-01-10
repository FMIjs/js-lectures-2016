import React from 'react'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import {connect} from "react-redux"


function CommentsList(props) {
    const style = {float: "right"}

    return <div className="row bordered">
        <div className="col-md-12 col-xs-12">
            <List>
                <Subheader>Comments</Subheader>
                {props.comments.map((comment, index)=> {
                    return <ListItem
                        key={index}
                        primaryText={<div>
                            <strong>{comment.author}</strong>  said:
                            <p>{comment.content}</p><strong style={style}>{comment.likes} likes</strong>
                        </div>}
                        rightIconButton={
                            <RaisedButton
                            label="Like"
                            secondary={true}
                            onClick={()=>{
                                props.dispatch({
                                    type: 'LIKE_COMMENT',
                                    payload: {index}
                                })
                            }}/>}
                    />
                })}
            </List>
        </div>
    </div>
}
export default connect(state => {
    return {
        comments: state.comments
    }
})(CommentsList)