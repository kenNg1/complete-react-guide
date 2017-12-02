import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = {
    persons: [
      {id:'asd', name:'Max',age:28},
      {id:'add', name:'Manu',age:29},
      {id:'ade', name:'Steph',age:26},
    ],
    other: 'unchanged info',
    showPersons:false,
    userInput: ''
  }

  inputChangedHandler = (event) => {
    this.setState({userInput: event.target.value})
  }

  nameChangedHandler = (event,id) => {

    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    // const person = Object.assign({}, this.state.persons[personIndex]) older way of doing it

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({persons: persons})
  }

  // switchNameHandler = (newName) => {
  //   this.setState({
  //     persons: [
  //       {name:newName,age:28},
  //       {name:'Manu',age:29},
  //       {name:'Steph',age:100},
  //     ]
  //   })
  // }

  copyHandler = () => {
    console.log('copied')
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons:!doesShow});
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }

  deleteCharHandler = (index) => {
    const text = this.state.userInput.split('');
    text.splice(index,1);
    const updatedText = text.join('');
    this.setState({userInput:updatedText})
  }

  // () => this.deletePersonHandler(index) or deletePersonHandler.bind(this,index)

  render() {
    const charList = this.state.userInput.split('').map((ch,index)=>{
      return <Char
      character={ch}
      key={index}
      click={()=> this.deleteCharHandler(index)}
       />;
    });

    // can be like this or in css
    const style = {
      backgroundColor:'green',
      color:'white',
      font:'inherit',
      border:'1px solid blue',
      padding:'8px',
      cursor:'pointer',
    };

    let persons = null;
    let btnClass = '';

    if (this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map((person,index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key = {person.id}
              changed={(event) => this.nameChangedHandler(event,person.id)} />
          })}          
        </div>
      );

      // btnClass = classes.Red;
       
      // pseudo-classes require radium
      style.backgroundColor = 'red';
      
    }

    let classes = [];

    if (this.state.persons.length <= 2) {
      classes.push('red') // classes = ['red']
    }
    if (this.state.persons.length <= 1) {
      classes.push('bold') // classes = ['red','bold']
    }

    return (
        <div className="App">
          <input type="text" onChange={this.inputChangedHandler} value={this.state.userInput} />
          <p>{this.state.userInput}</p>
          <Validation inputLength={this.state.userInput.length} />
          {charList}
          <h1>Hi I'm a react app </h1>
          <p className={classes.join(' ')} onCopy={this.copyHandler}> This is really working! </p>
          {/* below is less efficient */}
          <button 
            style={style}
            // className={btnClass}
            onClick={() => this.togglePersonsHandler()}>Toggle Names</button>
          {persons}
          

        </div>
    );
  }
}

export default App;
