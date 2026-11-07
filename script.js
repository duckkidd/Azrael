const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Preloader ---------- */
const loaderEl = document.getElementById("preloader");
const loaded = new Promise(resolve => {
  const t0 = performance.now();
  const minTime = reduce ? 0 : 1200;
  const finish = () => setTimeout(() => {
    loaderEl?.classList.add("done");
    document.documentElement.classList.remove("is-loading");
    setTimeout(resolve, 250);
    setTimeout(() => loaderEl?.remove(), 900);
  }, Math.max(0, minTime - (performance.now() - t0)));
  document.readyState === "complete" ? finish() : addEventListener("load", finish, { once: true });
});
/* ---------- ข้อมูลสินค้า (แก้ไข/เพิ่มสินค้าได้ที่นี่) ---------- */
const DISCORD = "https://discord.gg/F9pxtW4GM5";

const products = [
  /*{
    slug: "yuxiaxie", badge: "DX", name: "dx_yuxiaxie", price: 1800, oldPrice: 2000,
    desc: "สคริปต์เกม น้ำเต้าปูปลา สำหรับ FiveM วางจุดเล่นได้อิสระ กำหนดจำนวนผู้เล่นและเปอร์เซ็นต์เจ้ามือได้ รองรับการเล่นพร้อมกันหลายคน",
    features: [
      "วางจุดเล่นได้อิสระ กำหนดตำแหน่งโต๊ะได้ตามต้องการ",
      "กำหนดจำนวนผู้เล่นสูงสุดต่อโต๊ะ",
      "ระบบเจ้ามือ ปรับเปอร์เซ็นต์ส่วนแบ่งได้",
      "ผู้เล่นเข้าร่วมโต๊ะเดียวกันและเดิมพันพร้อมกันได้",
      "ใช้ลูกเต๋า 3 ลูก หน้า น้ำเต้า / ปู / ไก่ / ปลา / กุ้ง / เสือ",
      "ตั้งค่าผ่าน Config ให้เหมาะกับเศรษฐกิจของเซิร์ฟเวอร์"
    ],
    suit: ["เซิร์ฟเวอร์ FiveM แนว Roleplay", "คาสิโนหรือร้านเกมในเซิร์ฟเวอร์", "ระบบกิจกรรมหรือมินิเกม"]
  },
  {
    slug: "fishing", badge: "DZ", name: "dz_fishing", price: 1500,
    desc: "ระบบตกปลาสำหรับ FiveM ESX พร้อม HUD ดีไซน์สวย รองรับหลายโซนตกปลา และระบบรักษาความปลอดภัยฝั่ง Server",
    features: [
      "Auto Fishing",
      "รองรับหลายโซนตกปลา",
      "Server-side Reward & Anti-Exploit",
      "NUI Fishing HUD",
      "รองรับ ESX / ox_inventory / ox_target",
      "Config ปรับแต่งระบบได้อย่างอิสระ"
    ],
    suit: ["เซิร์ฟเวอร์ที่ต้องการเพิ่มกิจกรรมตกปลาให้ผู้เล่น"]
  },
  {
    slug: "dxslotmachine", badge: "DX", name: "dx_slot-machine", price: 1620, oldPrice: 1800,
    desc: "นั่งที่ตู้ ดึงคันโยก ดูวงล้อหยุด แล้วรับรางวัลตามหน้าที่ออก พร้อมระบบเดิมพันและแจ็คพอต",
    features: [
      "เดินไปที่ตู้ แล้วกด E เพื่อนั่ง หนึ่งตู้เล่นได้คนเดียว",
      "E หมุน / ลูกศรขึ้น เพิ่มเดิมพัน / R เดิมพันสูงสุด / G พิมพ์ยอดเอง / Backspace ลุก",
      "เรียงหน้าเดียวกันได้รางวัล เพชรนับตามจำนวนที่ออก",
      "แจ็คพอตต้องออกครบสามช่อง",
      "เงินไม่พอหรือยอดไม่ตรงขั้นจะหมุนรอบนั้นไม่ได้"
    ],
    suit: []
  }*/
];

const fmt = n => n.toLocaleString("en-US") + " THB";
const $ = s => document.querySelector(s);

