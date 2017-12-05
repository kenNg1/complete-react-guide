import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons.js';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';

class App extends PureComponent {

  constructor(props){
    super(props);
    console.log('[App.js] Inside constructor',props);
    this.state = {
      persons: [
        {id:'asd', name:'Max',age:28},
        {id:'add', name:'Manu',age:29},
        {id:'ade', name:'Steph',age:26},
      ],
      other: 'unchanged info',
      showPersons:false,
      userInput: '',
      toggleClicked: 0
    }
  }

  componentWillMount(){
    console.log('[App.js] Inside componentWillMount()');
  }

  componentDidMount(){
    console.log('[App.js] Inside componentDidMount()');
  }
  
//   shouldComponentUpdate(nextProps, nextState) {
//     console.log('[UPDATE App.js] Inside shouldComponentUpdate',nextProps, nextState);
//     return nextState.persons !== this.state.persons ||
//     nextState.showPersons !== this.state.showPersons;
//     // return true;
// }

  componentWillUpdate(nextProps,nextState) {
      console.log('[Update App.js] Inside componentWillUpdate', nextProps,nextState);
  }

  componentDidUpdate(nextProps,nextState) {
      console.log('[Update App.js] Inside componentDidUpdate', nextProps,nextState);
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
    this.setState((prevState,props)=>{
      return {
        showPersons:!doesShow,
        toggleClicked:prevState.toggleClicked + 1 
      }
    });
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons:persons});
  }

  // () => this.deletePersonHandler(index) or deletePersonHandler.bind(this,index)

  render() {
    console.log('[App.js] Inside Render');
    let persons = null;

    if (this.state.showPersons){
      persons = <Persons
            persons = {this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler} />;
    }

    return (
        <Aux>
        <button onClick={()=>{this.setState({showPersons:true})}}>Show Persons</button>
          <Cockpit
            appTitle={this.props.title}
            showPersons ={this.state.showPersons}
            persons={this.state.persons}
            userInput={this.state.userInput}
            changed={this.inputChangedHandler}
            copied={this.copyHandler}
            clicked={this.togglePersonsHandler}/>
          {persons}
        </Aux>
    );
  }
}

export default withClass(App,classes.App);
