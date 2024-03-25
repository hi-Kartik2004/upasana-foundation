import data from "@/app/data";
export const SriPaadukaFaqSection = ({
  badge,
  title,
  description,
  questions,
}) => {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
        <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div>
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-teal-accent-400">
              {badge ?? data?.sriPaadukaKnowMoreSectionBadge}
            </p>
          </div>
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-primary sm:text-4xl md:mx-auto">
            {title ?? data?.sriPaadukaKnowMoreSectionTitle}
          </h2>
          <p className="text-base text-muted-foreground md:text-lg">
            {description ?? data?.sriPaadukaKnowMoreSectionDescription}
          </p>
        </div>
      </div>
      <div className="max-w-screen-xl sm:mx-auto">
        <div className="grid grid-cols-1 gap-16 row-gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            {questions
              ? questions.slice(0, questions.length / 2).map((ele, idx) => {
                  return (
                    <div>
                      <p className="mb-4 text-xl font-medium">{ele?.title}</p>
                      <p className="text-muted-foreground break-words">
                        {ele?.description}
                      </p>
                    </div>
                  );
                })
              : data?.sriPaadukaKnowMoreSectionQuestions
                  .slice(0, data?.sriPaadukaKnowMoreSectionQuestions.length / 2)
                  .map((ele, idx) => {
                    return (
                      <div>
                        <p className="mb-4 text-xl font-medium">{ele?.title}</p>
                        <p className="text-muted-foreground break-words">
                          {ele?.description}
                        </p>
                      </div>
                    );
                  })}
          </div>

          <div className="space-y-8">
            {questions
              ? questions.slice(questions.length / 2).map((ele, idx) => {
                  return (
                    <div key={idx}>
                      <p className="mb-4 text-xl font-medium">{ele?.title}</p>
                      <p className="text-muted-foreground break-words">
                        {ele?.description}
                      </p>
                    </div>
                  );
                })
              : data?.sriPaadukaKnowMoreSectionQuestions
                  .slice(data?.sriPaadukaKnowMoreSectionQuestions.length / 2)
                  .map((ele, idx) => {
                    return (
                      <div key={idx}>
                        <p className="mb-4 text-xl font-medium">{ele?.title}</p>
                        <p className="text-muted-foreground break-words">
                          {ele?.description}
                        </p>
                      </div>
                    );
                  })}
          </div>
        </div>
      </div>
    </div>
  );
};
