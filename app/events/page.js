import DeleteButton from "@/components/DeleteButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import Link from "next/link";
import React from "react";
import { db } from "@/firebase/config";
import globalData from "@/app/data";

async function Events() {
  const user = await currentUser();
  let data = [];
  try {
    const eventsCollectionRef = collection(db, "events");
    const eventsQuery = query(eventsCollectionRef, orderBy("timestamp", "asc"));
    const snapshot = await getDocs(eventsQuery);

    data = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    console.log(data);
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="container mt-24 mb-10">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-primary text-center text-4xl font-bold">
          {globalData?.eventsPageTitle ?? "Events"}
        </h1>
        <p className="text-center mt-2 text-muted-foreground">
          {globalData?.eventsPageDescription ?? "No description"}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-around">
        {data.length === 0 ? (
          <div>
            <h1 className="mt-10 text-3xl text-center">
              No events details found
            </h1>
          </div>
        ) : (
          data.map((event) => (
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
