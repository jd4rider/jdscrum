import {useState, useEffect} from 'react';

import {Container, Row, Col } from "reactstrap";

import Baskets from "./Baskets";


function Canvas(props) {
    // const [baskets, setBaskets] = useState([]);
    const [itemsGlobal, setItemsGlobal] = useState([]);
    
    useEffect(() => {
        // fetch(`http://localhost:3001/baskets?canvasid=${props.currentCanvas.id}&ownerid=${props.currentUser.id}`)
        //   .then(res => res.json())
        //   .then(data => setBaskets(data))
        //   .catch(err => console.log(err));
        fetch(`http://localhost:3001/items?canvasid=${props.currentCanvas.id}&ownerid=${props.currentUser.id}`)
          .then(res => res.json())
          .then(data => setItemsGlobal(data.sort((a, b) => a.priority - b.priority)))
          .catch(err => console.log(err));
          //.finally(setTimeout(setCurrentCanvas(canvas[1]), 1000));
    }, [props.currentCanvas] );

    return(
        <>
          <Container>
            <Row>
            <h4 className="text-center">Canvas: {props.currentCanvas.title}</h4>
            </Row>
            <Row>
              {props.baskets.map(basket => <Baskets key={basket.id} title={basket.title} type={basket.type} ownerid={props.currentUser.id} canvasid={props.currentCanvas.id} itemsGlobal={itemsGlobal} setItemsGlobal={setItemsGlobal} />)}
            </Row>
          </Container>
        </>
    );
}

export default Canvas;