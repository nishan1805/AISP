const INDIA_TIME_ZONE = "Asia/Kolkata";

const getYearInIndia = (date: Date = new Date()): number =>
  Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: INDIA_TIME_ZONE,
      year: "numeric",
    }).format(date)
  );

export const getAcademicYearLabel = (date: Date = new Date()): string => {
  const startYear = getYearInIndia(date);
  const endYearShort = String((startYear + 1) % 100).padStart(2, "0");

  return `${startYear}-${endYearShort}`;
};

export const getCurrentYear = (date: Date = new Date()): number =>
  getYearInIndia(date);
