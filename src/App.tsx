import React, {
    ReactElement,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from 'react'
import List, { Todo } from './List'

// enum PageElement {
//     COUNTER = 'counter',
//     TODO = 'todo',
// }

// function Counter() {
//     const [counter, setCounter] = useState<number>(0)
//     const handleCounterClick = (operation: string) => {
//         if (operation === 'add') {
//             return setCounter((prev) => prev + 1)
//         }
//         return setCounter((prev) => prev - 1)
//     }

//     return (
//         <p>
//             <button onClick={() => handleCounterClick('retract')}>-</button>
//             {counter}
//             <button onClick={() => handleCounterClick('add')}>+</button>
//         </p>
//     )
// }

// function ToggleCounter({
//     setElementToDisplay,
// }: {
//     setElementToDisplay: React.Dispatch<React.SetStateAction<PageElement>>
// }) {
//     return (
//         <button onClick={() => setElementToDisplay(PageElement.COUNTER)}>
//             Display Counter
//         </button>
//     )
// }

// function ToggleToDo({
//     setElementToDisplay,
// }: {
//     setElementToDisplay: React.Dispatch<React.SetStateAction<PageElement>>
// }) {
//     return (
//         <button onClick={() => setElementToDisplay(PageElement.TODO)}>
//             Display Todo
//         </button>
//     )
// }

// function DisplayCounter(elementToDisplay: PageElement): boolean {
//     return elementToDisplay === PageElement.COUNTER
// }

// function DisplayToDo(elementToDisplay: PageElement): boolean {
//     return elementToDisplay === PageElement.TODO
// }

function Todo() {
    const initialTodos = [
        { id: 1, task: 'Go shopping' },
        { id: 2, task: 'Pay the electricity bill' },
        { id: 3, task: 'Chill Bill' },
    ]
    const [todoList, setTodoList] = useState(initialTodos)
    const [task, setTask] = useState('')
    const [term, setTerm] = useState('')

    // If you include state in a function, it will cause too many rerenders
    // To avoid the problem, it can be wrapped inside a useCallback, to memoize the function definition
    const printTodoList = useCallback(() => {
        console.log('Changing todoList ', todoList)
    }, [todoList])

    useEffect(() => printTodoList(), [printTodoList, todoList])

    const handleSearch = () => {
        setTerm(task)
    }
    const handleCreate = () => {
        const newTodo = {
            id: Date.now(),
            task,
        }
        setTodoList([...todoList, newTodo])
        setTask('')
    }

    // being passed as a prop, the function will reparsed/regenerated everytime
    // it is passed down
    // useCallback memoizes the function definition itself, not the result
    const handleDelete = useCallback(
        (taskId: number) => {
            const newTodoList = todoList.filter(
                (todo: Todo) => todo.id !== taskId
            )
            setTodoList(newTodoList)
        },
        [todoList]
    )

    // Will filter on every render, unless you memoize
    // For example, every time you type a letter in the input
    // With useMemo, on every letter you type, no new render will occur, since the result of the computation has been memoized
    // The filter will kick in again if you add to the list, for every element in the list
    const filteredTodoList = useMemo(
        () =>
            todoList.filter((todo: Todo) => {
                console.log('Filtering...')
                return todo.task
                    .toLowerCase()
                    .includes(term.toLocaleLowerCase())
            }),
        [term, todoList]
    )

    return (
        <>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={handleCreate}>Create</button>
            <button onClick={handleSearch}>Search</button>
            <List
                todoList={filteredTodoList}
                handleDelete={handleDelete}
            />{' '}
        </>
    )
}

function App(): ReactElement {
    // const [elementToDisplay, setElementToDisplay] = useState<PageElement>(
    //     PageElement.COUNTER
    // )

    useEffect(() => {
        console.log('Rendering <App />')
    })

    return (
        <div className="App">
            {/* {DisplayCounter(elementToDisplay) ? (
                <Counter />
            ) : (
                <ToggleCounter setElementToDisplay={setElementToDisplay} />
            )}
            {DisplayToDo(elementToDisplay) ? ( */}
            <Todo />
            {/* ) : (
                <ToggleToDo setElementToDisplay={setElementToDisplay} />
            )} */}
        </div>
    )
}

export default App
