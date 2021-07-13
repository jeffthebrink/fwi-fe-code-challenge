import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Flags from 'react-world-flags';
import { Button } from '@material-ui/core';

import Avatar from '../Avatar';
import { COUNTRIES } from '../constants';
import DeletePlayerDialog from './DeletePlayerDialog';
import ModifyPlayerDialog from './ModifyPlayerDialog';

const TableBody = ({ players }) => {
  const [deletePlayerDialogIsOpen, setDeletePlayerDialogIsOpen] = useState(false);
  const [modifyPlayerDialogIsOpen, setModifyPlayerDialogIsOpen] = useState(false);
  const nameRef = useRef("");
  const countryRef = useRef("");
  const winningsRef = useRef("");
  const idRef = useRef("");

  const toggleDeletePlayerDialog = () => {
    setDeletePlayerDialogIsOpen(!deletePlayerDialogIsOpen);
  };

  const toggleModifyPlayerDialog = () => {
    setModifyPlayerDialogIsOpen(!modifyPlayerDialogIsOpen);
  };

  return (
    <>
      <table
        id="player-table-body"
        role="presentation"
        className="table table--body"
      >
        <tbody>
          {players.map(({ id, name, country, winnings, imageUrl }) => (
            <tr key={id} role="row" className="table__row">
              <td role="gridcell" className="table__avatar">
                <Avatar src={imageUrl} />
              </td>
              <td role="gridcell" className="table__player">
                {name}
              </td>
              <td style={{ position: 'absolute', left: '300px', paddingTop: '5px' }}>
                <div onClick={() => {
                  nameRef.current = name;
                  countryRef.current = country;
                  winningsRef.current = winnings;
                }}>
                  <Button variant='contained' disableElevation onClick={toggleModifyPlayerDialog}>Modify</Button>
                </div>
              </td>
              <td style={{ position: 'absolute', left: '400px', paddingTop: '5px' }}>
                <div onClick={() => idRef.current = id}>
                  <Button variant='contained' disableElevation onClick={toggleDeletePlayerDialog}>Delete</Button>
                </div>
              </td>
              <td role="gridcell" className="table__winnings">
                {winnings.toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'USD',
                })}
              </td>
              <td role="gridcell" className="table__native">
                <div className="country">
                  <Avatar>
                    <Flags code={country} alt="" />
                  </Avatar>
                  {country}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {deletePlayerDialogIsOpen &&
          <DeletePlayerDialog handleCancel={toggleDeletePlayerDialog} playerToDelete={idRef.current} />
        }
      </div>
      <div>
        {modifyPlayerDialogIsOpen &&
          <ModifyPlayerDialog
            handleCancel={toggleModifyPlayerDialog}
            playerName={nameRef.current}
            playerCountry={countryRef.current}
            playerWinnings={winningsRef.current}
            playerIdToModify={idRef.current}
          />
        }
      </div>
    </>
  );
};

TableBody.propTypes = {
  players: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      country: PropTypes.oneOf(Object.keys(COUNTRIES)),
      winnings: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TableBody;