function priceHTML(p) {
  const off = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  return `<div class="price"><span class="price-now">${fmt(p.price)}</span>` +
    (p.oldPrice ? `<span class="price-old">${fmt(p.oldPrice)}</span><span class="price-off">-${off}%</span>` : "") + `</div>`;
}

/* ---------- Header / Footer ---------- */
const page = document.body.dataset.page;
const links = [["shop.html", "Shop", "shop"], ["terms.html", "Terms", "terms"], ["faq.html", "FAQ", "faq"]];
const navLinks = links.map(([h, t, id]) => `<a href="${h}"${page === id ? ' class="active"' : ""}>${t}</a>`).join("");
const discordLink = `<a href="${DISCORD}" target="_blank" rel="noopener">Discord</a>`;

$("#site-header").outerHTML = `<header class="site-header" id="siteHeader"><div class="pill">
  <a class="logo-link" href="index.html" aria-label="azrael หน้าแรก"><img class="logo-img" src="logo.png" alt="azrael"></a>
  <nav id="nav" class="nav" aria-label="เมนูหลัก">${navLinks}</nav>
  <a class="pill-btn" href="${DISCORD}" target="_blank" rel="noopener">Discord</a>
  <button class="nav-toggle" aria-label="เปิดเมนู" aria-expanded="false" aria-controls="nav"><span></span><span></span><span></span></button>
</div></header>`;
$("#site-footer").outerHTML = `<footer class="site-footer">
  <a class="brand" href="index.html"><img class="logo-img" src="logo.png" alt="azrael"></a>
  <nav>${navLinks}${discordLink}</nav></footer>`;

document.querySelectorAll('a[href*="discord.gg"]').forEach(a => { a.href = DISCORD; });

$(".nav-toggle").addEventListener("click", e => {
  const open = $("#nav").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
});

/* สลับสไตล์ Navbar ดำ/ขาว เมื่อเลื่อนหน้า */
const header = $("#siteHeader");
const onScroll = () => header.classList.toggle("light", window.scrollY > 80);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- รายการสินค้า (หน้าแรก / Shop) ---------- */
const grid = $("#productGrid");
if (grid) {
  grid.innerHTML = products.map(p => `
    <a class="card" href="product.html?p=${p.slug}">
      <div class="card-head"><span class="badge">${p.badge}</span><span class="card-name">${p.name}</span></div>
      <p class="card-desc">${p.desc}</p>${priceHTML(p)}
    </a>`).join("");
}

if (grid && !products.length) {
  grid.innerHTML = `<p class="empty muted">สินค้ากำลังจะมาเร็วๆ นี้ — COMING SOON</p>`;
}

/* ---------- หน้ารายละเอียดสินค้า ---------- */
const detail = $("#productDetail");
if (detail) {
  const p = products.find(x => x.slug === new URLSearchParams(location.search).get("p"));
  const list = a => `<ul>${a.map(i => `<li>${i}</li>`).join("")}</ul>`;
  detail.innerHTML = p ? `<div class="detail">
      <a class="back" href="shop.html">← กลับไปร้านค้า</a>
      <div class="detail-head"><span class="badge">${p.badge}</span><h1>${p.name}</h1></div>
      <p class="muted">${p.desc}</p>${priceHTML(p)}
      <a class="btn btn-primary" href="${DISCORD}" target="_blank" rel="noopener">ซื้อผ่าน Discord</a>
      <h2>จุดเด่น</h2>${list(p.features)}
      ${p.suit.length ? `<h2>เหมาะสำหรับ</h2>${list(p.suit)}` : ""}
    </div>` : `<p>ไม่พบสินค้า <a class="underline" href="shop.html">กลับไปร้านค้า</a></p>`;
  if (p) document.title = `${p.name} — azrael`;
}

