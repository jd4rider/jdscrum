/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import axios from 'axios';
import { useSignIn } from 'react-auth-kit';
import { Form, Button } from 'react-bootstrap';
import { css } from "@emotion/react";
import FadeLoader from "react-spinners/FadeLoader";
import { useNavigate} from 'react-router-dom';
import './Login.scss';

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Login = () => {
    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({username: '', password: ''})
    let [loading, setLoading] = React.useState(true);
    let [color] = React.useState("#FF0000");
    let navigate = useNavigate();


    function validateForm() {
        return formData.username.length > 0 && formData.password.length > 0;
    }
    
    const onSubmit = (e) => {
        e.preventDefault()
        console.log(process.env.REACT_APP_API_URL);
        axios.post(`${process.env.REACT_APP_API_URL}${process.env.REACT_APP_API_JWT_TOKEN}`, formData)
            .then((res)=>{
                if(res.status === 200){
                    if(signIn({token: res.data.token,
                               expiresIn: 60,
                               tokenType: "Bearer",
                               authState: res.data})){ 
                        navigate('/')
                    }else {
                        //Throw error
                    }
                }
            })
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent"  className={!loading ? 'grayout' : null}>

                <Form onSubmit={onSubmit}>
                    <Form.Group size="lg" controlId="login" >
                        <Form.Label>Username</Form.Label>
                            <Form.Control
                                autoFocus
                                type={"username"}
                                value={formData.username}
                                onChange={(e)=>setFormData({...formData, username: e.target.value})}
                                style={{"text-transform" : "lowercase"}}
                                autocapitalize="off"
                            />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={formData.password}
                                onChange={(e)=>setFormData({...formData, password: e.target.value})}
                            />
                    </Form.Group>
                    <Button block size="lg" type="submit" disabled={!validateForm()} onClick={() => setLoading(!loading)}>
                        Login
                    </Button>
                </Form>
                <div id="formFooter">
                    <a className="underlineHover" href="#">Forgot Password?</a>
                </div>
                


            </div>
            <br />
            <FadeLoader color={color} loading={!loading} css={override} size={150} />
        </div>


    )
}

export default Login;