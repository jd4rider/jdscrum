import {useState, useEffect} from 'react';

import {Container, Row, Col } from "reactstrap";

import { useAuthUser } from 'react-auth-kit';

import Baskets from "./Baskets";


function Canvas(props) {
  const auth = useAuthUser()
    // const [baskets, setBaskets] = useState([]);
    const [itemsGlobal, setItemsGlobal] = useState([]);
    const [itemcount, setItemcount] = useState(0);
    
    useEffect(() => {
        // fetch(`http://localhost:3001/baskets?canvasid=${props.currentCanvas.id}&ownerid=${props.currentUser.id}`)
        //   .then(res => res.json())
        //   .then(data => setBaskets(data))
        //   .catch(err => console.log(err));
        const headers = {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${auth().token}` 
        }

        fetch(`http://localhost:3001/items?canvasid=${props.currentCanvas.id}&ownerid=${props.currentUser.id}`,
              { headers : headers })
          .then(res => res.json())
          .then(data => setItemsGlobal(data.sort((a, b) => a.priority - b.priority)))
          .catch(err => console.log(err));
        fetch(`http://localhost:3001/itemcount?ownerid=${props.currentUser.id}`,
              { headers : headers })
          .then(res => res.json())
          .then(data => setItemcount(parseInt(data['lengths'])))
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
              {props.baskets.map(basket => <Baskets key={basket.id} title={basket.title} type={basket.type} ownerid={props.currentUser.id} canvasid={props.currentCanvas.id} itemsGlobal={itemsGlobal} setItemsGlobal={setItemsGlobal} itemcount={itemcount} setItemcount={setItemcount} />)}
            </Row>
          </Container>
        </>
    );
}

export default Canvas;