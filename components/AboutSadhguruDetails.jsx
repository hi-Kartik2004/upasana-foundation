import Link from "next/link";
import React from "react";

function AboutSadhguruDetails({ heading, description, linkText, linkUrl }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Motto of the Foundation</h2>
      <p className="text-muted-foreground mb-4">
        SadhguruShri is a master communicator, converses in a very simple
        language, presents complex ideas in an easy to understand way. He is
        eager to share his abundant knowledge with all. In conveying his
        message, SadhguruShri goes beyond the limited reach of words and offers
        the grace of direct Experience. SadhguruShri is a True Master who,
        unlike a teacher, awakens you to the next level of spiritual experience.
        Making a clear departure from mere customs and rituals, SadhguruShri’s
        scientific methods for self-transformation are both experientially
        direct and powerful. SadhguruShri incorporates key aspects of ancient
        texts into modern contemporary life.
      </p>
      <Link href="/" className="underline underline-offset-8 mt-4">
        Take me somewhere!
      </Link>
    </div>
  );
}

export default AboutSadhguruDetails;
