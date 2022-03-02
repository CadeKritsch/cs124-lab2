import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function MenuPopupState(props) {
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <React.Fragment>
          <Button variant="contained" {...bindTrigger(popupState)}>
            Options
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem onClick={props.onToggleShowCompleted}>
              {props.isCompletedShown ? 'Hide Completed Items' : 'Show Completed Items'}
            </MenuItem>
            <MenuItem onClick={props.onDeleteCompleted}>Delete Completed Items</MenuItem>
          </Menu>
        </React.Fragment>
      )}
    </PopupState>
  );
}

MenuPopupState.propTypes = {
  onToggleShowCompleted: PropTypes.func,
  onDeleteCompleted: PropTypes.func,
  isCompletedShown: PropTypes.bool
};
