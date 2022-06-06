import {useState, useEffect} from 'react';

import {Container, Row } from "reactstrap";

import Baskets from "./Baskets";

let basketsfromdb = [
  {
    id: 1,
    title: "TODO",
    type: "todo",
    ownerid: 1,
    canvasid: 1
  },
  {
    id: 2,
    title: "In Progress",
    type: "doing",
    ownerid: 1,
    canvasid: 1
  },
  {
    id: 3,
    title: "Done",
    type: "done",
    ownerid: 1,
    canvasid: 1
  }
]

let itemsfromdb = [
	{
		id: 1,
		title: "Item 1",
		description: "This is the first item",
		status: "todo",
    ownerid: 1,
    canvasid: 1
	},
	{
		id: 2,
		title: "Item 2",
		description: "This is the second item",
		status: "done",
    ownerid: 1,
    canvasid: 1
	}
  ]



function Canvas() {
    const [baskets, setBaskets] = useState([]);
    const [itemsGlobal, setItemsGlobal] = useState([...itemsfromdb]);

    useEffect(() => {
        setBaskets(basketsfromdb);
    }, [itemsGlobal] );

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