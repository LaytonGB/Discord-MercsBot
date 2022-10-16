const DEFAULT = {
  summary: "D&D Mercs",
  description: "",
}

const urlParams = {
  PRODID: "Mercs Cal",
  UID: "mercs-1",
  LOCATION: "Teamspeak | madman2021.co.uk",
}

const hoursToMilliseconds = (hours) => {
  return hours * 60 * 60 * 1000;
}

const getStartEndFromUnix = (unix) => {
  const start = makeDateFromUNIX(unix);
  const end = new Date(start.getTime() + hoursToMilliseconds(3));
  return { start, end };
}

const makeDateFromUNIX = (unix) => {
  return new Date(unix * 1000);
}

const convertDate = (date) => {
  let event = new Date(date).toISOString()
    .split(/[-:]/).join("")
    .split(".")[0];
  return event;
}

const createIcsFile = (() => {
  let icsFile = null;
  return ({ start, end }, summary, description) => {
    let dataString =
      `BEGIN:VCALENDAR
      CALSCALE:GREGORIAN
      METHOD:PUBLISH
      PRODID:-//${urlParams.PRODID}//EN
      VERSION:2.0
      BEGIN:VEVENT
      UID:${urlParams.UID}
      LOCATION:${urlParams.LOCATION}
      DTSTART;TZID=UTC:${convertDate(start)}
      DTEND;TZID=UTC:${convertDate(end)}
      SUMMARY:${summary}
      DESCRIPTION:${description}
      END:VEVENT
      END:VCALENDAR`;

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

export const makeIcsFile = (unix, { summary = DEFAULT.summary, description = DEFAULT.description }) => {
  const eventDate = getStartEndFromUnix(unix);
  return createIcsFile(eventDate, summary, description);
};

export const makeGoogleCalendarLink = (unix, { summary = DEFAULT.summary, description = DEFAULT.description }) => {
  const { start, end } = getStartEndFromUnix(unix);
  const calURL = `http://www.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(summary)}&description=${encodeURIComponent(description)}&location=${encodeURIComponent(urlParams.LOCATION)}&dates=${convertDate(start)}/${convertDate(end)}`;
  return calURL;
}
