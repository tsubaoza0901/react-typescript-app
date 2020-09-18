import React, { useContext } from 'react';
import { ApiContext } from '../context/ApiContext';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import { FiLogOut } from 'react-icons/fi';
import { withCookies } from 'react-cookie';

const useStyles = makeStyles((theme) => ({
  bg: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

// TODO:型を確定させる
const Navbar = (props: any) => {
  const classes = useStyles();
  const { askList, profiles } = useContext(ApiContext);
  // TODO:型を確定させる
  const Logout = () => (event: any) => {
    props.cookies.remove('current-token');
    window.location.href = '/';
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          SNS App
        </Typography>
        <Badge
          className={classes.bg}
          badgeContent={
            // TODO:型を確定させる
            askList.filter((ask: any) => {
              return (
                // TODO:型を確定させる
                ask.approved === false &&
                profiles.filter((item: any) => {
                  return item.userPro === ask.askFrom;
                })[0]
              );
            }).length
          }
          color="secondary"
        >
          <NotificationsIcon />
        </Badge>
        <button className="signOut" onClick={Logout()}>
          <FiLogOut />
        </button>
      </Toolbar>
    </AppBar>
  );
};

export default withCookies(Navbar);
