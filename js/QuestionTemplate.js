var QuestionTemplate = React.createClass({
  getInitialState: function(){
  	var state = {
		  	aQuestions : [{
	  		question : "What is your name?",
	  		answer : 1,
	  		options  : ["option1adn","optn2a","optn3a","optn4a"],
	  		answered: false
	  	},{
	  		question : "What is your name 2?",
	  		answer : 2,
	  		options  : ["option1b","optn2b","optn3b","optn4b"],
	  		answered: false
	  	}],
	  	score:0
	};
	state.iRandom = Math.floor(Math.random() * (state.aQuestions.length));
	return state;
  },
  selectedAnswer : function(index){
  	var newState ={};
  	this.state.aQuestions[this.state.iRandom].answered = true;
  	this.setState(newState)
  	this.setState(newState,function(){
  		window.setTimeout(function(){
	  	if(this.state.aQuestions[this.state.iRandom].answer == index) newState.score = this.state.score + 1;
	  	this.state.aQuestions.splice(this.state.iRandom,1);
	  	newState.aQuestions = this.state.aQuestions;
	  	newState.iRandom = Math.floor(Math.random() * (newState.aQuestions.length));
	  	this.setState(newState)
  	}.bind(this),400);
  	});
  },
  checkClass: function (i){
  	if(this.state.aQuestions[this.state.iRandom].answered){
	  	if(this.state.aQuestions[this.state.iRandom].answer == i) return 'correctAnswer option'
	  	else return 'wrongAnswer option';
	  }
	  else return 'option';
  },
  render: function() {
  	var virtualDomElement = <div  className="mathQuestionTemplate">
			<div className="question"> {this.state.aQuestions[this.state.iRandom].question}</div>
			<div>
				{this.state.aQuestions[this.state.iRandom].options.map(function(el,i){
					return <div>
						<button 
							onClick={this.selectedAnswer.bind(this,i)}
							className={this.checkClass(i)}> {el} </button>
					</div>;
				},this)}
			</div>
		</div>
	return virtualDomElement;
  }
});

ReactDOM.render(<QuestionTemplate />, document.getElementById("questionTemplate")); 
