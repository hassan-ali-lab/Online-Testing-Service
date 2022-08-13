import React from "react";
import { Data } from "./data";
import Quesion from "./quesion";

class Test extends React.Component {
/* possible states for a question*/
    state = {
    curr_Question: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false
  };

  loadTestData = () => {
    this.setState(() => {
      return {
        questions: Data[this.state.curr_Question].question,
        answer: Data[this.state.curr_Question].answer,
        options: Data[this.state.curr_Question].options
      };
    });
  };

  componentDidMount() {
    this.loadTestData();
  }
  nextQuestion = () => {
    const { myAnswer, answer, score } = this.state;
    if (myAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }

    this.setState({
      curr_Question: this.state.curr_Question + 1
    });
    console.log(this.state.curr_Question);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.curr_Question !== prevState.curr_Question) {
      this.setState(() => {
        return {
          disabled: true,
          questions: Data[this.state.curr_Question].question,
          options: Data[this.state.curr_Question].options,
          answer: Data[this.state.curr_Question].answer
        };
      });
    }
  }
  handleOptionSelection = (option)=>{
    this.check_Answer(option);
  }
  //check answer
  check_Answer = (answer) => {
    this.setState({ myAnswer: answer, disabled: false });
  };
  finish = () => {
    if (this.state.curr_Question === Data.length - 1) {
      this.setState({
        isEnd: true
      });
    }
    if (this.state.myAnswer === this.state.answer) {
      this.setState({
        score: this.state.score + 1
      });
    }
  };
  render() {
    const { options, myAnswer, curr_Question, isEnd } = this.state;
    /*show the key at the end*/
    if (isEnd) {
      return (
        <div className="result">
          <h3> Final score {this.state.score} points </h3>
          <div>
            The key is :
            <ul>
              {Data.map((item, index) => (
                <li className="ui floating message options" key={index}>
                  {item.answer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          
          <Quesion onOptionSelection = {this.handleOptionSelection} options={options} question={this.state.questions} myAnswer={myAnswer} curr_Question={curr_Question}/>
{/*           
          <span>{`Questions ${curr_Question + 1}  out of ${
            Data.length 
          } remaining `}</span>


          <h1>{this.state.questions} </h1>
          
          {options.map((option) => (
            <p
              key={option}
              className={`ui floating message options
         ${myAnswer === option ? "selected" : null}
         `}
              onClick={() => this.check_Answer(option)}
            >
              {option}
            </p>
          ))} */}



          {curr_Question < Data.length - 1 && (
            <button
              className="ui inverted button"
              disabled={this.state.disabled}
              onClick={this.nextQuestion}
            >
              Next
            </button>
          )}
          {/* //adding a finish button */}
          {curr_Question === Data.length - 1 && (
            <button className="ui inverted button" onClick={this.finish}>
              Finish
            </button>
          )}
        </div>
      );
    }
  }
}
export default Test;
