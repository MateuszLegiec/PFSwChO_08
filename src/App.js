import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

export default function App() {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/fibonacci">Fibonacci</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route path="/fibonacci" element={<Fibo/>}/>
                </Routes>
            </div>
        </Router>
    );
}

function Home() {
    return (
        <div>
            <h2>PFSwChO – Lab 8</h2>
            <h3>Autor: Mateusz Legieć</h3>
            <h3>Grupa: 2.2.3</h3>
        </div>
    );
}

class Fibo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: '',
            history: [],
            calculations: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        let value = this.state.value;
        const history = this.state.history;
        history.unshift(value);

        const calculations = this.state.calculations.filter(it => it.key !== value);
        calculations.unshift({key: value, value: fibonacci(value)})

        this.setState({
            value: value,
            history: [...history],
            calculations: [...calculations]
        })

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div>
                    <input type="number" value={this.state.value} onChange={this.handleChange}/>
                    <button onClick={this.handleSubmit}>Calculate</button>
                </div>
                { this.state.calculations.map(it => <div>Fibonacci sequence for value {it.key} equals {it.value}</div> ) }
            </div>
        );
    }

}

export function fibonacci(n) {
    return n < 1 ? 0 : n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2)
}
