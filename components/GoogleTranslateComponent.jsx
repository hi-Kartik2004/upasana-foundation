"use client";
import React, { useEffect, useState } from "react";

function GoogleTranslateComponent({ className }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const scriptId = "google-translate-script";

    const addGoogleTranslateScript = () => {
      if (!document.getElementById(scriptId) && !loading) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;
        script.onload = () => {
          window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
              },
              "google_translate_element"
            );
          };
        };

        document.body.appendChild(script);
      }
    };

    addGoogleTranslateScript();

    return () => {
      // Cleanup: Remove the script from the DOM to prevent memory leaks
      const existingScript = document.getElementById(scriptId);
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [loading]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return <div id="google_translate_element" className={className}></div>;
}

export default GoogleTranslateComponent;
