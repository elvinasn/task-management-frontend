export const convertISOToCustomFormat = (
  isoString: string | null | undefined
): string => {
  console.log("isoString", isoString);
  if (!isoString) {
    return "";
  }

  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const convertISOToDate = (isoString: string | null): Date => {
  if (!isoString) {
    return new Date();
  }

  return new Date(isoString);
};
