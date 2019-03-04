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
  
  return (
    <div>
      <Button onClick={() => props.setFilterMethod('all')}>All</Button>
      <Button onClick={() => props.setFilterMethod('finished')}>Finished</Button>
      <Button onClick={() => props.setFilterMethod('remaining')}>Remaining</Button>
    </div>
  )
}

export default FilterBar;