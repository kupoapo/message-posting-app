import React, { Component } from "react";
import { Button, Container, Card, Form, FormGroup, FormControl } from "react-bootstrap";
import MessageList from "./components/MessageList";

class Main extends Component {

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            letters: 0,
            maxletters: 64,
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        if(this.state.text.length > 0)
        {
            let currentTime = new Date();
            let msg = {
                id: 0,
                text: this.state.text,
                date: currentTime.toLocaleString()
            }
            await fetch("http://localhost:5000/api/messages/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(msg),
            });
            this.setState({ text: "" });
        }
    }

    handleChange(event) {
        this.setState({ text: event.target.value, letters: event.target.value.length });
    }
    
    render(){
        return(<>
                    <Container>
                        <Card className="mt-3">
                            <Card.Body className="p-3">
                                <Form onSubmit={this.handleSubmit}>
                                    <FormGroup>
                                        <Form.Label className="m-0 classy">Say something!</Form.Label>
                                        <FormControl type="text" id="messagebox" placeholder="Write a short message here..." maxLength={this.state.maxletters} value={this.state.text} onChange={this.handleChange}/>
                                        <Form.Label className="m-0 mt-1">Remaning: {this.state.letters}/{this.state.maxletters}</Form.Label>
                                    </FormGroup>
                                    <Button className="mt-2" variant="primary" type="submit">Submit</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                    <MessageList />
                </>
        );
    }
}

export default Main;