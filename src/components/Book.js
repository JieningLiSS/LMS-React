
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

export class Book extends Component {
    constructor(props) {
        super(props);
        this.state = { emps: [], addModalShow: false, editModalShow: false }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('http://localhost:3000/books')
            .then(response => response.json())
            .then(data => {
                this.setState({ emps: data });
            }
            );
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteEmp(empid) {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:3000/books/' + empid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {

        const { emps } = this.state;
        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Book Id</th>
                            <th>Title</th>
                            <th>Author Id</th>
                            <th>Publisher Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emps.map(emp =>
                            <tr key={emp.bookId}>
                                <td>{emp.bookId}</td>
                                <td>{emp.title}</td>
                                <td>{emp.authorId}</td>
                                <td>{emp.publisherId}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }

}