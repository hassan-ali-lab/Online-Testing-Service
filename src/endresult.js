import React from "react";

export default class EndResult extends React.Component {

    render() {
        return (<div className="result">
        <h3> Final score {this.props.score} points </h3>
        <div>
          The key is :
          <ul>
            {this.props.Data.map((item, index) => (
              <li className="ui floating message options" key={item.id}>
                <div>Question {item.id+1} : {item.question}</div> 
                <div>
                {item.options.map((option) => (
                <p
                    key={option}
                    className={`
            ${item.answer === option ? "text-light bg-dark" : null}
         `}
                    onClick={() => this.props.onOptionSelection(option)}
                >
                    {option}
                </p>
            ))}
            </div> 
                {/* {item.answer} */}
              </li>
            ))}
          </ul>
        </div>
      </div>);
    }
}