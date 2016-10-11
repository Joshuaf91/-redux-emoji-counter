import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from	'redux';

const mainReducer = (state = [0,0,0], action) => {
	switch (action.type){
		case "addem-100" :
			var output = state;
			output[0]++
			return output;
		case "removeem-100":
			var output = state;
			output[0]--
			return output;
		case "addem---1" :
			var output = state;
			output[1]++
			return output;
		case "removeem---1":
			output = state;
			output[1]--
			return output;
		case "addem-alien" :
			var output = state;
			output[2]++
			return output;
		case "removeem-alien":
			output = state;
			output[2]--
			return output;
		default:
			return state;
	}
}

const store = createStore(mainReducer, window.devToolsExtension ? window.devToolsExtension() : undefined);

var App = React.createClass({
	addEmoji(emojiType){
		store.dispatch({type: "add"+emojiType});
	},	
	removeEmoji(emojiType){
		store.dispatch({type: "remove"+emojiType});
	},
	displayEmojiem100(){
		var arr = []
		for (var i = 0; i < store.getState()[0]; i++) {
			arr.push(<i className="em em-100"></i>);
		}
		return arr
	},
	displayEmojiem1(){
		var arr = []
		for (var i = 0; i < store.getState()[1]; i++) {
			arr.push(<i className="em em---1"></i>);
		}
		return arr
	},
	displayEmojiemAlien(){
		var arr = []
		for (var i = 0; i < store.getState()[2]; i++) {
			arr.push(<i className="em em-alien"></i>);
		}
		return arr
	},
	render() {
		return (
			<div>
				<div>
					<h1>{store.getState()[0]}</h1>
					<h2>{this.displayEmojiem100()}</h2>
					<button onClick={this.addEmoji.bind(this, "em-100")}>+<i className="em em-100"></i></button>
					<button onClick={this.removeEmoji.bind(this, "em-100")}>-<i className="em em-100"></i></button>
				</div>
				<div>
					<h1>{store.getState()[1]}</h1>
					<h2>{this.displayEmojiem1()}</h2>
					<button onClick={this.addEmoji.bind(this, "em---1")}>+<i className="em em---1"></i></button>
					<button onClick={this.removeEmoji.bind(this, "em---1")}>-<i className="em em---1"></i></button>
				</div>
				<div>
					<h1>{store.getState()[2]}</h1>
					<h2>{this.displayEmojiemAlien()}</h2>
					<button onClick={this.addEmoji.bind(this, "em-alien")}>+<i className="em em-alien"></i></button>
					<button onClick={this.removeEmoji.bind(this, "em-alien")}>-<i className="em em-alien"></i></button>
				</div>
			</div>
    )
  }
});

const render = () => ReactDOM.render(
  <App />,
  document.getElementById('root')
);

render();
store.subscribe(render);