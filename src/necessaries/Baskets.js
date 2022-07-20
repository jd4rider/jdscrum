import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Col, Button } from "reactstrap"

import Items from "./Items";



const Baskets = (props) => {
	const onDragOverHandler = (e) => {
		e.preventDefault();
	}

	const setItemsandSave = (items) => {
		props.setItemsGlobal(items.sort((a, b) => a.priority - b.priority));
		fetch('http://localhost:3001/items/update', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(items)
		})
	}

	const onDragStartHandler = (e, id) => {
		e.dataTransfer.setData("id", id);
	}


	const onDropHandler = (e, status) => {
		
		let id = e.dataTransfer.getData("id");

		let curritems = props.itemsGlobal.filter(item => {
			if(item.id == id) {
				item.status = status;
			}
			return item;
		});

		setItemsandSave(curritems);
	}

	const onPlusClickHandler = (e, type) => {
		let newid;
		if(!props.itemsGlobal[props.itemsGlobal.length-1].id) {
			newid = 1;
		} else {
			newid = props.itemsGlobal[props.itemsGlobal.length-1].id + 1;
		}
		const newitem = {
			id: newid,
			title: prompt("Enter title"),
			description: prompt("Enter description"),
			status: type,
			ownerid: props.ownerid,
			canvasid: props.canvasid,
			priority: 2
		 }
		

		 props.setItemsGlobal([...props.itemsGlobal, newitem]);
		 fetch('http://localhost:3001/items/insert', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newitem)
		 }).then(res => console.log('Insert happened'));
	}

	const onItemDelete = (e, id) => {
		if(window.confirm("Are you sure you want to delete this item?")) {
			props.setItemsGlobal(props.itemsGlobal.filter(item => item.id !== id));
			fetch(`http://localhost:3001/items/delete/${id}/${props.ownerid}/${props.canvasid}`, {
				method: 'DELETE'
			}).then(res => console.log('Delete happened'));
		}
	}

	const onUp = (e, id) => {
		let items = props.itemsGlobal;
		let curritems = items.filter((item, index) => {
			if(item.id == id) {
				item.priority = 1;
			} else {
			 	item.priority = 2;
			 }
			return item;
		});
		setItemsandSave(curritems);
	}

	const editItem = (e, id) => {
		let items = props.itemsGlobal;
		let itemTitle;
		let itemDescription;
		let curritems = items.filter((item, index) => {
			if(item.id == id) {
				item.title = prompt("Enter New title:", item.title);
				item.description = prompt("Enter New description:", item.description);
				itemTitle = item.title;
				itemDescription = item.description;
			}
			return item;
		});
		if(window.confirm("Your new title is: " + itemTitle + "\nYour new description is: " + itemDescription + "\nAre you sure you want to save this item?")) {
			setItemsandSave(curritems);
		}
	}


	// useEffect(() => {
	// 	props.setItemsGlobal(itemsfromdb);
	// }, []);

	return(
		<Col className="bg-light border vh-100" onDragOver={onDragOverHandler} onDrop={(e)=>onDropHandler(e, props.type)}>{props.title} 
			{props.itemsGlobal.filter(item => item.status===props.type)
							  .map(item =><Items key={item.id} 
												  id={item.id}
								               title={item.title} 
										 description={item.description} 
										      status={item.status} 
										onItemDelete={(e) => onItemDelete(e, item.id)} 
										 onDragStart={(e) => onDragStartHandler(e, item.id)}  
										        onUp={(e) => onUp(e, item.id)}
											  onEdit={(e) => editItem(e, item.id)}
										 />
									)
			}
				<Button	title="Add new Card" outline className="my-1 w-100" onClick={(e) => onPlusClickHandler(e, props.type)}>													
				<FontAwesomeIcon  icon={faPlus} size="lg" />
				</Button>
		</Col>
	);
}

export default Baskets;
