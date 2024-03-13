import React from "react";

const TimeDisplay = ({ time }: { time: string }) => {
  // Convert the time string to a Date object
  const dateObject = new Date(time);

  // Check if seconds are present
  const hasSeconds = dateObject.getSeconds() !== 0;

  // Format the time without seconds if present
  const formattedTime = hasSeconds
    ? dateObject.toLocaleString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    : time;

  return <p>{formattedTime}</p>;
};

export default TimeDisplay;