/* ---------- Hero slider (หน้าแรก) ---------- */
if ($("#heroSlide") && !products.length) {
  $("#heroBadge").textContent = "AZ";
  $("#heroName").textContent = "COMING SOON";
  $("#heroPrice").textContent = "สินค้ากำลังจะมาเร็วๆ นี้";
  $(".hero-controls").style.display = "none";
} else if ($("#heroSlide")) {
  const pad = n => String(n).padStart(2, "0");
  let i = 0;
  const show = n => {
    i = (n + products.length) % products.length;
    const p = products[i];
    $("#heroBadge").textContent = p.badge;
    $("#heroName").textContent = p.name;
    $("#heroPrice").textContent = fmt(p.price);
    $("#heroSlide").href = `product.html?p=${p.slug}`;
    $("#heroCount").textContent = `${pad(i + 1)}/${pad(products.length)}`;
    const s = $("#heroSlide"); s.classList.remove("swap"); void s.offsetWidth; s.classList.add("swap");
  };
  const step = d => e => { e.preventDefault(); e.stopPropagation(); show(i + d); };
  $("#heroPrev").addEventListener("click", step(-1));
  $("#heroNext").addEventListener("click", step(1));
  show(0);
  let timer; const play = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), 4500); };
  if (!reduce) { play(); $("#heroSlide").addEventListener("mouseenter", () => clearInterval(timer)); $("#heroSlide").addEventListener("mouseleave", play); }
}

/* ================= Animations & effects ================= */
/* ---------- Logo marquee ----------
   เพิ่มโลโก้: วางไฟล์ในโฟลเดอร์ logos/ แล้วเพิ่มบรรทัดใหม่ในรายการด้านล่าง
   - src   : ที่อยู่ไฟล์รูป (png / svg / webp)
   - alt   : ชื่อโลโก้
   - href  : (ไม่บังคับ) ลิงก์เมื่อคลิก
   - mono  : (ไม่บังคับ) ค่าเริ่มต้นแปลงเป็นสีขาวทั้งหมด ใส่ false เพื่อคงสีเดิม */
const marqueeLogos = [
  { src: "logo.png", alt: "azrael" },
  /*{ src: "logos/partner-1.png", alt: "azrael", mono: false },
  { src: "logos/partner-2.png", alt: "azrael", mono: false },
  { src: "logos/partner-3.png", alt: "azrael", mono: false },
  { src: "logos/partner-4.png", alt: "azrael", mono: false },
  { src: "logos/partner-5.png", alt: "azrael", mono: false },
  { src: "logos/partner-6.png", alt: "azrael", mono: false },
  { src: "logos/partner-7.png", alt: "azrael", mono: false },
  { src: "logos/partner-8.png", alt: "azrael", mono: false },
  { src: "logos/partner-9.png", alt: "azrael", mono: false },
  { src: "logos/partner-10.png", alt: "azrael", mono: false },
  { src: "logos/partner-11.png", alt: "azrael", mono: false },
  { src: "logos/partner-12.png", alt: "azrael", mono: false },
  { src: "logos/partner-13.png", alt: "azrael", mono: false },
  { src: "logos/partner-14.png", alt: "azrael", mono: false },
  { src: "logos/partner-15.png", alt: "azrael", mono: false },
  { src: "logos/partner-16.png", alt: "azrael", mono: false },
  { src: "logos/partner-17.png", alt: "azrael", mono: false },*/
  // { src: "logos/partner-1.png", alt: "Partner 1", href: "https://example.com" },
  // { src: "logos/partner-2.svg", alt: "Partner 2", mono: false },
];

const marqueeTrack = document.getElementById("marqueeTrack");
if (marqueeTrack && marqueeLogos.length) {
  const SPEED = 60; // px ต่อวินาที
  const item = l => {
    const img = `<img src="${l.src}" alt="${l.alt || ""}" class="${l.mono === false ? "" : "mono"}">`;
    const inner = l.href ? `<a href="${l.href}" target="_blank" rel="noopener" aria-label="${l.alt || ""}">${img}</a>` : img;
    return `<span class="logo-item">${inner}</span><span class="dot" aria-hidden="true">✦</span>`;
  };
  const set = marqueeLogos.map(item).join("");

  const buildMarquee = async () => {
    marqueeTrack.innerHTML = set;
    await Promise.all([...marqueeTrack.querySelectorAll("img")].map(i => i.decode().catch(() => {})));
    const w = marqueeTrack.getBoundingClientRect().width;
    const copies = Math.max(1, Math.ceil(marqueeTrack.parentElement.clientWidth / w));
    const copy = `<span class="copy" aria-hidden="true">${set.replace(/<a /g, '<a tabindex="-1" ')}</span>`;
    marqueeTrack.innerHTML = set + copy.repeat(copies * 2 - 1);
    marqueeTrack.style.animationDuration = (w * copies / SPEED) + "s";
  };
  buildMarquee();
  let rt; addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(buildMarquee, 250); });
}

