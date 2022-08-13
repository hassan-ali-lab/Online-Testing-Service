import React from "react";

export default class Quesion extends React.Component {

    render() {
        return (<div>    <span>{`Questions ${this.props.curr_Question + 1}  out of ${this.props.size} remaining `}</span>


            <h1>{this.props.question} </h1>

            {this.props.options.map((option) => (
                <p
                    key={option}
                    className={`ui floating message options
         ${this.props.myAnswer === option ? "selected" : null}
         `}
                    onClick={() => this.props.onOptionSelection(option)}
                >
                    {option}
                </p>
            ))} </div>);
    }
}