import React from 'react';
import './InputData.css';
import { Button, Spinner, Form, Alert } from 'react-bootstrap';
import { ShowResult } from '../ShowResult';
import { Separator } from './../Separator';
import DataService from '../../utils/data.service';

const Data = new DataService();

class InputData extends React.Component {
  state = {
    value: '',
    data: null,
    loading: false,
    submitted: false,
    error: false
  };

  handleChange = event => {
    this.setState({
      value: event.target.value,
      loading: false,
      error: false,
      submitted: false,
      url: ['/top10wordsA', '/top10wordsB']
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.value) {
      this.setState({
        submitted: true,
        loading: true,
        error: false
      });

      Data.fetch(`${this.getUrl()}/${this.state.value}`)
        .then(data => {
          this.setState({
            data,
            loading: false
          });
        })
        .catch(err =>
          this.setState({ error: true, loading: false, submitted: true })
        );
    } else {
      this.setState({ error: true, submitted: true });
    }
  };

  getUrl = () =>
    this.props.location.pathname.includes('word')
      ? this.state.url[0]
      : this.state.url[1];

  render() {
    return (
      <>
        {this.state.error ? (
          <Alert variant={'danger'}>
            <strong style={{ marginRight: '10px' }}>Error!</strong>
            Input needs to be a number and at least 2
          </Alert>
        ) : null}
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button type="submit" disabled={this.state.submitted}>
            Search
          </Button>
          <Button
            type="reset"
            onClick={() =>
              this.setState({
                submitted: false,
                loading: false,
                value: '',
                error: false
              })
            }
            style={{ marginLeft: '10px' }}
          >
            Reset
          </Button>
        </Form>
        <Separator />
        <p>Result</p>
        {this.state.submitted ? (
          this.state.loading ? (
            <Spinner animation="border" style={{ marginBottom: '20px' }} />
          ) : this.state.data ? (
            <ShowResult data={this.state.data} />
          ) : null
        ) : null}
      </>
    );
  }
}

export default InputData;
