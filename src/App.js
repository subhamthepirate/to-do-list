import React from 'react';
import './App.css';
import './ListItems.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import FlipMove from 'react-flip-move';
import { ReactSortable } from "react-sortablejs";
import swal from 'sweetalert';

library.add(faTrash)

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: JSON.parse(localStorage.getItem('items')) || [],
      currentItem:{
        text:''
      }
    } 
  }
  
  addItem=(e)=>{
    e.preventDefault();
    const newItem = this.state.currentItem;    
    if(localStorage.getItem('items')==null){
        var items = [];
        items.push(newItem)
        localStorage.setItem('items',JSON.stringify(items));
    }
    else{
      items = JSON.parse(localStorage.getItem('items'));
      items.push(newItem)
      localStorage.setItem('items',JSON.stringify(items));

    }
    this.setState({
      items: JSON.parse(localStorage.getItem('items')),
      currentItem:{
        text:''
      }
    })
    }
  handleInput=(e)=>{
    this.setState({
      currentItem:{
        text: e.target.value
      }
    })
  }
  deleteItem=(key)=>{
    var lists = JSON.parse(localStorage.getItem('items'))
    lists.splice(key,1)
    this.setState({
      items: lists
    })
    localStorage.setItem('items',JSON.stringify(lists));
  }

 render(){
  return (
    <div className="App">
      <header>
        <form id="to-do-form" onSubmit={this.addItem}>
          <input type="text" placeholder="Enter task" value={this.state.currentItem.text} onChange={this.handleInput}></input>
          <button type="submit">Add</button>
        </form>
        {/* <ListItems items={this.state.items} deleteItem={this.deleteItem} setUpdate={this.setUpdate}/> */}

        <FlipMove duration={300} easing="ease-in-out">
          <ReactSortable id="task-list" list={this.state.items} setList={(newState) => this.setState({ items: newState })}>
            {this.state.items.map(function(item,index){
                return(
                  <div className="list" key={index}>
                <p>
                  {item.text}
                  <span>
                    <FontAwesomeIcon className="faicons" onClick={() => {
                      swal({
                        title: "Are you sure?",
                        text: "Once deleted, you will not be able to recover!",
                        icon: "warning",
                        buttons: true, 
                        dangerMode: false,
                      })
                      .then((willDelete) => {
                        if (willDelete) {
                          return this.deleteItem(index);
                        }
                      });
                      
                    }} icon="trash" />
                  </span>
                </p>
              </div>
                );
            },this)}
          </ReactSortable>
        </FlipMove>
      </header>
    </div>
  );
 }
}


export default App;
