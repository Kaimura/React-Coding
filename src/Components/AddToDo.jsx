import React from 'react';
// import styled from 'styled-components';

class AddToDo extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            title: ''
        };
    }
    // const Form = styled.form`
    //     background: grey;
    //     display: flex;
    //         input[type=text] {
    //             flex: 10;
    //         }
    //         input[type=submit] {
    //             flex: 3;
    //             background: #444;
    //             border: none;
    //             color: #fff;
    //             padding: 0.4em 0;

    //                 &:hover {
    //                     background: #666;
    //                 }
    //         }
    // `;

    updateValue = event => {
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.addItem(this.state.title);

        this.setState({ title: '' });
    }

  render() {
    return (
        <form onSubmit={this.handleSubmit} >
            <input type="text" name="title" placeholder="Add to do..." onChange={this.updateValue} value={this.state.title} />
            <input type="submit" value="Add"/>
        </form>
    )
  }
}

export default AddToDo
