import React from "react";

import clsx from "clsx";
import { useRecoilState } from "recoil";

import { useTheme } from "@material-ui/core/styles";
import { makeStyles, createStyles, Button } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import DrawerState from "atoms/DrawerState";

const drawerWidth = 0;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    // drawerOpen: {
    //   width: drawerWidth,
    //   transition: theme.transitions.create("width", {
    //     easing: theme.transitions.easing.sharp,
    //     duration: theme.transitions.duration.enteringScreen,
    //   }),
    // },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    listItem: {
      background: "#fff",
      "&:hover": {
        background: theme.palette.primary.dark,
      },
    },
  })
);

const DrawerComponent: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerState, setDrawerState] = useRecoilState(DrawerState);
  const { isOpen } = drawerState;
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer)}
      classes={{
        paper: classes.drawerClose,
      }}
    >
      <DrawerItems />
    </Drawer>
  );
};

interface DrawerItemProps {
  isDrawer?: boolean;
}
const DrawerItems: React.FC<DrawerItemProps> = ({ isDrawer }) => {
  const [drawerState, setDrawerState] = useRecoilState(DrawerState);
  const { isOpen } = drawerState;
  const classes = useStyles();

  const theme = useTheme();
  return (
    <div style={{ width: 250 }}>
      <div className={classes.toolbar}>
        <IconButton
          onClick={() => {
            console.log("Pressed the drawer close icon");
            setDrawerState((state: object) => ({
              ...state,
              isOpen: false,
            }));
          }}
        >
          {theme.direction === "rtl" ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) =>
          isDrawer ? (
            <ListItem
              button
              key={text}
              className={classes.listItem}
              style={{
                alignItems: "center",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
              {/* {isDrawer && <ListItemText primary={text} />} */}
            </ListItem>
          ) : (
            <ListItem
              button
              // key={text}

              className={classes.listItem}
              style={{
                alignItems: "center",
                paddingTop: 10,
                paddingBottom: 10,
              }}
            >
              <ListItemIcon title="dsafswdf">
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
              {/* {isDrawer && <ListItemText primary={text} />} */}
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

const SwipableDrawerComponent: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [drawerState, setDrawerState] = useRecoilState(DrawerState);
  const { isOpen } = drawerState;
  const toggleDrawer = (isOpen: boolean) => {
    setDrawerState((state: object) => ({
      ...state,
      isOpen,
    }));
  };
  return (
    <SwipeableDrawer
      anchor="left"
      open={isOpen}
      onClose={() => toggleDrawer(false)}
      onOpen={() => toggleDrawer(true)}
    >
      <DrawerItems isDrawer />
    </SwipeableDrawer>
  );
};

export { SwipableDrawerComponent, DrawerComponent };
