import React, { useState } from 'react'
import List, { Todo } from './List'
import { useEffect, useMemo, useCallback } from 'react'

enum PageElement {
    COUNTER = 'counter',
    TODO = 'todo',
}

function Counter() {
    const [counter, setCounter] = useState<number>(0)
    const handleCounterClick = (operation: string) => {
        if (operation === 'add') {
            return setCounter((prev) => prev + 1)
        }
        return setCounter((prev) => prev - 1)
    }

    return (
        <p>
            <button onClick={() => handleCounterClick('retract')}>-</button>
            {counter}
            <button onClick={() => handleCounterClick('add')}>+</button>
        </p>
    )
}

function ToggleCounter({
    setElementToDisplay,
}: {
    setElementToDisplay: React.Dispatch<React.SetStateAction<PageElement>>
}) {
    return (
        <button onClick={() => setElementToDisplay(PageElement.COUNTER)}>
            Display Counter
        </button>
    )
}

function ToggleToDo({
    setElementToDisplay,
}: {
    setElementToDisplay: React.Dispatch<React.SetStateAction<PageElement>>
}) {
    return (
        <button onClick={() => setElementToDisplay(PageElement.TODO)}>
            Display Todo
        </button>
    )
}

function DisplayCounter(elementToDisplay: PageElement): boolean {
    return elementToDisplay === PageElement.COUNTER
}

function DisplayToDo(elementToDisplay: PageElement): boolean {
    return elementToDisplay === PageElement.TODO
}

// Dependencies
// Components

function Todo() {
    const initialTodos = [
        { id: 1, task: 'Go shopping' },
        { id: 2, task: 'Pay the electricity bill' },
    ]
    const [todoList, setTodoList] = useState(initialTodos)
    const [task, setTask] = useState('')
    useEffect(() => {
        console.log('Rendering <App />')
    })
    const handleCreate = () => {
        const newTodo = {
            id: Date.now(),
            task,
        }
    }
    return (
        <>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleCreate}>Create</button>
            <List todoList={todoList} />{' '}
        </>
    )
}

function App() {
    const [elementToDisplay, setElementToDisplay] = useState<PageElement>(
        PageElement.COUNTER
    )

    return (
        <div className="App">
            {DisplayCounter(elementToDisplay) ? (
                <Counter />
            ) : (
                <ToggleCounter setElementToDisplay={setElementToDisplay} />
            )}
            {DisplayToDo(elementToDisplay) ? (
                <Todo />
            ) : (
                <ToggleToDo setElementToDisplay={setElementToDisplay} />
            )}
        </div>
    )
}

export default App
