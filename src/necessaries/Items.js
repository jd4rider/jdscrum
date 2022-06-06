import { Card, 
         CardBody, 
         CardSubtitle, 
         CardTitle, 
         CardText, 
         CardHeader,
         Button } 
from 'reactstrap'

const Items = (props) => {
    return(
        <Card id={props.status} draggable onDragStart={props.onDragStart}>
          <CardHeader>
          <Button onClick={props.onItemDelete} type="button" class="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </Button>
          </CardHeader>
          <CardBody>
            <CardTitle tag="h5">
              {props.title}
            </CardTitle>
            <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Card subtitle (placeholder)
            </CardSubtitle>
            <CardText>
              {props.description}
            </CardText>
            {/* <Button>
              Button
            </Button> */}
          </CardBody>
        </Card>
    );
}

export default Items;