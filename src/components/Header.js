import React, { memo, useState } from 'react';

const Header = memo(props => {
    const [text, setText] = useState('')
    const { addTodo } = props
    const onAddTodo = (e = {}) => {
        if(e.key === 'Enter' && text){
            addTodo({
                id: new Date().valueOf(),
                text,
                isCompleted: false
            })
            setText('')
        }
    }
    return (
        <header className='header'>
            <h1>todos</h1>
            <input 
                className='new-todo'
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => onAddTodo(e)}
                placeholder='What needs to be done ?'
               
            />
        </header>
        
    )
})

export default Header