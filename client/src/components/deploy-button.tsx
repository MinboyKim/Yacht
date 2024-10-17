"use client";

import { Rocket } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const DeployButton = () => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    fetch("https://34.136.41.53:32759/events/create-repo", {
      method: "POST",
      body: JSON.stringify({
        repoUrl: "https://github.com/KU-Yacht/spring-example",
      }),
    });
  };
  return (
    <Button
      className="flex w-full items-center gap-4 md:w-auto"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Rocket />
          Deploy
        </>
      )}
    </Button>
  );
};

export default DeployButton;
