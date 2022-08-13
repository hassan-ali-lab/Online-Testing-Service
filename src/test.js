import React, { createRef } from "react";
import { Data } from "./data";
import EndResult from "./endresult";
import Quesion from "./quesion";
import 'bootstrap/dist/css/bootstrap.min.css'

class Test extends React.Component {
  /* possible states for a question*/
  state = {
    curr_Question: 0,
    myAnswer: null,
    options: [],
    score: 0,
    disabled: true,
    isEnd: false,
    name: null
  };

  constructor(props) {
    super(props);
    this.name_field = createRef();
    this.state.time =  {}
    this.state.seconds =  Data.length * 60;
    this.timer = 0
  }
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    this.loadTestData();

    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer = ()=> {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown = () => {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });
    
    // Check if we're at zero.
    if (seconds === 0) { 
      clearInterval(this.timer);
    }
  }


  handleStartEvent = () => {
    let tmp = { ...this.state };
    tmp.started = true;
    tmp.name = (this.name_field.current.value);
    this.setState(tmp);
    this.startTimer();

  }




  loadTestData = () => {
    this.setState(() => {
      return {
        questions: Data[this.state.curr_Question].question,
        answer: Data[this.state.curr_Question].answer,
        options: Data[this.state.curr_Question].options
      };
    });
  };

  
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
  handleOptionSelection = (option) => {
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
    if (this.state.name === null) {
      return (<div>
        <form onSubmit={async (event) => {
          event.preventDefault();
          let st = this.state;
          st.name = this.name_field.current.value;
          await this.setState(st);
        }}>
          {this.state.started ? <div></div> : <div><label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" aria-describedby="Name"
              placeholder="Enter Name: " ref={this.name_field} />

            <button type={"submit"} className="btn btn-primary" onClick={() => {
              this.handleStartEvent();
            }}
            >Start</button>
          </div>
          }

        </form>

      </div>
      );
    } else{
      if (isEnd) {
        return (
          <EndResult score={this.state.score} Data={Data} />
        );
      } else {
        return (
          <div className="App">
            <div> Welcome {this.state.name}</div>
            <div>
          Timer : {this.state.time.m} : {this.state.time.s}
        </div>
            <Quesion onOptionSelection={this.handleOptionSelection} options={options} question={this.state.questions} myAnswer={myAnswer} curr_Question={curr_Question} size={Data.length} />

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
}
export default Test;
