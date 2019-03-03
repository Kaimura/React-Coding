import React from 'react'
import styled from 'styled-components';

function Breadcrumb(props) {

    const Button = styled.button`
        border: none;
        margin: 5px 5px;
            &:hover {
                background: #e5e5e5;
            }
    `;

  return (
    <div>
      <Button onClick={() => props.filteredList('all')}>All</Button>
      <Button onClick={() => props.filteredList('finished')}>Finished</Button>
      <Button onClick={() => props.filteredList('remaining')}>Remaining</Button>
    </div>
  )
}

export default Breadcrumb;