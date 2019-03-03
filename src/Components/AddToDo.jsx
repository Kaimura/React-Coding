import React, { Component } from 'react';
import styled from 'styled-components';

export class AddToDo extends Component {

    state = {
        title: ''
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    const Form = styled.form`
        background: grey;
        display: flex;
            input[type=text] {
                flex: 10;
            }
            input[type=submit] {
                flex: 3;
                background: #444;
                border: none;
                color: #fff;
                padding: 0.4em 0;

                    &:hover {
                        background: #666;
                    }
            }
    `;

    return (
        <Form>
            <input type="text" name="title" placeholder="Add to do..." value={this.state.title} onChange={this.onChange} />
            <input type="submit" value="Add"/>
        </Form>
    )
  }
}

export default AddToDo