import React from "react";
import clsx from "clsx";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    content: {
      flexGrow: 1,
      // padding: theme.spacing(1, 0),
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  })
);

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = (props) => {
  const { children } = props;
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  );
};

export default Container;
