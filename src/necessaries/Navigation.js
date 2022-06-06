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

function Navigation() {
	const [isOpen, setIsOpen] = useState(false);

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
						<NavItem>
						<NavLink href="/components/">
							Components
						</NavLink>
						</NavItem>
						<NavItem>
						<NavLink href="https://github.com/reactstrap/reactstrap">
							GitHub
						</NavLink>
						</NavItem>
						<UncontrolledDropdown
						inNavbar
						nav
						>
						<DropdownToggle
							caret
							nav
						>
							Options
						</DropdownToggle>
						<DropdownMenu right>
							<DropdownItem>
							Option 1
							</DropdownItem>
							<DropdownItem>
							Option 2
							</DropdownItem>
							<DropdownItem divider />
							<DropdownItem>
							Reset
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
