// Эргүүлэх дугуй:  Эргэлт бүрд бүх 50 асуултаас санамсаргүй сонгоно.
const C = { forms: ["Жор ба эмийн хэлбэр", "#b1301f"], pk: ["Шимэгдэлт ба хориг", "#1b7f7a"], met: ["Хувирал ба ялгарал", "#8a5fc2"], dyn: ["Рецептор ба үйлдэл", "#a8730f"], dose: ["Тун", "#2f7fd0"], inter: ["Харилцан үйлчлэл", "#d2691e"], adv: ["Сөрөг нөлөө", "#d23a62"] };
const $ = s => document.querySelector(s); let cat = "all", qs = "", known = new Set(), deck = [], di = 0;
try { known = new Set(JSON.parse(localStorage.getItem("pq-known") || "[]")) } catch (e) { }
const save = () => { try { localStorage.setItem("pq-known", JSON.stringify([...known])) } catch (e) { } };
const vis = () => D.filter(x => (cat === "all" || x.c === cat) && (x.q + x.a).toLowerCase().includes(qs));
function prog() { const k = known.size; $("#pb").style.width = k / D.length * 100 + "%"; $("#pt").textContent = k + " / " + D.length + " мэдсэн" }
function render() { const v = vis(); $("#list").innerHTML = v.length ? v.map((x, i) => `<details class="card" style="--cc:${C[x.c][1]};animation-delay:${Math.min(i, 10) * 35}ms"><summary><span class="seal">${x.n}</span><b>${x.q}</b></summary><div class="a"><span class="tag">${C[x.c][0].toUpperCase()}</span>${x.a}<button class="know${known.has(x.n) ? " ok" : ""}" data-n="${x.n}">${known.has(x.n) ? "✓ Мэдсэн" : "Мэдсэн гэж тэмдэглэх"}</button></div></details>`).join("") : '<p class="none">Юу ч олдсонгүй.</p>'; prog() }
$("#chips").innerHTML = [["all", "Бүгд"], ...Object.entries(C).map(([k, v]) => [k, v[0]])].map(([k, t]) => `<button class="chip${k === "all" ? " on" : ""}" data-c="${k}">${t}</button>`).join("");
$("#chips").onclick = e => { const b = e.target.closest(".chip"); if (!b) return; cat = b.dataset.c; document.querySelectorAll(".chip").forEach(c => c.classList.toggle("on", c === b)); render() };
$("#s").oninput = e => { qs = e.target.value.trim().toLowerCase(); render() };
$("#list").onclick = e => { const b = e.target.closest(".know"); if (!b) return; const n = +b.dataset.n; known.has(n) ? known.delete(n) : known.add(n); save(); b.classList.toggle("ok", known.has(n)); b.textContent = known.has(n) ? "✓ Мэдсэн" : "Мэдсэн гэж тэмдэглэх"; prog() };
$("#all").onclick = () => { const d = [...document.querySelectorAll("details.card")], o = d.some(x => !x.open); d.forEach(x => x.open = o); $("#all").textContent = o ? "Бүгдийг хаах" : "Бүгдийг нээх" };
function show() {
    const x = deck[di], B = $("#dB"); if (!x) { B.innerHTML = '<div class="dc">ДУУСЛАА</div><h2>Баяр хүргэе! Энэ дугуйг гүйцэтгэлээ.</h2>'; return }
    B.innerHTML = `<div class="dc">${di + 1} / ${deck.length} · ${C[x.c][0].toUpperCase()}</div><h2>${x.q}</h2><div id="dA" hidden>${x.a}</div><div class="row"><button class="pri" id="rv">Хариу харах</button><button id="kn" hidden>✓ Мэдсэн</button><button id="ag" hidden>↻ Дахин давтах</button></div>`;
    $("#rv").onclick = () => { $("#dA").hidden = false; $("#rv").hidden = true; $("#kn").hidden = false; $("#ag").hidden = false };
    $("#kn").onclick = () => { known.add(x.n); save(); di++; show() }; $("#ag").onclick = () => { deck.push(x); di++; show() }
}
$("#go").onclick = () => { let v = vis(); let u = v.filter(x => !known.has(x.n)); deck = (u.length ? u : v).slice().sort(() => Math.random() - .5); di = 0; $("#drill").classList.add("on"); show() };
$("#dx").onclick = () => { $("#drill").classList.remove("on"); render() };

let rot = 0, busy = false;
function draw() {
    const x = $("#wh").getContext("2d"), N = D.length, a = 2 * Math.PI / N; x.clearRect(0, 0, 600, 600);
    D.forEach((d, i) => {
        x.globalAlpha = 1; x.beginPath(); x.moveTo(300, 300); x.arc(300, 300, 292, (i - .5) * a - Math.PI / 2, (i + .5) * a - Math.PI / 2); x.closePath(); x.fillStyle = C[d.c][1]; x.fill(); x.strokeStyle = "#fffdf8"; x.lineWidth = 1.5; x.stroke();
        x.save(); x.translate(300, 300); x.rotate(i * a); x.fillStyle = "#fff"; x.font = "800 15px Manrope,sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(d.n, 0, -266); x.restore()
    });
    x.globalAlpha = 1; x.lineWidth = 8; x.strokeStyle = "#f0b429"; x.beginPath(); x.arc(300, 300, 296, 0, 7); x.stroke(); x.fillStyle = "#14213d"; x.beginPath(); x.arc(300, 300, 86, 0, 7); x.fill()
}
function showRes(d) {
    const R = $("#res"); R.innerHTML = `<div class="rc" style="--cc:${C[d.c][1]}"><div class="hd"><span class="seal">${d.n}</span><span class="tag" style="margin:0">${C[d.c][0].toUpperCase()}</span></div><h3>${d.q}</h3><div id="rA" hidden>${d.a}</div><div class="row"><button class="pri" id="rr">Хариу харах</button><button id="rs">↻ Дахин эргүүлэх</button></div></div>`;
    $("#rr").onclick = () => { $("#rA").hidden = false; $("#rr").hidden = true };

    $("#rs").onclick = () => { $("#wh").scrollIntoView({ behavior: "smooth", block: "center" }); setTimeout(() => $("#spinbtn").click(), 350) };
    R.scrollIntoView({ behavior: "smooth", block: "start" })
}
$("#spinbtn").onclick = () => {
    if (busy) return; busy = true; $("#res").innerHTML = "";
    const d = D[Math.floor(Math.random() * D.length)], i = D.indexOf(d), a = 360 / D.length, off = i * a + (Math.random() - .5) * a * .7;
    rot = rot - (rot % 360) + 360 * 6 + (((-off) % 360) + 360) % 360; $("#wh").style.transform = `rotate(${rot}deg)`;
    setTimeout(() => { busy = false; showRes(d) }, matchMedia("(prefers-reduced-motion:reduce)").matches ? 50 : 4700)
};
function route() { const v = location.hash === "#spin" ? "spin" : "home"; $("#vHome").hidden = v !== "home"; $("#vSpin").hidden = v !== "spin"; document.querySelectorAll(".nav a").forEach(a => a.classList.toggle("on", a.dataset.v === v)); if (v === "home") render(); else draw(); const n = document.querySelector(".nav"); if (scrollY > n.offsetTop) scrollTo(0, n.offsetTop) }
addEventListener("hashchange", route); document.fonts && document.fonts.ready.then(draw); route();
