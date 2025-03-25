<script>
function openSite() {
    let url = document.getElementById("url").value;
    let proxyUrl = "https://www.croxyproxy.com/?url=" + encodeURIComponent(url);
    document.getElementById("browser").src = proxyUrl;
}
</script>

<input type="text" id="url" placeholder="Enter website URL">
<button onclick="openSite()">Go</button>
<iframe id="browser" width="100%" height="500px"></iframe>
