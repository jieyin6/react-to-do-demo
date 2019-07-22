import React from 'react'
import './App.css'

const ENTER_KEY = 13

class ToDoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showInput: false
        }
        this.changeLabelToInput = this.changeLabelToInput.bind(this)
    }
    changeLabelToInput() {
        this.setState({
            showInput: !this.state.showInput
        })
    }
    itemInputChange(index, event) {
        event.persist()
        let value = event.target.value.charAt(event.target.value.length -1)
        this.props.itemInputChange(index, value)
    }
    saveNewCurrentItem(item, event) {
        // 设计有误，应该存个id，方便修改。
        if(event.keyCode !== ENTER_KEY) return
        this.props.changeSingleItem(item)
        this.changeLabelToInput()
    }
    render() {
        var item = this.props.allItems.map((item, index) => {
            return (
                <li className={item.completed ? 'completed' : ''} key={index}>
                    <div className="view">
                        <input 
                            className="toggle" 
                            type="checkbox" 
                            checked={item.completed}
                            onChange={this.props.onToggle.bind(this, item.name)} />
                        {
                            this.state.showInput ? 
                            <input 
                                className="edit"
                                value={item.name}
                                onChange={this.itemInputChange.bind(this, index)}
                                onKeyDown={this.saveNewCurrentItem.bind(this, item)} /> : 
                            <label onDoubleClick={this.changeLabelToInput}>{item.name}</label>
                        }
                        <button className="destroy" onClick={this.props.deleteItem.bind(this, item.name)}></button>
                    </div>
                </li>
            )
        })
        return (
            <ul className="todo-list">
                {item}
            </ul>
        )
    }
}
export default ToDoItem