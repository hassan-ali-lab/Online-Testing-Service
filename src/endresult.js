import React from "react";

export default class EndResult extends React.Component {

    render() {
        return (<div className="result">
        <h3> Final score {this.props.score} points </h3>
        <div>
          The key is :
          <ul>
            {this.props.Data.map((item, index) => (
              <li className="ui floating message options" key={index}>
                {item.answer}
              </li>
            ))}
          </ul>
        </div>
      </div>);
    }
}