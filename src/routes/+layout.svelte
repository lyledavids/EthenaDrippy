<script>
    import '../lib/styles/global.css';
    import Header from '../lib/components/Header.svelte';
    import Footer from '../lib/components/Footer.svelte';
  </script>
  
  <Header />
  
  <main class="container">
    <slot />
  </main>
  
  <!-- <Footer /> -->