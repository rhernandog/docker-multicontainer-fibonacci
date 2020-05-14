import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ""
  };

  fetchValues = async () => {
    const values = await axios.get("/api/values/current");
    this.setState({
      values: values.data
    });
  }

  fetchIndexes = async () => {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({
      seenIndexes: seenIndexes.data
    });
  }

  indexChangeHandler = (e) => {
    this.setState({
      index: e.target.value
    });
  }

  submitForm = async (e) => {
    e.preventDefault();
    await axios.post("/api/values", {
      index: this.state.index
    });
    this.setState({ index: "" });
  }

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  render() {
    return <div className="col-12">
      <h3 className="text-center">Fibonacci Calculator</h3>
      <p className="lead">Calculate the value of a Fibonacci sequence based on the passed value in the form below.</p>

      <div className="row justify-content-center my-3">
        <div className="col-12 col-sm-9 col-md-6">
          <form onSubmit={this.submitForm} className="form-inline mb-5">
            <div className="form-group">
              <label htmlFor="fbIndex">Enter an Index:</label>
              <input type="number" name="fbIndex" id="fbIndex" className="form-control mx-2"
                value={this.state.index}
                onChange={this.indexChangeHandler}
              />
              <button className="btn btn-info" type="submit">Submit</button>
            </div>
          </form>
          <div className="alert alert-info">
            <h3 className="text-center">Indexes Seen</h3>
            {
              this.state.seenIndexes.map((e, i) => {
                return <span key={`index-${i}`} className="badge badge-light">{e.number}</span>
              })
            }
          </div>
          <div className="alert alert-info">
            <h3 className="text-center">Calculated Values</h3>
            {
              (() => {
                const entries = [];
                for (let key in this.state.values) {
                  entries.push(
                    <h5 key={key}>
                      For the index <span className="badge badge-light">{key}</span>, the calculated value is <span className="bdage bdage-light">{this.state.values[key]}</span>
                    </h5>
                  );
                };
                return entries;
              })()
            }
          </div>
        </div>
      </div>
    </div>
  }
};

export default Home;
