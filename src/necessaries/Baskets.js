import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Col } from "reactstrap"

import Items from "./Items";



const Baskets = (props) => {
	const onDragOverHandler = (e) => {
		e.preventDefault();
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
		setTimeout(console.log(props.itemsGlobal), 1000);

		props.setItemsGlobal(curritems);
	}

	const onPlusClickHandler = (e, type) => {
		const newitem = {
			id: props.itemsGlobal[props.itemsGlobal.length-1].id + 1,
			title: prompt("Enter title"),
			description: prompt("Enter description"),
			status: type,
			ownerid: 1,
			canvasid: 1
		 }
		

		 props.setItemsGlobal([...props.itemsGlobal, newitem]);
	}

	const onItemDelete = (e, id) => {
		if(window.confirm("Are you sure you want to delete this item?")) props.setItemsGlobal(props.itemsGlobal.filter(item => item.id !== id));
	}

	// useEffect(() => {
	// 	props.setItemsGlobal(itemsfromdb);
	// }, []);

	return(
		<Col className="bg-light border vh-100" onDragOver={onDragOverHandler} onDrop={(e)=>onDropHandler(e, props.type)}>{props.title} 
			{props.itemsGlobal.filter(item => item.status===props.type).map(item =><Items key={item.id} title={item.title} description={item.description} status={item.status} onItemDelete={(e) => onItemDelete(e, item.id)} onDragStart={(e) => onDragStartHandler(e, item.id)} />)}	
			<FontAwesomeIcon icon={faPlus} onClick={(e) => onPlusClickHandler(e, props.type)} />
		</Col>
	);
}

export default Baskets;
