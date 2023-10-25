const getDateFromString = (date: string) => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default getDateFromString;
