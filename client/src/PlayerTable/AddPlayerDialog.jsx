import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import {
    Button,
    Dialog,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
} from '@material-ui/core';

import { COUNTRIES } from '../constants';
import { createPlayerSuccess } from '../appState/actions';

const AddPlayerDialog = (props) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [country, setCountry] = useState('');
    const [winnings, setWinnings] = useState(null);
    const [addButtonIsDisabled, setAddButtonIsDisabled] = useState(true);

    useEffect(() => {
        if (name === '' || country === '' || winnings === null) {
            setAddButtonIsDisabled(true);
        } else setAddButtonIsDisabled(false);
    }, [name, country, winnings]);

    const handleCancel = () => {
        props.handleDialogClose();
    };

    const handleAdd = () => {
        axios.post('http://localhost:3001/players', {
            name,
            country,
            winnings,
        }).catch(function (error) {
            console.log(error);
        }).then(function (response) {
            dispatch(createPlayerSuccess(response.data));
        });
        props.handleDialogClose();
    };

    const countryOptions = Object.entries(COUNTRIES).map(([key, value]) => {
        return <MenuItem value={key} key={value}>{value}</MenuItem>
    });

    return (
        <div>
            <Dialog open onClose={props.handleDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="add-player-dialog-title">Add New Player</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="add-player-dialog-name"
                        label="Name"
                        type="text"
                        fullWidth
                        required
                        onChange={event => setName(event.target.value)}
                    />
                    <Select
                        labelId="country-select-label"
                        id="country-select"
                        value={country}
                        onChange={event => setCountry(event.target.value)}
                        required
                        fullWidth
                    >
                        {countryOptions}
                    </Select>
                    <TextField
                        margin="dense"
                        id="add-player-dialog-winnings"
                        label="Winnings"
                        type="text"
                        fullWidth
                        required
                        onChange={event => setWinnings(parseFloat(event.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} color="primary" disabled={addButtonIsDisabled} variant='contained'>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddPlayerDialog;