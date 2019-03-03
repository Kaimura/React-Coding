import React from 'react';
import styled from 'styled-components';

function Headline() {
     const Header = styled.header`
        background: gainsboro;
        font-size: 2em;
        text-align: center;
        padding: 10px 0;
     `

    return (
        <Header>
            My Todo List
        </Header>

    /* <div>
            <h1>Daniel Kerata</h1>
            <p>Hardcore boiii, smacking dem bitches</p>
            <ul>
                <li>Buy apples</li>
                <li>Buy hoe</li>
                <li>Go to Hospital</li>
            </ul>
        </div> */
    );
}

export default Headline;