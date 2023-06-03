<script lang="ts">
  import Grid from "../lib/components/grid.svelte";
</script>

<main>
  <div id="map">
    <Grid />
  </div>
  <aside>
    Sidebar
  </aside>
</main>

<style lang="scss">
  main {
    display: flex;
    height: 100vh;    
  }

  #map {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  aside {
    width: 20%;
    background: gainsboro;
  }
</style>
