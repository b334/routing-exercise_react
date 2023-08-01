import { NavLink } from "react-router-dom";
import classes from "./EventsNavigation.module.css";

function EventsNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <NavLink to="" className={({ isActive }) => (isActive ? classes.active : undefined)} end>
            All Events
          </NavLink>
          <NavLink to="new" className={({ isActive }) => (isActive ? classes.active : undefined)}>
            New Event
          </NavLink>
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
