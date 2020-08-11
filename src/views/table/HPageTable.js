import React, { Component } from 'react';

export default class HPageTable extends Component {
  state = {
    fields: this fields,
    list: this.list,
    pageSize: 10
  }

  render(){
      return (
        <React.Fragment>
          <p></p>
          <table striped bordered hover size="sm">
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </React.Fragment>
      );
  }
}
