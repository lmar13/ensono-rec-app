import React from 'react';
import './ShowResult.css';
import { Table } from 'react-bootstrap';

const ShowResult = ({ data }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Word</th>
        <th>Count</th>
      </tr>
    </thead>
    <tbody>
      {data.reverse().map((val, index) => (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{val[0]}</td>
          <td>{val[1]}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ShowResult;
