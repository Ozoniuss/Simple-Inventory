// just an example of a class based component and lifecycle methods

import React from "react";

export default class Test extends React.Component {
    constructor(props) {
        super(props)
        this.state = { count: 0 };
    }

    clickedButton() {
        this.setState({ count: this.state.count + 1 })
        console.log("clicked!")
        if (this.state.count === 3) {
            this.props.destroy(false);
        }
    }

    componentDidMount() {
        console.log("mounted!")
    }

    componentDidUpdate() {
        console.log("updated")
    }

    componentWillUnmount() {
        console.log("cleanup")
    }

    render() {
        return (
            <div>
                <p>Clicked" {this.state.count}</p>
                <button className="btn btn-primary" onClick={() => this.clickedButton()}>Click me!</button>
            </div>
        )
    }
}
