import React, { useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import MarketPlace from "./marketPlace";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    zIndex: 0,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // },

    marginRight: theme.spacing(2),
    marginLeft: 0,
    display: "flex",
    alignItems: "left",
    justifyContent: "left",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "100%",
    },
  },

  menuItem: {
    padding: "4px 20px",
    userSelect: "none",
    height: "100%",
    color: "#FFFFFF",
    backgroundColor: "rgba(0, 0, 0, 0)",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },

  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [marketPlaceAnchorEl, setMarketPlaceAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isMarketPlaceMenuOpen = Boolean(marketPlaceAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMarketPlaceMenu = () => {
    setMarketPlaceAnchorEl(null);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleMarketPlaceOpen = (event) => {
    setMarketPlaceAnchorEl(event.currentTarget);
  };
  const handleLogOut = () => {
    localStorage.clear();

    window.location = "/";
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      {localStorage.getItem("token") && (
        <MenuItem onClick={handleLogOut}>Log out</MenuItem>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const marketPlaceId = "marketPlace";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  const marketPlaceMenu = (
    <Menu
      anchorEl={marketPlaceAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={marketPlaceId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMarketPlaceMenuOpen}
      onClose={closeMarketPlaceMenu}
    >
      <MenuItem
        onClick={() => {
          window.location = "/marketPlace";
        }}
      >
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Go to MarketPlace</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            aria-controls={marketPlaceId}
            aria-haspopup="true"
            className={classes.menuButton}
            color="inherit"
            onClick={handleMarketPlaceOpen}
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography className={classes.menuItem} variant="h6" noWrap>
              Home
            </Typography>
          </Link>
          {!localStorage.getItem("token") && (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Typography className={classes.menuItem} variant="h6" noWrap>
                Sign-in
              </Typography>
            </Link>
          )}

          {!localStorage.getItem("token") && (
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Typography className={classes.menuItem} variant="h6" noWrap>
                Make an Account
              </Typography>
            </Link>
          )}
          {localStorage.getItem("token") && (
            <Link to="/newMakeQuiz" style={{ textDecoration: "none" }}>
              <Typography className={classes.menuItem} variant="h6" noWrap>
                Make a Quiz
              </Typography>
            </Link>
          )}
          {localStorage.getItem("token") && (
            <Link to="/purchasedQuizzes" style={{ textDecoration: "none" }}>
              <Typography className={classes.menuItem} variant="h6" noWrap>
                Purchased Quizzes
              </Typography>
            </Link>
          )}

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {Boolean(localStorage.getItem("token")) && (
              <Typography className={classes.menuItem} variant="h6" noWrap>
                Welcome, {props.signedIn}!
              </Typography>
            )}

            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {marketPlaceMenu}
      {renderMenu}
    </div>
  );
}
