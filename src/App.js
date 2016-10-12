import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from	'redux';

const mainReducer = (state = {"em-100":1,"em---1":0,"em-alien":0}, action) => {
	switch (action.type){
		case "add" :
			state[action.emojiType]++
			return state
		case "remove" :
			state[action.emojiType]--
			return state
		default:
			return state;
	}
}

const store = createStore(mainReducer,  window.devToolsExtension ? window.devToolsExtension() : undefined);

var App = React.createClass({
	addRemoveEmoji(type, emojiType){
		store.dispatch({type: type, emojiType: emojiType });
	},
	display(){
		var output = [];
		for(let key in store.getState()){
			output.push(<EmojiDisplay that={this} emoji={key}/>);
		}
		return output
	},
	render() {
		console.log(store.getState()['em-alien'])
		return (
			<div>
				{this.display()}
			</div>
    )
  }
});

var EmojiDisplay = React.createClass({
	displayEmoji(){
		var arr = []
		for (var i = 0; i < store.getState()[this.props.emoji]; i++) {
			arr.push(<i className={"em "+this.props.emoji}></i>);
		}
		return arr
	},
	render(){
		return(
			<div>
				<h1>{store.getState()[this.props.emoji]}</h1>
				<h2>{this.displayEmoji()}</h2>
				<button onClick={this.props.that.addRemoveEmoji.bind(this.props.that, "add", this.props.emoji)}>+<i className={"em " + this.props.emoji}></i></button>
				<button onClick={this.props.that.addRemoveEmoji.bind(this.props.that, "remove", this.props.emoji)}>-<i className={"em "+this.props.emoji}></i></button>
			</div>
			)
	}
})

const render = () => ReactDOM.render(
  <App />,
  document.getElementById('root')
);

render();
store.subscribe(render);