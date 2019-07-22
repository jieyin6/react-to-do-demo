import React from 'react'

const bottomArr = ['All', 'Active', 'Completed']

class BottomComponent extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let showClearAllComplete 
        if(this.props.showClearAllComplete) {
            showClearAllComplete = (
                <button className="clear-completed" onClick={this.props.ClearAllCompleted}>Clear completed</button>
            )
        }
        return (
            <footer className="footer">
                <span className="todo-count">{this.props.allItems.length} item left</span>
                <ul className="filters">
                    {
                        bottomArr.map((item, index) => {
                            return (
                                <li key={index} onClick={this.props.changeActive.bind(this, item)}>
                                    <a className={item == this.props.active ? 'selected' : ''}>{item}</a>
                                </li>
                            )
                        })
                    }
                </ul>
                {showClearAllComplete}
            </footer>
        )
    }
}
export default BottomComponent