import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {

      constructor(props){
            super(props);
            console.log('[Persons.js] Inside constructor',props);
      }
            
      componentWillMount(){
            console.log('[Persons.js] Inside componentWillMount()');
      }
            
      componentDidMount(){
            console.log('[Persons.js] Inside componentDidMount()');
      }

      componentWillUnmount(){
            console.log('[Persons.js] I\'m about to be removed!');
          }

      componentWillReceiveProps(nextProps) {
            console.log('[UPDATE Persons.js] Inside componentWillReceiveProps',nextProps)
      }

      // shouldComponentUpdate(nextProps, nextState) {
      //       console.log('[UPDATE Persons.js] Inside shouldComponentUpdate',nextProps, nextState);
      //       return nextProps.persons !== this.props.persons ||
      //       nextProps.changed !== this.props.changed ||
      //       nextProps.clicked !== this.props.clicked;
      //       // return true;
      // }

      componentWillUpdate(nextProps,nextState) {
            console.log('[Update Persons.js] Inside componentWillUpdate', nextProps,nextState);
      }

      componentDidUpdate(nextProps,nextState) {
            console.log('[Update Persons.js] Inside componentDidUpdate', nextProps,nextState);
      }



      render() {
            console.log('[Persons.js] Inside Render');
            
            return this.props.persons.map((person,index) => {
                  return <Person
                      click={() => this.props.clicked(index)}
                      name={person.name}
                      position={index}
                      age={person.age}
                      key = {person.id}
                      changed={(event) => this.props.changed(event,person.id)} />
                })  ;  
      }
} 

export default Persons;