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
import { modifyPlayerSuccess } from '../appState/actions';

const ModifyPlayerDialog = (props) => {
    const [modifyButtonIsDisabled, setModifyButtonIsDisabled] = useState(true);
    const [dialogName, setDialogName] = useState(props.playerName);
    const [dialogCountry, setDialogCountry] = useState("");
    const [dialogWinnings, setDialogWinnings] = useState(parseFloat(props.playerWinnings));
    const dispatch = useDispatch();

    useEffect(() => {
        if (dialogName === '' || dialogCountry === '' || dialogWinnings === null) {
            setModifyButtonIsDisabled(true);
        } else setModifyButtonIsDisabled(false);
    }, [dialogName, dialogCountry, dialogWinnings]);

    const countryOptions = Object.entries(COUNTRIES).map(([key, value]) => {
        return <MenuItem value={key} key={value}>{value}</MenuItem>
    });

    const handleModify = () => {
        axios.patch(`http://localhost:3001/players/${props.playerIdToModify}`, {
            name: dialogName,
            country: dialogCountry,
            winnings: dialogWinnings,
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            dispatch(modifyPlayerSuccess({ name: dialogName, country: dialogCountry, winnings: dialogWinnings, id: props.playerToModify }))
            // close dialog
            props.handleCancel();
        });
    };

    return (
        <>
            <Dialog open onClose={props.handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="modify-player-dialog-title">Modify Player</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="modify-player-dialog-name"
                        label="Updated Name"
                        type="text"
                        fullWidth
                        required
                        defaultValue={dialogName}
                        onChange={event => setDialogName(event.target.value)}
                    />
                    <Select
                        labelId="country-select-label"
                        id="country-select"
                        value={dialogCountry}
                        onChange={event => setDialogCountry(event.target.value)}
                        required
                        fullWidth
                    >
                        {countryOptions}
                    </Select>
                    <TextField
                        margin="dense"
                        id="modify-player-dialog-winnings"
                        label="Updated Winnings"
                        type="text"
                        fullWidth
                        required
                        defaultValue={dialogWinnings}
                        onChange={event => setDialogWinnings(parseFloat(event.target.value))}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleModify} color="primary" variant='contained' disabled={modifyButtonIsDisabled}>
                        Modify
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ModifyPlayerDialog;
