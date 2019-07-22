import React from 'react'
import './App.css'
import ToDoItem from './todoItem'
import BottomComponent from './bottom'

const ENTER_KEY = 13
let count = 0

class ToDoContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newTodo: '',
            todoArr: [],
            activeItem: 'All',
            showClearAllComplete: false,
            previousName: ''
        }
        this.headerInputChange = this.headerInputChange.bind(this)
        this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this)
        this.filterToDoArr = this.filterToDoArr.bind(this)
    }
    componentDidMount() {
       this.filterToDoArr()
    }
    filterToDoArr() {
        let allItems = JSON.parse(localStorage.getItem('react-to-do')) || []
        let activeKey = localStorage.getItem('activeItem') || 'All'
        let showClearAll = allItems.some(item => item.completed)
        let currentToDo = allItems
        if(activeKey == 'Active') 
            currentToDo = currentToDo.filter(item => !item.completed)
        if(activeKey == 'Completed')
            currentToDo = currentToDo.filter(item => item.completed)
        this.setState({
            todoArr: currentToDo,
            activeItem: activeKey,
            showClearAllComplete: showClearAll
        })
    }
    headerInputChange(event) {
        event.persist()
        this.setState({
            newTodo: event.target.value
        })
    }
    handleNewTodoKeyDown(event) {
        if(event.keyCode !== ENTER_KEY) return
        event.preventDefault()
        var val = this.state.newTodo.trim()
        if(val) {
            let obj = {
                name: val,
                completed: false
            }
            let storageArr = JSON.parse(localStorage.getItem('react-to-do'))
            if(!storageArr.length) localStorage.setItem('activeItem', 'All')
            storageArr.push(obj)
            localStorage.setItem('react-to-do', JSON.stringify(storageArr))
            this.filterToDoArr()
            this.setState({
                newTodo: ''
            })
        }
    }
    onToggle(name, event) {
        event.persist()
        let allItems = JSON.parse(localStorage.getItem('react-to-do'))
        allItems.forEach(item => {
            if(item.name === name) item.completed = !item.completed
        })
        localStorage.setItem('react-to-do', JSON.stringify(allItems))
        this.filterToDoArr()
    }
    deleteItem(name) {
        let allItems = JSON.parse(localStorage.getItem('react-to-do'))
        let deleteIndex = allItems.findIndex(item => item.name === name)
        allItems.splice(deleteIndex, 1)
        localStorage.setItem('react-to-do', JSON.stringify(allItems))
        this.filterToDoArr()
    }
    changeActiveEvent(item) {
        localStorage.setItem('activeItem', item)
        this.filterToDoArr()
    }
    ClearAllCompleted() {
        let allItems = JSON.parse(localStorage.getItem('react-to-do'))
        let activeArr = allItems.filter(item => !item.completed)
        localStorage.setItem('react-to-do', JSON.stringify(activeArr))
        this.filterToDoArr()
    }
    //有bug。 无法确定修改的是哪一个。
    itemInputChange(index, value) {
        let currentArr = this.state.todoArr
        //条件不全
        if(!count) {
            this.setState({
                previousName: currentArr[index].name
            })
        }
        count++
        currentArr[index].name = currentArr[index].name + value
        this.setState({
            todoArr: currentArr
        })
    }
    // 设计有误，实现复杂，后续重构。
    changeSingleItem(item) {
        let allItems = JSON.parse(localStorage.getItem('react-to-do')) || []
        allItems.forEach(localItem => {
            if(localItem.name == this.state.previousName) localItem.name = item.name
        })
        localStorage.setItem('react-to-do', JSON.stringify(allItems))
        this.filterToDoArr()
    }
    render() {
        let showToDoItemComponent, showBottomComponent
        if(this.state.todoArr.length) {
            showToDoItemComponent = (
                <ToDoItem 
                    allItems={this.state.todoArr}
                    onToggle={this.onToggle.bind(this)}
                    deleteItem={this.deleteItem.bind(this)}
                    changeSingleItem={this.changeSingleItem.bind(this)}
                    itemInputChange={this.itemInputChange.bind(this)} />
            )
        }
        let localArr = JSON.parse(localStorage.getItem('react-to-do'))
        if(localArr.length) {
            showBottomComponent = (
                <BottomComponent 
                    allItems={this.state.todoArr}
                    active={this.state.activeItem}
                    showClearAllComplete={this.state.showClearAllComplete}
                    changeActive={this.changeActiveEvent.bind(this)} 
                    ClearAllCompleted={this.ClearAllCompleted.bind(this)} />
            )
        }
        return (
            <div>
                <input
                    className="new-todo"
                    placeholder="what needs to be done"
                    value={this.state.newTodo}
                    onChange={this.headerInputChange}
                    onKeyDown={this.handleNewTodoKeyDown}
                    />
                {showToDoItemComponent}
                {showBottomComponent}
            </div>
        )
    }
}

export default ToDoContent
