import { useState } from 'react';
import {Navbar, 
	    NavItem, 
		NavbarBrand, 
		NavbarToggler, 
		Collapse, 
		Nav, 
		NavLink, 
		UncontrolledDropdown,
		DropdownToggle,
		DropdownMenu,
		DropdownItem,
		NavbarText
	} from 'reactstrap';

function Navigation(props) {
	const [isOpen, setIsOpen] = useState(false);

	const handleNewCanvas = () => {
		let newCanvasId;
		if(!props.canvases[props.canvases.length-1].id) {
			newCanvasId = 1;
		} else {
			newCanvasId = props.canvases[props.canvases.length-1].id + 1;
		}
		let newBasketsId;
		if(!props.baskets[props.baskets.length-1].id) {
			newCanvasId = 1;
		} else {
			newCanvasId = props.baskets[props.baskets.length-1].id + 1;
		}
		const newCanvas = {
			id: newCanvasId,
			title: prompt("Enter title"),
			ownerid: props.currentUser.id,
		}
		const newBaskets = [
			{
				id: newBasketsId,
				title: "TODO",
				type: "todo",
				ownerid: props.currentUser.id,
				canvasid: newCanvasId,
			},
			{
				id: newBasketsId + 1,
				title: "In Progress",
				type: "doing",
				ownerid: props.currentUser.id,
				canvasid: newCanvasId,
			},
			{
				id: newBasketsId + 2,
				title: "Done",
				type: "done",
				ownerid: props.currentUser.id,
				canvasid: newCanvasId,
			}
		]
		props.setCanvases([...props.canvases, newCanvas]);
		props.setCurrentCanvas(newCanvas);
		fetch('http://localhost:3001/canvases/insert', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newCanvas)
		 }).then(res => console.log('Insert happened'));

		 fetch('http://localhost:3001/baskets/insert', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(newBaskets)
		 }).then(res => console.log('Insert happened'));
	}

	return (
		<>
			<div>
				<Navbar
					color="dark"
					expand="md"
					dark
				>
					<NavbarBrand href="/">
					JDScrum
					</NavbarBrand>
					<NavbarToggler onClick={(() => setIsOpen(!isOpen))} />
					<Collapse isOpen={isOpen} navbar>
					<Nav
						className="me-auto"
						navbar
					>
						{/* <NavItem>
						<NavLink href="/components/">
							Components
						</NavLink>
						</NavItem>
						<NavItem>
						<NavLink href="https://github.com/reactstrap/reactstrap">
							GitHub
						</NavLink>
						</NavItem> */}
						<UncontrolledDropdown
						inNavbar
						nav
						>
						<DropdownToggle
							caret
							nav
						>
							File
						</DropdownToggle>
						<DropdownMenu right>
							{props.canvases.map(canvas => <DropdownItem key={canvas.id} onClick={()=>props.setCurrentCanvas(canvas)}>{canvas.title}</DropdownItem>)}
							<DropdownItem divider />
							<DropdownItem onClick={handleNewCanvas}>
							New Canvas
							</DropdownItem>
						</DropdownMenu>
						</UncontrolledDropdown>
					</Nav>
					<NavbarText>
						Simple Text
					</NavbarText>
					</Collapse>
				</Navbar>
			</div>
		</>
	)
}	

export default Navigation;
