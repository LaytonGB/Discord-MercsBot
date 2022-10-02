<script>
  import { onMount } from "svelte";
  import { makeGoogleCalendarLink, makeIcsFile } from "./utils";

  let fileURL;
  let googleURL;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const unix = urlParams.get("timestamp");
    const summary = urlParams.get("summary") || undefined;
    const description = urlParams.get("description") || undefined;
    if (unix) {
      fileURL = makeIcsFile(unix, { summary, description });
      googleURL = makeGoogleCalendarLink(unix, { summary, description });
    }
  });
</script>

<main class="container">
  <div class="content has-text-centered">
    <h1 class="title">MercsBot</h1>
    <p class="content is-large">Select an option below</p>
    <div class="buttons is-centered">
      <a class="button is-success" href={googleURL}>Add to Google Calendar</a>
      <a
        class="button is-link"
        href={fileURL}
        download="mercs_session_cal_entry.ics"
        on:click={() => window.open(fileURL, "_blank")}>Download ICal File</a
      >
    </div>
  </div>
</main>
