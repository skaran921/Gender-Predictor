import React, { Component } from "react";
import "./App.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      result: ""
    };
  }

  predictGender() {
    if (this.state.firstName === "") {
      alert("First Name is Required!");
    } else if (this.state.lastName === "") {
      alert("Last Name is Required!");
    } else if (
      this.state.lastName.toLowerCase() === "kaur" ||
      this.state.lastName.toLowerCase() === "rani" ||
      this.state.lastName.toLowerCase() === "devi" ||
      this.state.lastName.toLowerCase() === "kumari"
    ) {
      this.setState({
        firstName: "",
        lastName: "",
        result: "Female"
      });
    } else if (
      this.state.lastName.toLowerCase() === "Kumar"
      // this.state.lastName.toLowerCase() == "Singh"
    ) {
      this.setState({
        firstName: "",
        lastName: "",
        result: "Male"
      });
    } else {
      fetch(`https://api.genderize.io?name=${this.state.firstName}`)
        .then(response => {
          return response.json(response);
        })
        .then(jsonResponse => {
          // console.log(jsonResponse);
          this.setState({
            firstName: "",
            lastName: "",
            result: jsonResponse["gender"]
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
  render() {
    return (
      <div className="mainDiv">
        <h2 className="heading">Gender Predictor</h2>
        <center>
          <form action="">
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              value={this.state.firstName}
              onChange={e => {
                this.setState({ firstName: e.target.value });
              }}
              autoFocus
              required
            />
            <br />
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              value={this.state.lastName}
              onChange={e => {
                this.setState({ lastName: e.target.value });
              }}
              autoFocus
              required
            />
            <br />
            <button
              type="button"
              className="btn"
              onClick={() => {
                this.predictGender();
              }}
            >
              Predict Gender
            </button>

            <div className="result">
              <b>
                {" "}
                <span className="greenText">Result:</span> {this.state.result}
              </b>
            </div>
          </form>
        </center>
      </div>
    );
  }
}

export default App;
