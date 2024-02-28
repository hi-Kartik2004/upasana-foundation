import React from "react";
import { Input } from "./ui/input";

function CourseContentForm() {
  return (
    <div>
      <form>
        <label>Title of this post</label>
        <Input type="text" placeholder="Title" />
      </form>
    </div>
  );
}

export default CourseContentForm;
