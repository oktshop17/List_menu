// Nomor WhatsApp penjual (format 62, tanpa + atau 0 di depan)
var WA="62895345452412";
var P=[
{id:1,cat:"Keripik & Stik",em:"🥔",n:"Keripik Kaca",v:["Original","Pedas","Cabe Ijo"],d:"Keripik kaca renyah, tersedia 3 varian rasa.",o:[["1 kg",75000],["500 gr",38000],["250 gr",22000],["125 gr",13000],["100 gr",10000]]},
{id:2,cat:"Keripik & Stik",em:"🍤",n:"Usus Crispy",v:["Pedas","Original"],d:"Usus crispy gurih dan renyah.",o:[["1 kg",105000],["500 gr",55000],["250 gr",28000],["100 gr",13000]]},
{id:3,cat:"Keripik & Stik",em:"🐟",n:"Basreng Stik",v:["Pedas","Original"],d:"Baso goreng bentuk stik, gurih dan garing.",o:[["1 kg",75000],["500 gr",45000],["250 gr",23000],["125 gr",13000]]},
{id:4,cat:"Frozen & Mateng",em:"🍲",n:"Baso Aci",k:["Frozen","Mateng"],v:["Ayam Suir","Tetelan","Urat","Original"],d:"Baso aci tersedia frozen & mateng. Harga per porsi berbeda tiap varian.",vp:{"Ayam Suir":10000,"Tetelan":10000,"Urat":12000,"Original":6000},o:[["1 porsi",0]]},
{id:5,cat:"Frozen & Mateng",em:"🌶️",n:"Basreng Bojot",d:"Basreng bojot pedas gurih.",o:[["1 porsi",5000]]},
{id:6,cat:"Frozen & Mateng",em:"🍢",n:"Otak-Otak Bojot",d:"Otak-otak bojot.",o:[["1 porsi",5000]]},
{id:7,cat:"Cireng",em:"🥟",n:"Cireng Isi",k:["Frozen","Mateng"],v:["Ayam Suir","Ati Ampela","Keju Lumer","Jando"],d:"Cireng isi semua varian, harga per pcs.",o:[["1 pcs",2000]]},
{id:8,cat:"Cireng",em:"🧀",n:"Cireng Kuah Keju Creamy",d:"Cireng dengan kuah keju creamy, isi 4 pcs.",o:[["Isi 4 pcs",10000]]}
];
var cats=["Semua"].concat(P.map(function(p){return p.cat}).filter(function(c,i,a){return a.indexOf(c)===i}));
var cur="Semua",st={};
function rp(n){return "Rp"+n.toLocaleString("id-ID")}
function price(p,vi,oi){return p.vp?p.vp[p.v[vi]]:p.o[oi][1]}
function from(p){var a=p.vp?Object.keys(p.vp).map(function(k){return p.vp[k]}):p.o.map(function(x){return x[1]});var m=Math.min.apply(null,a),M=Math.max.apply(null,a);return m===M?rp(m):rp(m)+" – "+rp(M)}
function tabs(){document.getElementById("tabs").innerHTML=cats.map(function(c){return '<button class="tab'+(c===cur?' on':'')+'" onclick="cur=\''+c+'\';tabs();list()">'+c+'</button>'}).join("")}
function list(){document.getElementById("list").innerHTML=P.filter(function(p){return cur==="Semua"||p.cat===cur}).map(function(p){return '<div class="card"><div class="top"><div class="em">'+p.em+'</div><div><div class="nm">'+p.n+'</div><div class="pr">'+(p.v?p.v.join(" · ")+"<br>":"")+from(p)+'</div></div></div><div class="acts"><button class="b" onclick="det('+p.id+')">Detail</button><button class="b c" onclick="chat('+p.id+')">Chat</button><button class="b p" onclick="ord('+p.id+')">Checkout</button></div></div>'}).join("")}
function P_(id){return P.filter(function(p){return p.id===id})[0]}
function open_(h){document.getElementById("sh").innerHTML='<button class="x" onclick="cl()">×</button>'+h;document.getElementById("ov").classList.add("on")}
function cl(){document.getElementById("ov").classList.remove("on")}
document.getElementById("ov").addEventListener("click",function(e){if(e.target.id==="ov")cl()});
function wa(t){window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(t),"_blank")}
function chat(id){var p=P_(id);wa("Halo kak, saya mau tanya "+p.n+" ya 🙏")}
function det(id){var p=P_(id),h='<h2>'+p.em+' '+p.n+'</h2><p class="pr">'+p.d+'</p>';
if(p.v)h+='<div class="lb">Varian</div><div class="chips">'+p.v.map(function(v){return '<span class="chip">'+v+(p.vp?' · '+rp(p.vp[v]):'')+'</span>'}).join("")+'</div>';
if(p.k)h+='<div class="lb">Kondisi</div><div class="chips">'+p.k.map(function(k){return '<span class="chip">'+k+'</span>'}).join("")+'</div>';
if(!p.vp)h+='<div class="lb">Ukuran & harga</div>'+p.o.map(function(o){return '<div class="row"><span>'+o[0]+'</span><b>'+rp(o[1])+'</b></div>'}).join("");
h+='<div class="acts" style="grid-template-columns:1fr 1fr;margin-top:16px"><button class="b c" onclick="chat('+id+')">Chat</button><button class="b p" onclick="ord('+id+')">Checkout</button></div>';open_(h)}
var cart=[],buyer={nama:"",almt:""},view="ord";
function lbl(it){var p=P_(it.id);return p.n+(p.v?" ("+p.v[it.vi]+")":"")+(p.vp?"":" "+p.o[it.oi][0])+(p.k?" - "+p.k[it.ki]:"")}
function sub(it){return price(P_(it.id),it.vi,it.oi)*it.q}
function ctot(){return cart.reduce(function(s,i){return s+sub(i)},0)}
function cn(){return cart.reduce(function(s,i){return s+i.q},0)}
function cbar(){var b=document.getElementById("cbar"),on=cart.length>0&&location.hash!=="#daftar-reseller";b.hidden=!on;document.body.classList.toggle("hascart",on);if(cart.length)document.getElementById("cbt").textContent=cn()+" item · "+rp(ctot())}
function ord(id){st={id:id,vi:0,oi:0,ki:0,q:1};ordv()}
function addc(){var f=cart.filter(function(i){return i.id===st.id&&i.vi===st.vi&&i.oi===st.oi&&i.ki===st.ki})[0];if(f)f.q+=st.q;else cart.push({id:st.id,vi:st.vi,oi:st.oi,ki:st.ki,q:st.q});st.q=1;cbar();ordv()}
function rmc(i){cart.splice(i,1);cbar();if(view==="cart"){cart.length?cartv():cl()}else ordv()}
function cartHtml(){return cart.map(function(it,i){return '<div class="row"><span>'+lbl(it)+' x'+it.q+'</span><span>'+rp(sub(it))+' <button class="rm" onclick="rmc('+i+')" aria-label="Hapus">✕</button></span></div>'}).join("")}
function ok(){return buyer.nama.trim().length>0&&buyer.almt.trim().length>0}
function dis(){return ok()?'':' disabled'}
function chk(){var b=document.getElementById("btnWa"),m=document.getElementById("hintWa");if(b)b.disabled=!ok();if(m)m.hidden=ok()}
function buyerHtml(){return '<input id="nama" placeholder="Nama pemesan (wajib)" value="'+buyer.nama.replace(/"/g,"&quot;")+'" oninput="buyer.nama=this.value;chk()"><input id="almt" placeholder="Alamat lengkap (wajib)" value="'+buyer.almt.replace(/"/g,"&quot;")+'" oninput="buyer.almt=this.value;chk()"><p class="hint" id="hintWa"'+(ok()?' hidden':'')+'>Isi nama dan alamat dulu agar tombol pesan bisa ditekan.</p>'}
function ordv(){view="ord";var p=P_(st.id),h='<h2>'+p.em+' '+p.n+'</h2>';
if(p.v)h+='<div class="lb">Varian</div><div class="chips">'+p.v.map(function(v,i){return '<button class="chip'+(i===st.vi?' on':'')+'" onclick="st.vi='+i+';ordv()">'+v+'</button>'}).join("")+'</div>';
if(p.k)h+='<div class="lb">Kondisi</div><div class="chips">'+p.k.map(function(k,i){return '<button class="chip'+(i===st.ki?' on':'')+'" onclick="st.ki='+i+';ordv()">'+k+'</button>'}).join("")+'</div>';
if(!p.vp&&p.o.length>1)h+='<div class="lb">Ukuran</div><div class="chips">'+p.o.map(function(o,i){return '<button class="chip'+(i===st.oi?' on':'')+'" onclick="st.oi='+i+';ordv()">'+o[0]+' · '+rp(o[1])+'</button>'}).join("")+'</div>';
var pr=price(p,st.vi,st.oi);
h+='<div class="lb">Jumlah</div><div class="qty"><button onclick="st.q=Math.max(1,st.q-1);ordv()">−</button><b>'+st.q+'</b><button onclick="st.q++;ordv()">+</button></div>';
h+='<button class="full b add" onclick="addc()">+ Tambah ke pesanan · '+rp(pr*st.q)+'</button>';
if(cart.length)h+='<div class="lb" style="margin-top:14px">Pesanan Kakak</div>'+cartHtml()+'<p class="hint">Mau varian lain? Pilih varian di atas lalu tekan "+ Tambah ke pesanan".</p>';
h+='<div style="margin-top:12px">'+buyerHtml()+'</div>';
h+='<div class="tot"><span>Total</span><span>'+rp(cart.length?ctot():pr*st.q)+'</span></div><button class="full b p" style="background:var(--ok);border-color:var(--ok);color:#fff" id="btnWa" onclick="send()"'+dis()+'>Pesan via WhatsApp'+(cart.length?' ('+cn()+' item)':'')+'</button>';open_(h)}
function cartv(){view="cart";var h='<h2>🛒 Pesanan Kakak</h2>'+cartHtml()+'<div style="margin-top:12px">'+buyerHtml()+'</div><div class="tot"><span>Total</span><span>'+rp(ctot())+'</span></div><button class="full b p" style="background:var(--ok);border-color:var(--ok);color:#fff" id="btnWa" onclick="send()"'+dis()+'>Pesan via WhatsApp ('+cn()+' item)</button><button class="full b" style="margin-top:8px" onclick="cl()">+ Tambah produk lain</button>';open_(h)}
function send(){if(!ok())return;var items=cart.length?cart:[{id:st.id,vi:st.vi,oi:st.oi,ki:st.ki,q:st.q}],tot=0;
var t="Halo kak, saya mau pesan:\n"+items.map(function(it){tot+=sub(it);return "• "+lbl(it)+" x"+it.q+" = "+rp(sub(it))}).join("\n")+"\n\nTotal: "+rp(tot)+"\n\nNama: "+(buyer.nama.trim()||"-")+"\nAlamat/catatan: "+(buyer.almt.trim()||"-");
wa(t);cart=[];cbar();cl()}
tabs();list();

