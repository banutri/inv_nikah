const SUPABASE_URL = "https://qqgupaxqokacqrkunmrr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZ3VwYXhxb2thY3Fya3VubXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MTQ3ODMsImV4cCI6MjA3NDk5MDc4M30.EmvL78Oh02q-f3KZ2szYpaZrAgVxidvpsR7vtv6NV5o";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  async function loadTransaksiAsset() {
      const { data, error } = await supabase
        .from("transaksi_aset")          // nama tabel
        .select("*");           // sama seperti SELECT * di SQL

      if (error) {
        console.error("Error:", error);
        return;
      }

      console.log(data);
      
    }