import { Await, defer, json, redirect, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";

const EventDetailPage = () => {
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>{(loadedEvent) => <EventItem event={loadedEvent} />}</Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={events}>{(loadedEvents) => <EventsList events={loadedEvents} />}</Await>
      </Suspense>
    </>
  );
};
export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);
  if (!response.ok) {
    throw json({ message: "Could not fetch details for selected event." }, { status: 500 });
  } else {
    const responseData = await response.json();

    return responseData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), { status: 500 });
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const responseData = await response.json();
    return responseData.events;
  }
}

export async function loader({ request, params }) {
  const id = params.eventId;
  // await makes defers wait for data before navigating to load the component. After that component is loaded it defers to other deferred data.
  return defer({ event: await loadEvent(id), events: loadEvents() });
}

export async function action({ request, params }) {
  const eventId = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + eventId, { method: request.method });
  if (!response.ok) {
    throw json({ message: "Could not delete the event." }, { status: 500 });
  }
  return redirect("/events");
}
