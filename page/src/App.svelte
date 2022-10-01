<script>
  import { onMount } from "svelte";
  import { makeIcsFile } from "../scripts/utils";

  let downloadButton;
  let fileURL;

  onMount(() => {
    const unix = new URLSearchParams(window.location.search).get("timestamp");
    if (unix) {
      fileURL = makeIcsFile(unix);
      if (fileURL) {
        downloadButton.style.display = "block";
        downloadButton.setAttribute("download", "mercs_session_cal_entry.ics");
        downloadButton.onclick = () => window.open(fileURL, "_blank");
      }
    }
  });
</script>

<main class="container">
  <div class="content has-text-centered">
    <h1 class="title">MercsBot</h1>
    <p class="content is-large">Your calendar download will start shortly</p>
    <div class="button-group">
      <a class="button is-link" bind:this={downloadButton} href={fileURL}
        >Download</a
      >
    </div>
  </div>
</main>