if (!reduce) {
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* นับตัวเลขราคา */
  const countUp = el => {
    const to = parseInt(el.textContent.replace(/\D/g, ""), 10);
    const t0 = performance.now() + (parseFloat(el.closest(".card")?.style.getPropertyValue("--d")) || 0) * 1000;
    const tick = t => {
      const k = Math.min(Math.max((t - t0) / 900, 0), 1);
      el.textContent = fmt(Math.round(to * (1 - Math.pow(1 - k, 3))));
      if (k < 1) requestAnimationFrame(tick);
    };
    el.textContent = fmt(0);
    requestAnimationFrame(tick);
  };

  /* Scroll reveal */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    io.unobserve(e.target);
    if (e.target.classList.contains("card")) countUp(e.target.querySelector(".price-now"));
  }), { threshold: .15, rootMargin: "0px 0px -6% 0px" });

  const mark = (sel, { base = 0, gap = .08, cls = "reveal" } = {}) => document.querySelectorAll(sel).forEach(el => {
    const i = [...el.parentElement.children].indexOf(el);
    el.style.setProperty("--d", (base + Math.min(i, 8) * gap) + "s");
    el.classList.add(cls);
    loaded.then(() => io.observe(el));
  });

  /* หัวข้อเลื่อนขึ้นทีละบรรทัด */
  document.querySelectorAll(".hero h1, .section-title").forEach(h => {
    h.innerHTML = h.innerHTML.split(/<br\s*\/?>/i).map((t, i) => `<span class="line"><span style="--i:${i}">${t}</span></span>`).join("");
  });
  mark(".hero h1", { base: .15, cls: "split" });
  mark(".section-title", { cls: "split" });
  mark(".hero-text > :not(h1)", { base: .2, gap: .12 });
  mark(".hero-visual", { base: .45 });
  mark(".card, .member, .intro, .center > *, .prose > :not(h1), .faq details, .detail > *, .detail li, .site-footer");

  /* Progress bar */
  const bar = document.body.appendChild(Object.assign(document.createElement("div"), { className: "progress" }));
  const onProgress = () => { bar.style.transform = `scaleX(${scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)})`; };
  addEventListener("scroll", onProgress, { passive: true });

  if (fine) {
    /* Grid สปอตไลต์ใน Hero */
    const hero = $(".hero");
    hero?.addEventListener("mousemove", e => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", e.clientX - r.left + "px");
      hero.style.setProperty("--my", e.clientY - r.top + "px");
    });

    /* Tilt + spotlight */
    const tilt = (el, max) => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        el.style.setProperty("--x", x + "px"); el.style.setProperty("--y", y + "px");
        el.style.transform = `perspective(900px) rotateX(${(.5 - y / r.height) * max}deg) rotateY(${(x / r.width - .5) * max}deg)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    };
    document.querySelectorAll(".card, .member").forEach(el => tilt(el, 8));
    document.querySelectorAll(".hero-visual").forEach(el => tilt(el, 6));

    /* ปุ่มดูดเมาส์ */
    document.querySelectorAll(".btn, .pill-btn").forEach(el => {
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        el.style.translate = `${(e.clientX - r.left - r.width / 2) * .2}px ${(e.clientY - r.top - r.height / 2) * .3}px`;
      });
      el.addEventListener("mouseleave", () => { el.style.translate = ""; });
    });
  }

  /* FAQ เปิด-ปิดแบบสมูท */
  document.querySelectorAll(".faq details").forEach(d => {
    const s = d.querySelector("summary");
    s.addEventListener("click", e => {
      e.preventDefault();
      if (d.dataset.busy) return;
      d.dataset.busy = 1;
      const opts = { duration: 380, easing: "cubic-bezier(.2,.8,.2,1)" };
      const pad = parseFloat(getComputedStyle(d).paddingTop) * 2 + s.offsetHeight;
      const h0 = d.offsetHeight;
      if (d.open) {
        d.animate({ height: [h0 + "px", pad + "px"] }, opts).onfinish = () => { d.open = false; delete d.dataset.busy; };
      } else {
        d.open = true;
        d.animate({ height: [pad + "px", d.offsetHeight + "px"] }, opts).onfinish = () => delete d.dataset.busy;
      }
    });
  });
}