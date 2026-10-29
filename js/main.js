/* SamgyupTa — shared page behavior. Content lives in data/menu.js. */
(function () {
  "use strict";

  var S = window.SAMGYUPTA;
  var info = S.info;
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function peso(value) {
    if (typeof value === "string") return value;
    return value ? "₱" + value.toLocaleString("en-PH") : "₱ —";
  }
  function toMinutes(hhmm) {
    var p = hhmm.split(":");
    return Number(p[0]) * 60 + Number(p[1]);
  }
  function formatTime(hhmm) {
    var m = toMinutes(hhmm);
    var h = Math.floor(m / 60), min = m % 60;
    var suffix = h >= 12 ? "PM" : "AM";
    var h12 = h % 12 || 12;
    return h12 + (min ? ":" + String(min).padStart(2, "0") : "") + " " + suffix;
  }
  // Current time in the Philippines, regardless of the visitor's timezone
  function manilaNow() {
    var parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Manila", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false
    }).formatToParts(new Date());
    var get = function (t) { return parts.filter(function (p) { return p.type === t; })[0].value; };
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return { day: days.indexOf(get("weekday")), minutes: (Number(get("hour")) % 24) * 60 + Number(get("minute")) };
  }
  function hoursLabel() { return formatTime(info.hours.open) + " – " + formatTime(info.hours.close); }

  /* ---------- Shared header, footer and mobile bar ---------- */
  var page = document.body.getAttribute("data-page");
  var links = [
    ["index.html", "Home", "home"],
    ["menu.html", "Menu", "menu"],
    ["promos.html", "Promos & Gallery", "promos"],
    ["contact.html", "Find Us", "contact"]
  ];

  function todayManilaISO() {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date());
  }
  var brandHTML = '<a class="brand" href="index.html"><img class="brand-logo" src="images/logo-wordmark.png" alt="SamgyupTa" width="138" height="44"></a>';

  // Announcement bar (e.g. holiday closure); hides itself after the "until" date
  if (S.notice && S.notice.text && todayManilaISO() <= S.notice.until) {
    var bar0 = document.createElement("div");
    bar0.className = "notice-bar";
    bar0.setAttribute("role", "status");
    bar0.textContent = "📢 " + S.notice.text;
    document.body.insertBefore(bar0, document.body.firstChild);
  }

  var header = $("#site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML =
      '<nav class="container nav" aria-label="Main">' +
        brandHTML +
        '<button class="nav-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="nav-links">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>' +
        '</button>' +
        '<ul class="nav-links" id="nav-links">' +
          links.map(function (l) {
            return '<li><a href="' + l[0] + '"' + (page === l[2] ? ' aria-current="page"' : "") + ">" + l[1] + "</a></li>";
          }).join("") +
          '<li><a class="btn btn--fire btn--small" href="reserve.html"' + (page === "reserve" ? ' aria-current="page"' : "") + ">Reserve a Table</a></li>" +
        "</ul>" +
      "</nav>";

    var toggle = $(".nav-toggle", header);
    var navLinks = $(".nav-links", header);
    toggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  var footer = $("#site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML =
      '<div class="container">' +
        '<div class="footer-grid">' +
          "<div>" +
            brandHTML +
            '<p class="muted" style="margin-top:14px">Unli Korean BBQ in Silay City since ' + info.since + ". Legit unlimited, no time limit. " + esc(info.motto) + ".</p>" +
          "</div>" +
          "<div><h4>Visit</h4><ul><li>" + esc(info.address) + "</li><li>" + esc(info.landmark) + "</li></ul></div>" +
          "<div><h4>Hours</h4><ul><li>Open daily</li><li>" + hoursLabel() + "</li><li>Walk-ins welcome</li></ul></div>" +
          "<div><h4>Contact</h4><ul>" +
            '<li><a href="tel:' + info.phone + '">' + esc(info.phoneDisplay) + "</a></li>" +
            "<li>Landline " + esc(info.landline) + "</li>" +
            '<li><a href="' + info.facebook + '" target="_blank" rel="noopener">Facebook</a></li>' +
            '<li><a href="' + info.messenger + '" target="_blank" rel="noopener">Messenger</a></li>' +
            '<li><a href="reserve.html">Reserve a table</a></li>' +
          "</ul></div>" +
        "</div>" +
        '<div class="footer-bottom">© ' + new Date().getFullYear() + " SamgyupTa Silay. All rights reserved.</div>" +
      "</div>";
  }

  var bar = document.createElement("nav");
  bar.className = "action-bar";
  bar.setAttribute("aria-label", "Quick actions");
  bar.innerHTML =
    '<a href="tel:' + info.phone + '"><span>📞</span>Call</a>' +
    '<a class="is-primary" href="reserve.html"><span>🔥</span>Reserve</a>' +
    '<a href="' + info.mapsLink + '" target="_blank" rel="noopener"><span>📍</span>Directions</a>';
  document.body.appendChild(bar);

  /* ---------- Open / closed status ---------- */
  function updateStatus() {
    var now = manilaNow();
    var open = info.closedDates.indexOf(todayManilaISO()) === -1 &&
      info.hours.days.indexOf(now.day) !== -1 &&
      now.minutes >= toMinutes(info.hours.open) && now.minutes < toMinutes(info.hours.close);
    $$("[data-status]").forEach(function (el) {
      el.classList.add("status");
      el.classList.toggle("is-open", open);
      el.classList.toggle("is-closed", !open);
      el.textContent = open
        ? "Open now · until " + formatTime(info.hours.close)
        : "Closed · opens " + formatTime(info.hours.open);
    });
  }
  updateStatus();
  setInterval(updateStatus, 60000);

  // Fill simple text placeholders like <span data-info="phoneDisplay">
  $$("[data-info]").forEach(function (el) { el.textContent = info[el.getAttribute("data-info")]; });
  $$("[data-hours]").forEach(function (el) { el.textContent = hoursLabel(); });
  $$("[data-href]").forEach(function (el) {
    var key = el.getAttribute("data-href");
    el.href = key === "phone" ? "tel:" + info.phone : info[key];
  });

  /* ---------- Images: show a styled placeholder when a photo is missing ---------- */
  function photo(src, alt, emoji) {
    return '<div class="ph" data-label="' + esc(emoji || "📷") + '"><img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy"></div>';
  }
  function watchImages(root) {
    $$(".ph img", root).forEach(function (img) {
      var mark = function () { img.parentNode.classList.add("is-missing"); };
      if (img.complete && img.naturalWidth === 0) mark();
      else img.addEventListener("error", mark);
    });
  }

  /* ---------- Unli set cards ---------- */
  var setsEl = $("#sets");
  if (setsEl) {
    setsEl.innerHTML = S.sets.map(function (s) {
      return '<article class="card set-card reveal' + (s.featured ? " is-featured" : "") + '">' +
        (s.tag ? '<span class="set-tag">' + esc(s.tag) + "</span>" : "") +
        photo(s.image, s.name, s.emoji) +
        '<div class="card-body">' +
          '<span class="kr muted">' + esc(s.kr) + "</span>" +
          "<h3>" + esc(s.name) + "</h3>" +
          '<div class="price">' + (s.from ? "<small style=\"margin:0 6px 0 0\">from</small>" : "") + peso(s.price) + "<small>" + esc(s.per) + "</small></div>" +
          (s.sub ? '<p class="set-sub">' + esc(s.sub) + "</p>" : "") +
          '<ul class="check-list">' + s.includes.map(function (i) { return "<li>" + esc(i) + "</li>"; }).join("") + "</ul>" +
          '<a class="btn ' + (s.featured ? "btn--fire" : "btn--ghost") + '" href="reserve.html?set=' + s.id + '">Reserve this set</a>' +
        "</div></article>";
    }).join("");
    watchImages(setsEl);
  }

  /* ---------- Promo ---------- */
  $$("[data-promo]").forEach(function (el) {
    var p = S.promo;
    if (!p.active) { el.hidden = true; return; }
    var withTerms = el.getAttribute("data-promo") === "full";
    el.innerHTML =
      '<div class="promo-banner reveal">' +
        "<div>" +
          '<span class="eyebrow" style="color:#ffe1cc">Promo alert</span>' +
          "<h2>" + esc(p.title) + "</h2>" +
          "<p>" + esc(p.text) + "</p>" +
          '<p style="font-weight:700">' + esc(p.period) + "</p>" +
          (withTerms
            ? '<details style="margin:14px 0 22px"><summary style="cursor:pointer;font-weight:700">Terms & conditions</summary><ul>' +
                p.terms.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul></details>"
            : "") +
          '<div class="btn-row"><a class="btn btn--ghost" href="reserve.html">Reserve for the barkada</a>' +
          (withTerms ? "" : '<a class="btn btn--ghost" href="promos.html">See details</a>') + "</div>" +
        "</div>" +
        '<div class="promo-big">' + esc(p.big) + "<small>" + esc(p.bigCaption) + "</small></div>" +
      "</div>";
  });

  /* ---------- Menu page ---------- */
  function menuRow(item) {
    return '<div class="menu-item"><div>' +
      '<div class="menu-item-name">' + esc(item.name) + (item.kr ? '<span class="kr">' + esc(item.kr) + "</span>" : "") + "</div>" +
      (item.desc ? '<p class="menu-item-desc">' + esc(item.desc) + "</p>" : "") +
      '</div><div class="menu-item-price">' + peso(item.price) + "</div></div>";
  }
  var alaEl = $("#ala-carte");
  if (alaEl) {
    alaEl.innerHTML = S.menu.map(function (cat) {
      return '<div class="reveal" style="margin-bottom:44px"><h3 class="accent">' + esc(cat.category) + "</h3>" +
        (cat.note ? '<p class="muted" style="margin-top:-4px">' + esc(cat.note) + "</p>" : "") +
        '<div class="menu-list">' + cat.items.map(menuRow).join("") + "</div></div>";
    }).join("");
  }
  var drinksEl = $("#drinks");
  if (drinksEl) drinksEl.innerHTML = S.drinks.map(menuRow).join("");
  var rulesEl = $("#house-rules");
  if (rulesEl) {
    rulesEl.innerHTML = S.houseRules.map(function (r) {
      return '<div class="card feature reveal" style="text-align:left"><h3>' + esc(r.title) + "</h3><p>" + esc(r.text) + "</p></div>";
    }).join("");
  }

  /* ---------- Reviews ---------- */
  var reviewsEl = $("#reviews");
  if (reviewsEl) {
    reviewsEl.innerHTML = S.reviews.map(function (r) {
      return '<figure class="card review reveal" style="margin:0"><div class="review-stars" aria-label="5 stars">★★★★★</div>' +
        "<blockquote>“" + esc(r.text) + "”</blockquote><cite>— " + esc(r.who) + "</cite></figure>";
    }).join("");
  }

  /* ---------- Gallery + lightbox ---------- */
  var galleryEl = $("#gallery");
  if (galleryEl) {
    galleryEl.innerHTML = S.gallery.map(function (g, i) {
      return '<button type="button" data-index="' + i + '" aria-label="View photo: ' + esc(g.alt) + '">' + photo(g.src, g.alt, g.emoji) + "</button>";
    }).join("");
    watchImages(galleryEl);

    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.innerHTML = '<button class="lightbox-close" aria-label="Close">×</button><img alt=""><p class="lightbox-caption"></p>';
    document.body.appendChild(box);
    var close = function () { box.classList.remove("is-open"); };
    galleryEl.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-index]");
      if (!btn || btn.querySelector(".is-missing")) return;
      var g = S.gallery[Number(btn.getAttribute("data-index"))];
      $("img", box).src = g.src;
      $("img", box).alt = g.alt;
      $(".lightbox-caption", box).textContent = g.alt;
      box.classList.add("is-open");
      $(".lightbox-close", box).focus();
    });
    box.addEventListener("click", function (e) { if (e.target === box || e.target.classList.contains("lightbox-close")) close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- Hours table (contact page) ---------- */
  var hoursEl = $("#hours-table");
  if (hoursEl) {
    var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var today = manilaNow().day;
    hoursEl.innerHTML = [1, 2, 3, 4, 5, 6, 0].map(function (d) {
      var openDay = info.hours.days.indexOf(d) !== -1;
      return "<tr" + (d === today ? ' class="is-today"' : "") + "><td>" + names[d] + (d === today ? " (today)" : "") +
        "</td><td>" + (openDay ? hoursLabel() : "Closed") + "</td></tr>";
    }).join("");
  }
  var mapEl = $("#map");
  if (mapEl) mapEl.src = info.mapsEmbed;

  /* ---------- Reservation form ---------- */
  var form = $("#reserve-form");
  if (form) initReservation(form);

  function initReservation(form) {
    var dateEl = form.elements.date, timeEl = form.elements.time, paxEl = form.elements.pax, setEl = form.elements.set;

    // Today's date in Manila as YYYY-MM-DD
    var todayISO = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date());
    dateEl.min = todayISO;
    dateEl.value = todayISO;

    // Time slots every 30 minutes, from opening to last seating
    var slots = [];
    for (var m = toMinutes(info.hours.open); m <= toMinutes(info.hours.lastSeating); m += 30) {
      slots.push(String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0"));
    }
    function fillSlots() {
      var isToday = dateEl.value === todayISO;
      var nowMin = manilaNow().minutes;
      var prev = timeEl.value;
      timeEl.innerHTML = '<option value="">Choose a time</option>' + slots.map(function (s) {
        var past = isToday && toMinutes(s) <= nowMin;
        return '<option value="' + s + '"' + (past ? " disabled" : "") + ">" + formatTime(s) + (past ? " (passed)" : "") + "</option>";
      }).join("");
      if (prev && !timeEl.querySelector('option[value="' + prev + '"]:disabled')) timeEl.value = prev;
    }
    fillSlots();
    dateEl.addEventListener("change", function () {
      fillSlots();
      setError(dateEl, info.closedDates.indexOf(dateEl.value) !== -1 ? "Sorry, we're closed that day. Please pick another date." : "");
    });

    setEl.innerHTML = S.sets.map(function (s) {
      return '<option value="' + s.id + '">' + esc(s.name) + " (" + (s.from ? "from " : "") + peso(s.price) + ")</option>";
    }).join("") + '<option value="mixed">Mixed / not sure yet</option>';
    var preset = new URLSearchParams(location.search).get("set");
    if (preset && setEl.querySelector('option[value="' + preset + '"]')) setEl.value = preset;

    $$(".stepper button", form).forEach(function (b) {
      b.addEventListener("click", function () {
        var v = (Number(paxEl.value) || 0) + Number(b.getAttribute("data-step"));
        paxEl.value = Math.min(30, Math.max(1, v));
      });
    });

    function setError(el, msg) {
      var field = el.closest(".field");
      field.classList.toggle("has-error", !!msg);
      $(".field-error", field).textContent = msg || "";
      return !msg;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var pax = Number(paxEl.value);
      var ok = [
        setError(form.elements.name, name ? "" : "Please enter your name."),
        setError(dateEl, !dateEl.value ? "Please pick a date." : dateEl.value < todayISO ? "That date has passed." :
          info.closedDates.indexOf(dateEl.value) !== -1 ? "Sorry, we're closed that day. Please pick another date." : ""),
        setError(timeEl, timeEl.value ? "" : "Please choose a time."),
        setError(paxEl, pax >= 1 && pax <= 30 ? "" : "Party size must be 1 to 30. For bigger groups, please call us.")
      ].every(Boolean);
      if (!ok) { $(".has-error input, .has-error select", form).focus(); return; }

      var d = new Date(dateEl.value + "T00:00:00");
      var dateText = d.toLocaleDateString("en-PH", { weekday: "short", month: "short", day: "numeric", year: "numeric" });
      var setName = setEl.options[setEl.selectedIndex].text;
      var lines = [
        "Hi SamgyupTa! I'd like to reserve a table.",
        "",
        "Name: " + name,
        "Date: " + dateText,
        "Time: " + formatTime(timeEl.value),
        "Party size: " + pax + (pax === 1 ? " person" : " people"),
        "Set: " + setName
      ];
      var phone = form.elements.contact.value.trim();
      if (phone) lines.push("Contact no.: " + phone);
      var notes = form.elements.notes.value.trim();
      if (notes) lines.push("Notes: " + notes);
      var message = lines.join("\n");

      var result = $("#reserve-result");
      $("pre", result).textContent = message;
      $("#send-sms").href = "sms:" + info.phone + "?&body=" + encodeURIComponent(message);
      $("#send-call").href = "tel:" + info.phone;
      result.classList.add("is-visible");
      result.scrollIntoView({ behavior: "smooth", block: "start" });

      var copiedEl = $("#copied");
      $("#send-messenger").onclick = function () {
        copy(message).then(function () {
          copiedEl.textContent = "Message copied! Paste it in Messenger and hit send.";
        }, function () {
          copiedEl.textContent = "Couldn't copy automatically. Please select the message above and copy it.";
        });
        // let the link open Messenger normally
      };
    });
  }

  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy") ? resolve() : reject(); } catch (err) { reject(err); }
      ta.remove();
    });
  }

  /* ---------- Hero embers ---------- */
  var embers = $(".embers");
  if (embers) {
    for (var i = 0; i < 22; i++) {
      var s = document.createElement("span");
      s.style.left = Math.random() * 100 + "%";
      s.style.animationDuration = 5 + Math.random() * 7 + "s";
      s.style.animationDelay = Math.random() * 8 + "s";
      s.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
      var size = 2 + Math.random() * 5;
      s.style.width = s.style.height = size + "px";
      embers.appendChild(s);
    }
  }

  /* ---------- Reveal on scroll ---------- */
  // Anything already on screen shows immediately; the rest fades in on scroll
  var revealEls = $$(".reveal").filter(function (el) {
    if (el.getBoundingClientRect().top < window.innerHeight) { el.classList.add("is-in"); return false; }
    return true;
  });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-in"); });
  }
})();
