import Link from "next/link";
import React from "react";

function AboutSadhguruDetails({ title, description, linkText, link }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link href={link} className="underline underline-offset-8 mt-4">
        {linkText}
      </Link>
    </div>
  );
}

export default AboutSadhguruDetails;
