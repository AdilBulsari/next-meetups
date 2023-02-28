import React, { Fragment } from "react";
import classes from "./MeetupDetails.module.css";

export default function MeetupDetail(props) {
  return (
    <Fragment>
      <section className={classes.details}>
        <img alt={props.title} src={props.image} />
        <h1>{props.title}</h1>
        <address>{props.address}</address>
        <p>{props.description}</p>
      </section>
    </Fragment>
  );
}
