export default function (state = {
    comments: [{
        author: "React",
        content: "I'm awesome !!!",
        likes: 10
    }]
}, action) {

    switch (action.type){
        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [...state.comments, action.payload]
            };
        case 'LIKE_COMMENT':
            let comments = state.comments,
                i = action.payload.index
            return {
                ...state,
                comments: [
                    ...comments.slice(0, i),
                    {
                        ...comments[i],
                        likes: comments[i].likes + 1
                    },
                    ...comments.slice(i+1)
                ]
            }
        default:
            return state
    }
}