import { SignIn, SignedIn, SignedOut, currentUser } from "@clerk/nextjs";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import React from "react";
import Editor from "@/components/Editor";
import CodeSnippet from "@/components/CodeSnippet";
import AddImage from "@/components/AddImage";
import AddVideo from "@/components/AddVideo";
import { Separator } from "@/components/ui/separator";

async function EditArticle({ params }) {
  const user = await currentUser();

  const blogRef = doc(db, "course-content", params.articleId);
  const snapshot = await getDoc(blogRef);

  const data = snapshot.data();

  const blogData = data;
  console.log("Blog Data", blogData);

  if (!blogData) {
    return (
      <div className="flex justify-center items-center min-h-[80vh]">
        <h1 className="text-3xl font-bold">Incorrect Blog id</h1>
      </div>
    );
  }

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <>
      <SignedOut>{/* <UserNotFound /> */}</SignedOut>

      <SignedIn>
        <div className="mt-24">
          <div className="container">
            <Editor
              gradient="Edit"
              sectionTitle="your blog"
              buttonText="Confirm Edit"
              buttonType="edit"
              blogId={params.articleId}
              blogCode={blogData.blog}
              blogTitle={blogData.title}
              blogDescription={blogData.description}
              courseId={blogData.courseId}
            />
          </div>
        </div>
        <Separator className="my-10" />
        <div className="flex flex-wrap gap-6 mx-6 justify-around mb-10">
          <div className="flex flex-col gap-4 items-center mt-4">
            <AddImage />
            <AddVideo />
          </div>

          <div className="flex flex-wrap flex-col overflow-auto">
            <h3 className="mb-4 text-lg font-medium">Add Video*</h3>
            <CodeSnippet
              text={`<video width="100%" controls>
  <source src="">
  Your browser does not support the video tag.
  </source>
</video>`}
              language="javascript"
            />
          </div>

          <div className="flex flex-wrap flex-col overflow-auto">
            <h3 className="mb-4 text-lg font-medium">Add Youtube Video*</h3>
            <CodeSnippet
              text={`<iframe width="800px" src="" title="YouTube video" 
frameborder="0" allow="accelerometer; 
autoplay; clipboard-write; encrypted-media; 
gyroscope; picture-in-picture; web-share" 
allowfullscreen></iframe>`}
              language="javascript"
            />
          </div>
        </div>
      </SignedIn>
    </>
  );
}

export default EditArticle;
