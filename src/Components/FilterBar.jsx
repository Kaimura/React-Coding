import React from 'react';
import styled from 'styled-components';

function FilterBar(props) {

    const Button = styled.button`
        border: none;
        margin: 2em 5px;
            &:hover {
                background: #fdf6f6;
                cursor: pointer;
            }
    `;
  
    const active = {
      backgroundColor: "rgba(117, 113, 113, 0.85)"
    };

  return (
    <div>
      <Button style={props.method == 'all' ? active : null} onClick={() => props.setFilterMethod('all')}>All</Button>
      <Button style={props.method == 'finished' ? active : null} onClick={() => props.setFilterMethod('finished')}>Finished</Button>
      <Button style={props.method == 'remaining' ? active : null} onClick={() => props.setFilterMethod('remaining')}>Remaining</Button>
    </div>
  )
}

export default FilterBar;