"use client";
import React, { Suspense } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Blog from "@/components/Blog";
import { Skeleton } from "@/components/ui/skeleton";
// import { routeros } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useRouter } from "next/navigation";

function Event({ params }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const [data, setData] = useState([]);

  async function getPortfolioDetailsFromFirestore() {
    try {
      const portFolioCollection = collection(db, "events");

      const q = query(portFolioCollection);
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      const portFolioDoc = querySnapshot.docs[0];
      const portFolioData = portFolioDoc.data();

      const portFolioCode = portFolioData.portfolioCode;
      console.log("Portfolio Code:", portFolioCode);
      toast({
        title: "Data Fetched",
        description: "Our APIs are working fine!",
      });
      setData(portFolioCode);
    } catch (error) {
      console.error("Error getting blog:", error);
      toast({
        title: "Something went wrong",
        description: "Head over to our github to know more",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPortfolioDetailsFromFirestore();
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const blogDocRef = doc(db, "events", params.id);
        const blogSnapshot = await getDoc(blogDocRef);

        if (blogSnapshot.exists()) {
          const blogData = blogSnapshot.data();
          setBlogData(blogData);

          // Increment the views field by 1
          const updatedViews = increment(1);
          await updateDoc(blogDocRef, { views: updatedViews });
        } else {
          console.log("No such document!");
          router.push("/events");
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlogData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mt-10 flex flex-col items-center justify-center">
        <Skeleton className="w-[800px] h-[100px] mt-8 mb-4" />
        <Skeleton className="w-[800px] h-[60vh] mb-4" />
      </div>
    );
  }

  return (
    <>
      {/* <Navbar data={data} /> */}
      {loading ? (
        <div className="container">
          <Skeleton className="w-full h-[90vh] " />
        </div>
      ) : (
        <Suspense fallback={<p>Loading...</p>}>
          <div className="max-w-[900px] px-4 py-4 mx-auto mt-8 pt-16">
            <div className="flex justify-between gap-2 flex-wrap items-center">
              <p className="text-xs text-muted-foreground">
                Note: Reporting the blog without any valid reason might lead to
                a ban from the platform.
              </p>
              <Button variant="secondary">
                <Link
                  href={`https://github.com/hi-Kartik2004/CraftFolio/issues/new?assignees=&labels=&projects=&template=report-blog.md&title=Blog id: ${params.id}`}
                  target="_blank"
                >
                  Report
                </Link>
              </Button>
            </div>
            {blogData && (
              <div className="mt-4">
                {/* <div className="object-cover w-full lg:h-[130px] h-[100px] overflow-hidden">
                  <img
                    src={`https://source.unsplash.com/random/900x700/?garden`}
                    className="w-full h-full object-cover rounded-lg bg-muted"
                    alt="inside blog image"
                  />
                </div> */}

                <div className="mt-6">
                  <h1 className="text-4xl font-bold">{blogData.title}</h1>
                  <p className="text-muted-foreground mt-4">
                    {blogData.description} - written by {blogData.user}
                  </p>
                </div>

                {
                  <div className="flex justify-center mt-4">
                    <audio
                      controls
                      src={blogData?.recordingUrl?.recordingUrl || ""}
                    ></audio>
                  </div>
                }

                <div className="mt-6">
                  <Blog code={blogData.blog} />
                </div>
              </div>
            )}
          </div>
        </Suspense>
      )}
    </>
  );
}

export default Event;
