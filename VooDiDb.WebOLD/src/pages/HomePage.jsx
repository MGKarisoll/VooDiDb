import React from 'react'

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);

        document.title="VooDi Db. Home";
    }
    render() {
        return
        <div>
            <AddTodo />
            <VisibleTodoList />
            <Footer />
        </div>
    }
}