// ===== Daftar Reseller =====
var rsTimer=null;
function rsErr(k,m){document.getElementById("rsE-"+k).textContent=m||"";document.getElementById("rs"+k.charAt(0).toUpperCase()+k.slice(1)).classList.toggle("bad",!!m)}
function rsClose(){clearInterval(rsTimer);document.getElementById("rsOv").classList.remove("on")}
document.getElementById("rsTutup").addEventListener("click",rsClose);
document.getElementById("rsForm").addEventListener("submit",function(e){
  e.preventDefault();
  var nama=document.getElementById("rsNama").value.trim(),
      almt=document.getElementById("rsAlamat").value.trim(),
      hp=document.getElementById("rsHp").value.replace(/[\s-]/g,""),
      mail=document.getElementById("rsEmail").value.trim();
  rsErr("nama",nama.length<3?"Nama minimal 3 huruf":"");
  rsErr("alamat",almt.length<10?"Alamat belum lengkap":"");
  rsErr("hp",/^(\+62|62|0)8\d{8,12}$/.test(hp)?"":"Nomor HP tidak valid (contoh 08123456789)");
  rsErr("email",/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)?"":"Email tidak valid");
  if(document.querySelector("#rsForm .bad"))return;
  var t="Halo Admin, saya ingin mendaftar jadi reseller.\n\nNama: "+nama+"\nAlamat: "+almt+"\nNo. HP: "+hp+"\nEmail: "+mail;
  var url="https://wa.me/"+WA+"?text="+encodeURIComponent(t);
  document.getElementById("rsOkNama").textContent=nama;
  document.getElementById("rsPv").textContent=t;
  document.getElementById("rsKirim").href=url;
  document.getElementById("rsOv").classList.add("on");
  var n=3,cd=document.getElementById("rsCd");cd.textContent=n;
  clearInterval(rsTimer);
  rsTimer=setInterval(function(){n--;cd.textContent=n;if(n<=0){clearInterval(rsTimer);window.location.href=url}},1000);
});

// ===== Pindah tampilan Menu <-> Daftar Reseller =====
function rsView(){
  var on=location.hash==="#daftar-reseller";
  document.getElementById("viewMenu").hidden=on;
  document.getElementById("viewRs").hidden=!on;
  window.scrollTo(0,0);
  cbar();
}
document.getElementById("bukaRs").addEventListener("click",function(){location.hash="daftar-reseller"});
document.getElementById("kembali").addEventListener("click",function(){
  location.hash="menu";
});
window.addEventListener("hashchange",rsView);
rsView();
