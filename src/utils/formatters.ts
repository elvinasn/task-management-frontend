export const convertISOToCustomFormat = (
  isoString: string | null | undefined
): string => {
  console.log("isoString", isoString);
  if (!isoString) {
    return "";
  }

  let date = new Date(isoString);

  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, "0");
  let day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const convertISOToDate = (isoString: string | null): Date => {
  if (!isoString) {
    return new Date();
  }

  return new Date(isoString);
};
