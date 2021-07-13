import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

import { deletePlayerSuccess } from '../appState/actions';

const DeletePlayerDialog = (props) => {
    const dispatch = useDispatch();

    const handleDelete = () => {
        axios.delete(`http://localhost:3001/players/${props.playerToDelete}`).then(
            function () {
                dispatch(deletePlayerSuccess(props.playerToDelete))
            }
        ).catch(function (error) {
            console.log(error);
        }).then(function () { props.handleCancel() });
    };

    return (
        <>
            <Dialog
                open
                onClose={props.handleCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Delete Player</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this player? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};

export default DeletePlayerDialog;
