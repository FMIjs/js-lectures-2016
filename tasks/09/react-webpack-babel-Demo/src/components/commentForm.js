import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import store from '../store'

export default class CommentForm extends React.Component {

    state = {
        content: "",
        name: ""
    }

    render() {

        return <div className="row bordered" >
            <div className="col-md-12 col-xs-12">
                <TextField
                    hintText="Write your comment here"
                    onChange={(e) => this.setState({content: e.target.value})}
                    fullWidth={true}
                    value={this.state.content}
                />
                <br/>
                <TextField
                    hintText="Write your name here"
                    onChange={(e) => this.setState({name: e.target.value})}
                    fullWidth={true}
                    value={this.state.name}
                />
                <br/>
                <RaisedButton
                    label="Comment"
                    fullWidth={true}
                    primary={true}
                    onClick={()=>{
                        store.dispatch({
                            type: 'ADD_COMMENT',
                            payload: {
                                author: this.state.name,
                                content: this.state.content,
                                likes: 0
                            }
                        });
                        this.setState({
                            name: '',
                            content: ''
                        })
                    }}
                />
            </div>
        </div>
    }
}