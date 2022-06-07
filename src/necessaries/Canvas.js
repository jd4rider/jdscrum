import {useState, useEffect} from 'react';

import {Container, Row } from "reactstrap";

import Baskets from "./Baskets";


function Canvas() {
    const [baskets, setBaskets] = useState([]);
    const [itemsGlobal, setItemsGlobal] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/baskets')
          .then(res => res.json())
          .then(data => setBaskets(data))
          .catch(err => console.log(err));
        fetch('http://localhost:3001/items')
          .then(res => res.json())
          .then(data => setItemsGlobal(data))
          .catch(err => console.log(err));
    }, [] );

    return(
        <>
          <Container>
            <Row>
              {baskets.map(basket => <Baskets key={basket.id} title={basket.title} type={basket.type} itemsGlobal={itemsGlobal} setItemsGlobal={setItemsGlobal} />)}
            </Row>
          </Container>
        </>
    );
}

export default Canvas;