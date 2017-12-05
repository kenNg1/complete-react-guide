import React from 'react';
import styles from './Cockpit.css';
import Char from '../Char/Char.js';
import Validation from '../Validation/Validation.js';
import Aux from '../../hoc/Aux';

const cockpit = (props) => {

    const classes = [];
    let btnClass = styles.Button;
    
    const deleteCharHandler = (index) => {
        const text = props.userInput.split('');
        text.splice(index,1);
        const updatedText = text.join('');
        this.setState({userInput:updatedText})
      }

    if (props.showPersons){
        btnClass = [styles.Button,styles.Red].join(' ');
    }
    
    if (props.persons.length <= 2) {
        classes.push(styles.red) // classes = ['red']
    }
    if (props.persons.length <= 1) {
        classes.push(styles.bold) // classes = ['red','bold']
    }

    const charList = props.userInput.split('').map((ch,index)=>{
        return <Char
        character={ch}
        key={index}
        click={()=> deleteCharHandler(index)}
         />;
      });

    return (
        <Aux>
            <h1>{props.appTitle}</h1>
            <input type="text" onChange={props.changed} value={props.userInput} />
            <p>{props.userInput}</p>
            <Validation inputLength={props.userInput.length} />
            {charList}
            <h1>Hi I'm a react app </h1>
            <p className={classes.join(' ')} onCopy={props.copied}> This is really working! </p>
            {/* below is less efficient */}
            <button 
            className={btnClass}
            onClick={props.clicked}>Toggle Names</button>
        </Aux>
    );
};

export default cockpit;