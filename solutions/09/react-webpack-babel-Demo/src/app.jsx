import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();
import { Provider } from 'react-redux'
import store from './store'
import Paper from 'material-ui/Paper'
import CommentsList from './components/commentsList'
import CommentForm from './components/commentForm'

const email = "myemail.com"
const MyDummyComp = (props) => {
    return <div>
        {props.email.toUpperCase()}
    </div>
}

MyDummyComp.PropTypes = {
    email: React.PropTypes.string.isRequired
}
export default function () {
    return <MuiThemeProvider>
        <Provider store={store}>
            <Paper>
                <div className="row">
                    <div className="col-md-8 col-xs-12">
                        <CommentsList/>
                        <CommentForm/>
                        <MyDummyComp email={email}/>
                    </div>
                </div>
            </Paper>
        </Provider>
    </MuiThemeProvider>
}



