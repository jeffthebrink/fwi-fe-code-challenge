import React, { useState } from 'react';
import { Button } from '@material-ui/core';

import AddPlayerDialog from './AddPlayerDialog';

const TableHeader = () => {
  const [addPlayerDialogIsOpen, setAddPlayerDialogIsOpen] = useState(false);

  const toggleAddPlayerDialog = () => {
    setAddPlayerDialogIsOpen(!addPlayerDialogIsOpen);
  };

  return (
    <div>
      <div>
        <table
          id="player-table-header"
          role="presentation"
          className="table table--fixed"
        >
          <thead>
            <tr role="row">
              <th role="columnheader" className="table__header table__avatar" />
              <th role="columnheader" className="table__header table__player">
                Player
                <span style={{ marginLeft: '25px' }}>
                  <Button variant='contained' disableElevation onClick={toggleAddPlayerDialog}>Add</Button>
                </span>
              </th>
              <th role="columnheader" className="table__header table__winnings">
                Winnings
              </th>
              <th role="columnheader" className="table__header table__native">
                Native of
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div>
        {addPlayerDialogIsOpen &&
          <AddPlayerDialog handleDialogClose={toggleAddPlayerDialog} />
        }
      </div>
    </div>
  )
};

export default TableHeader;
