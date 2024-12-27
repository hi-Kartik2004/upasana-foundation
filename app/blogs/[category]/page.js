"use client";
import globalData from "@/app/data";
import DeleteButton from "@/components/DeleteButton";
import Loader from "@/components/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/config";
import { useUser } from "@clerk/nextjs";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

async function fetchEvents(category) {
  const eventsCollectionRef = collection(db, "events");
  const eventsQuery = query(
    eventsCollectionRef,
    where("categories", "array-contains", category),
    orderBy("timestamp", "asc")
  );
  const snapshot = await getDocs(eventsQuery);
  if (snapshot.empty) {
    return [];
  }

  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
}

function CategoryBlogs({ params }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchEvents(params.category);
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();

    // Initialize selectedCategories with all available categories
    const allCategories =
      globalData?.blogCategories?.map((category) => category.name) ?? [];
    setSelectedCategories(allCategories);

    // Set selected categories from URL params
    const requestedCategories = searchParams.getAll("categories");
    if (requestedCategories.length > 0) {
      setSelectedCategories(requestedCategories);
    }
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(query)
    );
    setFilteredEvents(filtered);
  };

  const handleCategorySelection = (categoryName) => {
    const index = selectedCategories.indexOf(categoryName);
    let updatedCategories = [...selectedCategories];

    if (index === -1) {
      updatedCategories.push(categoryName);
    } else {
      updatedCategories.splice(index, 1);
    }

    setSelectedCategories(updatedCategories);

    // Construct new query string
    const urlParams = new URLSearchParams();
    updatedCategories.forEach((category) => {
      urlParams.append("categories", category);
    });

    router.push(`?${urlParams.toString()}`);
  };

  const { isLoaded, user } = useUser();

  if (!isLoaded) {
    return null;
  }

  return (
    <div className="container mt-28 mb-10">
      <div className="flex justify-center flex-col items-center">
        <h1 className="text-primary text-center text-4xl font-bold capitalize">
          {globalData?.blogsCategoryPageTitle}
        </h1>
        <p className="text-muted-foreground mt-4 text-sm">
          Category: {params?.category}
        </p>
        <Input
          placeholder="Search events"
          className="my-4 max-w-[400px]"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* <div className="flex items-center gap-4 flex-wrap justify-center">
        {globalData?.blogCategories &&
          globalData?.blogCategories.map((category, index) => (
            <Label key={index} className="flex gap-2 items-center">
              <Checkbox
                name="category"
                value={category.name}
                type="checkbox"
                checked={selectedCategories.includes(category.name)}
                // Handle checkbox change
                onClick={() => handleCategorySelection(category.name)}
              />
              <p>{category.name}</p>
            </Label>
          ))}
      </div> */}

      <div className="mt-8 flex flex-wrap items-center justify-around">
        {loading ? (
          <Loader />
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : filteredEvents.length === 0 ? (
          <div>
            <h1 className="mt-10 text-3xl text-center">
              No events details found
            </h1>
          </div>
        ) : (
          filteredEvents?.length &&
          filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="bg-card max-w-[420px]"
              id={`event-${event.id}`}
            >
              <CardHeader>
                <CardTitle>
                  <Link href={`/blog/${event.id}`}>
                    {event?.title ?? "No title!"}
                  </Link>
                </CardTitle>
                <CardDescription className="line-clamp-2 mt-4">
                  <Link href={`blog/${event.id}`}>
                    {event?.description ?? "No description"}
                  </Link>
                </CardDescription>
              </CardHeader>

              <CardFooter className="flex flex-wrap justify-between items-baseline">
                <div>
                  <p className="text-xs text-muted-foreground">{event?.user}</p>
                  <Link
                    href={`mailto:${event?.email ?? "upasanafound@gmail.com"}`}
                    className="text-xs text-muted-foreground underline underline-offset-8"
                  >
                    {event?.email ?? "upasanafound@gmail.com"}
                  </Link>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.timestamp).toLocaleDateString("en-in")}
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
                <Link href={`/blog/${event.id}`}>
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

export default CategoryBlogs;
