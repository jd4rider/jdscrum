import { Card, 
         CardBody, 
         CardSubtitle, 
         CardTitle, 
         CardText, 
         CardHeader,
         Button } 
from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const Items = (props) => {
    return(
        <Card id={`card-${props.id}`} draggable onDragStart={props.onDragStart}>
          <CardHeader>
            <div className="d-flex justify-content-between">
              <div className='mt-2 text-start'>
              <FontAwesomeIcon size='lg' title="Edit Card" style={{cursor: 'pointer'}} className="mx-2" icon={faEllipsisV} onClick={props.onEdit} />
              </div>
            <div className='text-end'>
              <FontAwesomeIcon size='lg' title="Make Top Priority" style={{cursor: 'pointer'}} className="mx-2" icon={faArrowUp} onClick={props.onUp} />
              <Button title="Delete Card" onClick={props.onItemDelete} type="button" class="close" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </Button>
            </div>
          </div>
          
    
    
          </CardHeader>
          <CardBody>
            <CardTitle tag="h5">
              {props.title}
            </CardTitle>
            {/* <CardSubtitle
              className="mb-2 text-muted"
              tag="h6"
            >
              Card subtitle (placeholder)
            </CardSubtitle> */}
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