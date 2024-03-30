"use client";
import React, { useState } from "react";
import { currentUser } from "@clerk/nextjs";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Link from "next/link";
import { db } from "@/firebase/config";
import globalData from "@/app/data";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DeleteButton from "@/components/DeleteButton";

async function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = await currentUser();

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredEvents(filtered);
  };

  const fetchData = async () => {
    try {
      const eventsCollectionRef = collection(db, "events");
      const eventsQuery = query(
        eventsCollectionRef,
        orderBy("timestamp", "asc")
      );
      const snapshot = await getDocs(eventsQuery);
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setEvents(data);
      setFilteredEvents(data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mt-24 mb-10">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-primary text-center text-4xl font-bold">
          {globalData?.eventsPageTitle ?? "Events"}
        </h1>
        <p className="text-center mt-2 text-muted-foreground">
          {globalData?.eventsPageDescription ?? "No description"}
        </p>
        <Input
          placeholder="Search events"
          className="my-4 max-w-[400px]"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-around">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : filteredEvents.length === 0 ? (
          <div>
            <h1 className="mt-10 text-3xl text-center">
              No events details found
            </h1>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="bg-card max-w-[420px]"
              id={`event-${event.id}`}
            >
              <CardHeader>
                <CardTitle>
                  <Link href={`/event/${event.id}`}>
                    {event?.title ?? "No title!"}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-4">
                  <Link href={`event/${event.id}`}>
                    {event?.description ?? "No description"}
                  </Link>
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex flex-wrap justify-between items-baseline">
                <div>
                  <p className="text-xs text-muted-foreground">{event.user}</p>
                  <Link
                    href={`mailto:${event?.email ?? "upasanafound@gmail.com"}`}
                    className="text-xs text-muted-foreground underline underline-offset-8"
                  >
                    {event?.email ?? "upasanafound@gmail.com"}
                  </Link>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleDateString()}
                  </p>
                  {globalData.adminEmails.includes(
                    user && user.emailAddresses[0].emailAddress
                  ) && (
                    <DeleteButton
                      email={
                        user?.emailAddresses[0]?.emailAddress ?? "Not provided"
                      }
                      message={"delete"}
                      id={event.id}
                      collection={"events"}
                    />
                  )}
                </div>
              </CardFooter>

              <CardContent>
                <Link href={`/event/${event.id}`}>
                  <img
                    src={event?.eventImg}
                    alt={event.title}
                    className="rounded-lg"
                  />
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default Events;
