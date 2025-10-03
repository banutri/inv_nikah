const SUPABASE_URL = "https://qqgupaxqokacqrkunmrr.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxZ3VwYXhxb2thY3Fya3VubXJyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MTQ3ODMsImV4cCI6MjA3NDk5MDc4M30.EmvL78Oh02q-f3KZ2szYpaZrAgVxidvpsR7vtv6NV5o";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadTransaksiAsset() {
  const { data, error } = await supabase
    .from("transaksi_aset")
    .select("*");

  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log(data);
}

// simpan daftar script yang diinject
let injectedScripts = [];
let currentDestroyFn = null;

function unloadContent() {
  try {
    if (typeof currentDestroyFn === "function") {
      currentDestroyFn(); // panggil fungsi destroy dari halaman
    }
  } catch (e) {
    console.error("Destroy error:", e);
  }
  currentDestroyFn = null;

  // hapus script yang pernah dimasukkan
  injectedScripts.forEach(s => {
    if (s.parentNode) s.parentNode.removeChild(s);
  });
  injectedScripts = [];

  // kosongkan DOM
  $("#content").empty();
}

function loadPage(file) {
  unloadContent();

  $.get(file, function (data) {
    let content = $("#content");
    content.html(data);

    // parse data html untuk ambil script
    let tmp = $("<div>").html(data);
    tmp.find("script").each(function () {
      let s = document.createElement("script");
      if (this.src) {
        s.src = this.src;
        s.async = false;
      } else {
        s.text = this.text;
      }
      document.body.appendChild(s);
      injectedScripts.push(s);
    });

    // kalau halaman mendefinisikan window.pageDestroy
    if (typeof window.pageDestroy === "function") {
      currentDestroyFn = window.pageDestroy;
    }
  });
}

// on click nav link
$(".nav-link").on("click", function () {
  let link = $(this);
  let page = link.data("page");
  let file = "";

  if (page === "report") {
    file = "pages/report/reportPage.html";
  } else if (page === "transValue") {
    file = "pages/transValPage/transValPage.html";
  }

  if (file !== "") {
    loadPage(file);
  }

  $(".nav-link").removeClass("active");
  link.addClass("active");
});
