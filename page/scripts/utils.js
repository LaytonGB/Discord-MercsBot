const convertDate = (date) => {
  let event = new Date(date).toISOString()
    .split(/[-:]/).join("")
    .split(".")[0];
  return event;
}

const createIcsFile = (() => {
  let icsFile = null;
  return (date, summary, description) => {
    let dataString =
      "BEGIN:VCALENDAR\n" +
      "CALSCALE:GREGORIAN\n" +
      "METHOD:PUBLISH\n" +
      "PRODID:-//Mercs Cal//EN\n" +
      "VERSION:2.0\n" +
      "BEGIN:VEVENT\n" +
      "UID:mercs-1\n" +
      "LOCATION:Teamspeak, madman2021.co.uk\n" +
      "DTSTART;TZID=UTC:" +
      convertDate(date.start) +
      "\n" +
      "DTEND;TZID=UTC:" +
      convertDate(date.end) +
      "\n" +
      "SUMMARY:" +
      summary +
      "\n" +
      "DESCRIPTION:" +
      description +
      "\n" +
      "END:VEVENT\n" +
      "END:VCALENDAR";

    let data = new File([dataString], { type: "text/calendar" });

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (icsFile !== null) {
      window.URL.revokeObjectURL(icsFile);
    }
    icsFile = window.URL.createObjectURL(data);
    return icsFile;
  }
})();

export const makeIcsFile = (unix, summary = "Mercs of Norn", description = "") => {
  const date = new Date(unix * 1000);
  const eventDate = {
    start: date,
    end: new Date(date.getTime() + 1 * 60 * 60 * 1000),
  };
  return createIcsFile(eventDate, summary, description);
};