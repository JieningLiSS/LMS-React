
import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddAuthorModal } from './AddAuthorModal';
import { EditAuthorModal } from './EditAuthorModal';

export class Author extends Component {

    constructor(props) {
        super(props);
        this.state = { deps: [], addModalShow: false, editModalShow: false }
    }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('http://localhost:3000/authors')
            .then(response => response.json())
            .then(data => {
                this.setState({ deps: data });
            }
            );
    }

    componentDidUpdate() {
        this.refreshList();
    }

    deleteDep(depid) {
        if (window.confirm('Are you sure?')) {
            fetch('http://localhost:3000/authors/' + depid, {
                method: 'DELETE',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    render() {

        const { deps, depid, depname } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        return (
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Author ID</th>
                            <th>Author Name</th>
                            <th>Option</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep =>
                            <tr key={dep.authorId}>
                                <td>{dep.authorId}</td>
                                <td>{dep.authorName}</td>
                                <td>
                                    <ButtonToolbar>
                                        <Button
                                            className="mr-2" variant="info"
                                            onClick={() => this.setState({ editModalShow: true, depid: dep.authorId, depname: dep.authorName })}
                                        >
                                            Edit
</Button>

                                        <Button className="mr-2"
                                            onClick={() => this.deleteDep(dep.authorId)}
                                            variant="danger"
                                        >Delete</Button>

                                        <EditAuthorModal
                                            show={this.state.editModalShow}
                                            onHide={editModalClose}
                                            depid={depid}
                                            depname={depname}
                                        />

                                    </ButtonToolbar>

                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button
                        variant='primary'
                        onClick={() => this.setState({ addModalShow: true })}
                    >Add Author</Button>

                    <AddAuthorModal
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                    />

                </ButtonToolbar>
            </div>
        )
    }

}