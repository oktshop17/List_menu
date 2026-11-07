// Nomor WhatsApp penjual (format 62, tanpa + atau 0 di depan)
var WA="62895345452412";
var P=[
{id:1,cat:"Keripik & Stik",em:"🥔",n:"Keripik Kaca",rt:"4.9 · 7RB+ terjual",v:["Original","Pedas","Cabe Ijo"],d:"Keripik kaca renyah, tersedia 3 varian rasa.",o:[["1 kg",75000],["500 gr",38000],["250 gr",22000],["125 gr",13000],["100 gr",10000]]},
{id:2,cat:"Keripik & Stik",em:"🍤",n:"Usus Crispy",rt:"4.8 · 343 terjual",v:["Pedas","Original"],d:"Usus crispy gurih dan renyah.",o:[["1 kg",105000],["500 gr",55000],["250 gr",28000],["100 gr",13000]]},
{id:3,cat:"Keripik & Stik",em:"🐟",n:"Basreng Stik",rt:"4.8 · 476 terjual",v:["Pedas","Original"],d:"Baso goreng bentuk stik, gurih dan garing.",o:[["1 kg",75000],["500 gr",45000],["250 gr",23000],["125 gr",13000]]},
{id:4,cat:"Frozen & Mateng",em:"🍲",n:"Baso Aci",rt:"4.7 · 10RB+ terjual",tes:[{u:"i*****h",b:5,t:"Kemasan bagus, harga sesuai",s:"Boci Ayam Suir Frozen · 06 Apr 2024 · ShopeeFood"}],k:["Frozen","Mateng"],v:["Ayam Suir","Tetelan","Urat","Original"],d:"Baso aci tersedia frozen & mateng. Harga per porsi berbeda tiap varian.",vp:{"Ayam Suir":10000,"Tetelan":10000,"Urat":12000,"Original":6000},o:[["1 porsi",0]]},
{id:9,cat:"Frozen & Mateng",em:"🍡",n:"Baso Ikan Liat",rt:"4.8 · 4RB+ terjual",d:"Baso ikan liat isi 350gr, bumbu menggoda dan ikannya terasa jelas.",o:[["350gr",21000]]},
{id:5,cat:"Frozen & Mateng",em:"🌶️",n:"Basreng Bojot",rt2:"👍 46 terjual · disukai 4 pembeli di ShopeeFood",d:"Basreng bojot pedas gurih.",o:[["1 porsi",5000]]},
{id:6,cat:"Frozen & Mateng",em:"🍢",n:"Otak-Otak Bojot",rt2:"👍 27 terjual · disukai 1 pembeli di ShopeeFood",d:"Otak-otak bojot.",o:[["1 porsi",5000]]},
{id:7,cat:"Cireng",em:"🥟",n:"Cireng Isi",rt2:"👍 330+ terjual · disukai 22 pembeli di ShopeeFood",tes:[{u:"wilin1104",b:5,t:"MANTAPPPPPP ENAK BANGET INII BOCINYA MANTAPPPP CIRENGNYA JUGAA",s:"Cireng Isi Ati Ampela Pedas · 16 Okt 2026 · ShopeeFood"}],k:["Frozen","Mateng"],v:["Ayam Suir","Ati Ampela","Keju Lumer","Jando"],d:"Cireng isi semua varian, harga per pcs.",o:[["1 pcs",2000]]},
{id:8,cat:"Cireng",em:"🧀",n:"Cireng Kuah Keju Creamy",rt2:"👍 100 terjual · disukai 4 pembeli di ShopeeFood",d:"Isi 4 pcs ukuran besar, cireng ayam atau bisa mix dengan varian keju dan jando, dengan kuah keju creamy.",o:[["Isi 4 pcs",10000]]}
];
var cats=["Semua","Rekomendasi"].concat(P.map(function(p){return p.cat}).filter(function(c,i,a){return a.indexOf(c)===i}));
var cur="Semua",st={};
function rp(n){return "Rp"+n.toLocaleString("id-ID")}
function price(p,vi,oi){return p.vp?p.vp[p.v[vi]]:p.o[oi][1]}
function from(p){var a=p.vp?Object.keys(p.vp).map(function(k){return p.vp[k]}):p.o.map(function(x){return x[1]});var m=Math.min.apply(null,a),M=Math.max.apply(null,a);return m===M?rp(m):rp(m)+" – "+rp(M)}
function tabs(){var el=document.getElementById("tabs"),sl=el.scrollLeft;el.innerHTML=cats.map(function(c){return '<button class="tab'+(c===cur?' on':'')+'" onclick="cur=\''+c+'\';tabs();list();goMenu()">'+(c==="Rekomendasi"?"⭐ Rekomendasi":c)+'</button>'}).join("");el.scrollLeft=sl}
function goMenu(){var l=document.getElementById("list"),t=document.getElementById("tabs"),r=l.getBoundingClientRect().top,th=t.offsetHeight;if(r<th+10){var y=r+(window.pageYOffset||document.documentElement.scrollTop)-th-12;try{window.scrollTo({top:Math.max(0,y),behavior:"smooth"})}catch(e){window.scrollTo(0,Math.max(0,y))}}}
var REC=[{id:9},{id:4,vi:2,nama:"Baso Aci Urat"}];
function recList(){document.getElementById("list").innerHTML=REC.map(function(r){
  var p=P_(r.id),nm=r.nama||p.n,hasV=r.vi!=null,pr=hasV?rp(price(p,r.vi,0)):from(p),sb=hasV?"Varian "+p.v[r.vi]+(p.k?" · Frozen / Mateng":""):"";
  return '<div class="card"><div class="top"><div class="em">'+p.em+'</div><div><div class="nm">'+nm+'</div><div class="pr">'+(sb?sb+"<br>":"")+pr+'<br><span class="rt rec">⭐ Rekomendasi</span>'+(p.rt?' <span class="rt">'+(/^\d/.test(p.rt)?'⭐ '+p.rt+' di Shopee':p.rt)+'</span>':'')+'</div></div></div><div class="acts"><button class="b" onclick="det('+p.id+')">Detail</button><button class="b c" onclick="chat('+p.id+',\''+nm+'\')">Chat</button><button class="b p" onclick="ord('+p.id+(hasV?','+r.vi:'')+')">Checkout</button></div></div>';
}).join("")}
function list(){if(cur==="Rekomendasi"){recList();return}document.getElementById("list").innerHTML=P.filter(function(p){return cur==="Semua"||p.cat===cur}).map(function(p){return '<div class="card"><div class="top"><div class="em">'+p.em+'</div><div><div class="nm">'+p.n+'</div><div class="pr">'+(p.v?p.v.join(" · ")+"<br>":"")+from(p)+(p.rt?'<br><span class="rt">⭐ '+p.rt+' di Shopee</span>':'')+(p.rt2?'<br><span class="rt">'+p.rt2+'</span>':'')+'</div></div></div><div class="acts"><button class="b" onclick="det('+p.id+')">Detail</button><button class="b c" onclick="chat('+p.id+')">Chat</button><button class="b p" onclick="ord('+p.id+')">Checkout</button></div></div>'}).join("")}
function P_(id){return P.filter(function(p){return p.id===id})[0]}
function open_(h){document.getElementById("sh").innerHTML='<button class="x" onclick="cl()">×</button>'+h;document.getElementById("ov").classList.add("on")}
function cl(){document.getElementById("ov").classList.remove("on")}
document.getElementById("ov").addEventListener("click",function(e){if(e.target.id==="ov")cl()});
function wa(t){window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(t),"_blank")}
function chat(id,nm){var p=P_(id);wa("Halo kak, saya mau tanya "+(nm||p.n)+" ya 🙏")}
function det(id){var p=P_(id),h='<h2>'+p.em+' '+p.n+'</h2><p class="pr">'+p.d+'</p>';
if(p.v)h+='<div class="lb">Varian</div><div class="chips">'+p.v.map(function(v){return '<span class="chip">'+v+(p.vp?' · '+rp(p.vp[v]):'')+'</span>'}).join("")+'</div>';
if(p.k)h+='<div class="lb">Kondisi</div><div class="chips">'+p.k.map(function(k){return '<span class="chip">'+k+'</span>'}).join("")+'</div>';
if(!p.vp)h+='<div class="lb">Ukuran & harga</div>'+p.o.map(function(o){return '<div class="row"><span>'+o[0]+'</span><b>'+rp(o[1])+'</b></div>'}).join("");
if(p.rt2)h+='<div style="margin-top:10px"><span class="rt">'+p.rt2+'</span></div>';
if(p.tes&&p.tes.length)h+='<div class="lb" style="margin-top:12px">Testimoni pembeli</div>'+p.tes.map(function(t){var n=Math.max(0,Math.min(5,t.b||5));return '<div class="quote"><div class="uc-st">'+"★★★★★".slice(0,n)+'</div><p>“'+esc(t.t)+'”</p><small>'+esc(maskUser(t.u))+' · '+esc(t.s||"")+'</small></div>'}).join("");
h+='<div class="acts" style="grid-template-columns:1fr 1fr;margin-top:16px"><button class="b c" onclick="chat('+id+')">Chat</button><button class="b p" onclick="ord('+id+')">Checkout</button></div>';open_(h)}
var cart=[],buyer={nama:"",almt:"",kirim:""},view="ord";
function lbl(it){var p=P_(it.id);return p.n+(p.v?" ("+p.v[it.vi]+")":"")+(p.vp?"":" "+p.o[it.oi][0])+(p.k?" - "+p.k[it.ki]:"")}
function sub(it){return price(P_(it.id),it.vi,it.oi)*it.q}
function ctot(){return cart.reduce(function(s,i){return s+sub(i)},0)}
function cn(){return cart.reduce(function(s,i){return s+i.q},0)}
function cbar(){var b=document.getElementById("cbar"),on=cart.length>0&&location.hash!=="#daftar-reseller";b.hidden=!on;document.body.classList.toggle("hascart",on);if(cart.length)document.getElementById("cbt").textContent=cn()+" item · "+rp(ctot())}
function ord(id,vi){st={id:id,vi:vi||0,oi:0,ki:0,q:1};ordv()}
function addc(){var f=cart.filter(function(i){return i.id===st.id&&i.vi===st.vi&&i.oi===st.oi&&i.ki===st.ki})[0];if(f)f.q+=st.q;else cart.push({id:st.id,vi:st.vi,oi:st.oi,ki:st.ki,q:st.q});st.q=1;cbar();ordv()}
function rmc(i){cart.splice(i,1);cbar();if(view==="cart"){cart.length?cartv():cl()}else ordv()}
function cartHtml(){return cart.map(function(it,i){return '<div class="row"><span>'+lbl(it)+' x'+it.q+'</span><span>'+rp(sub(it))+' <button class="rm" onclick="rmc('+i+')" aria-label="Hapus">✕</button></span></div>'}).join("")}
var KIRIM=["COD","Kirim via Maxim","Kirim JNT/JNE"];
function ok(){return buyer.nama.trim().length>0&&buyer.almt.trim().length>0&&buyer.kirim!==""}
function setKirim(i){buyer.kirim=KIRIM[i];var cs=document.querySelectorAll(".kirim .chip");for(var n=0;n<cs.length;n++)cs[n].classList.toggle("on",n===i);chk()}
function dis(){return ok()?'':' disabled'}
function chk(){var b=document.getElementById("btnWa"),m=document.getElementById("hintWa");if(b)b.disabled=!ok();if(m)m.hidden=ok()}
function buyerHtml(){return '<input id="nama" placeholder="Nama pemesan (wajib)" value="'+buyer.nama.replace(/"/g,"&quot;")+'" oninput="buyer.nama=this.value;chk()"><input id="almt" placeholder="Alamat lengkap (wajib)" value="'+buyer.almt.replace(/"/g,"&quot;")+'" oninput="buyer.almt=this.value;chk()"><div class="lb">Pengiriman</div><div class="chips kirim">'+KIRIM.map(function(k,i){return '<button type="button" class="chip'+(buyer.kirim===k?' on':'')+'" onclick="setKirim('+i+')">'+k+'</button>'}).join("")+'</div><p class="hint" id="hintWa"'+(ok()?' hidden':'')+'>Isi nama, alamat, dan pilih pengiriman dulu agar tombol pesan bisa ditekan.</p>'}
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
var t="Halo kak, saya mau pesan:\n"+items.map(function(it){tot+=sub(it);return "• "+lbl(it)+" x"+it.q+" = "+rp(sub(it))}).join("\n")+"\n\n----------------\nTotal: "+rp(tot)+"\n\nNama: "+(buyer.nama.trim()||"-")+"\nAlamat/catatan: "+(buyer.almt.trim()||"-")+"\nPengiriman: "+buyer.kirim;
saveOrder(tot,items);wa(t);cart=[];cbar();cl()}
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
  saveReseller(nama);
  fbAdd("reseller",{nama:nama,alamat:almt,hp:hp,email:mail,status:"baru"});
  fbAdd("catatan",{nama:nama.split(/\s+/)[0],jenis:"Reseller",tampil:false});
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

// ===== Catatan pengunjung, testimoni, info toko =====
var LS="okt_catatan_v1";
function lsGet(){try{return JSON.parse(localStorage.getItem(LS))||{}}catch(e){return {}}}
function lsSet(o){try{localStorage.setItem(LS,JSON.stringify(o))}catch(e){}}
function tgl(t){try{return new Date(t).toLocaleDateString("id-ID",{day:"numeric",month:"short",year:"numeric"})}catch(e){return ""}}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function saveOrder(total,items){
  var d=lsGet();
  d.buyer={nama:buyer.nama.trim(),almt:buyer.almt.trim(),kirim:buyer.kirim};
  d.orders=d.orders||[];
  d.orders.unshift({t:Date.now(),n:items.reduce(function(s,i){return s+i.q},0),total:total});
  d.orders=d.orders.slice(0,5);
  lsSet(d);renderMy();
  fbAdd("pesanan",{nama:buyer.nama.trim(),alamat:buyer.almt.trim(),kirim:buyer.kirim,items:items.map(function(it){return {nama:lbl(it),jumlah:it.q,subtotal:sub(it)}}),total:total,sumber:"landing"});
  fbAdd("catatan",{nama:buyer.nama.trim().split(/\s+/)[0],jenis:"Checkout",tampil:false});
}
function saveReseller(nama){var d=lsGet();d.reseller={t:Date.now(),nama:nama};lsSet(d);renderMy()}
function renderMy(){
  var d=lsGet(),el=document.getElementById("myNote"),h="";
  if(d.orders&&d.orders.length){var o=d.orders[0];h+='<div>🛍️ Terakhir pesan <b>'+tgl(o.t)+'</b>: '+o.n+' item, '+rp(o.total)+'</div>'}
  if(d.reseller){h+='<div>🤝 Anda sudah mendaftar reseller pada <b>'+tgl(d.reseller.t)+'</b></div>'}
  if(!h){el.hidden=true;return}
  var nm=(d.buyer&&d.buyer.nama)||(d.reseller&&d.reseller.nama)||"";
  el.innerHTML='<b>Selamat datang kembali'+(nm?', '+esc(nm):'')+'! 👋</b>'+h;el.hidden=false;
}
function renderOpen(){
  var b=document.getElementById("openBadge"),h,wd;
  try{
    var p=new Date().toLocaleString("en-US",{timeZone:"Asia/Jakarta",weekday:"short",hour:"2-digit",hour12:false}).split(/[ ,]+/);
    wd=p[0];h=parseInt(p[1],10);
  }catch(e){var n=new Date();wd=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][n.getDay()];h=n.getHours()}
  var hariBuka=wd!=="Sun",on=hariBuka&&h>=9&&h<21,txt;
  if(on)txt="● Buka · sampai 21.00";
  else if(!hariBuka)txt="● Tutup · buka Senin 09.00";
  else if(h>=21)txt=wd==="Sat"?"● Tutup · buka Senin 09.00":"● Tutup · buka besok 09.00";
  else txt="● Tutup · buka 09.00";
  b.textContent=txt;b.className="open "+(on?"on":"off");
}
function renderTesti(){
  var g=document.getElementById("testiGrid"),a=(typeof TESTIMONI!=="undefined"&&TESTIMONI)||[];
  if(!a.length){g.innerHTML='<div class="empty">📸 Foto testimoni reseller segera hadir</div>';return}
  g.innerHTML=a.map(function(t){return '<a class="tf" href="'+esc(t.src)+'" target="_blank" rel="noopener"><img loading="lazy" src="'+esc(t.src)+'" alt="'+esc(t.caption||"Testimoni")+'"><span>'+esc(t.caption||"")+'</span></a>'}).join("");
}
function maskNama(n){n=String(n).replace(/[^A-Za-z0-9]/g,"");return n.length<=3?n.charAt(0)+"***":n.slice(0,3)+"***"}
function renderAkt(src){
  var el=document.getElementById("aktList"),a=(src||((typeof AKTIVITAS!=="undefined"&&AKTIVITAS)||[])).slice(0,10);
  if(!a.length){el.innerHTML='<div class="empty">Belum ada catatan. Jadilah yang pertama checkout atau daftar reseller! 🚀</div>';return}
  var rows=a.map(function(x,i){
    var r=x.jenis==="Reseller",nm=i<5?maskNama(x.nama):"*****";
    return '<tr'+(i>2?' class="more"':'')+'><td class="no">'+(i+1)+'</td><td><b>'+esc(nm)+'</b>'+(i<5&&x.area?'<br><small>'+esc(x.area)+'</small>':'')+'</td><td>'+(r?'🤝 Reseller':'🛍️ Checkout')+'</td><td>'+esc(x.waktu||"-")+'</td></tr>';
  }).join("")+'<tr class="more"><td colspan="4" class="dst">dst</td></tr>';
  var h='<div class="tbl-w" id="aktBox"><table class="tbl"><thead><tr><th>No</th><th>Nama</th><th>Status</th><th>Keterangan</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  h+='<button type="button" class="more-b" id="aktMore">Selengkapnya ›</button>';
  h+='<p class="akt-note" id="aktNote" hidden>Puluhan orang sudah mendaftar reseller, sekarang giliran kamu!</p>';
  el.innerHTML=h;
  var mb=document.getElementById("aktMore");
  mb.addEventListener("click",function(){
    var box=document.getElementById("aktBox"),on=box.classList.toggle("all");
    mb.textContent=on?"Tutup ‹":"Selengkapnya ›";
    document.getElementById("aktNote").hidden=!on;
  });
}
(function(){var sv=lsGet();if(sv.buyer){buyer.nama=sv.buyer.nama||"";buyer.almt=sv.buyer.almt||"";buyer.kirim=sv.buyer.kirim||""}})();
renderOpen();renderTesti();renderAkt();renderMy();

// ===== Ulasan Shopee =====
function maskUser(u){u=String(u);if(u.indexOf("*")>-1)return u;return u.length<=3?u.charAt(0)+"***":u.slice(0,2)+"***"+u.slice(-1)}
function renderUlasan(){
  var el=document.getElementById("ulasanList"),a=(typeof ULASAN!=="undefined"&&ULASAN)||[];
  if(!a.length){el.hidden=true;return}
  el.innerHTML=a.map(function(x){
    var n=Math.max(0,Math.min(5,x.bintang||5));
    return '<div class="uc"><div class="uc-top"><span class="uc-av">'+esc(maskUser(x.user).charAt(0).toUpperCase())+'</span><div><b>'+esc(maskUser(x.user))+'</b><div class="uc-st">'+"★★★★★".slice(0,n)+"☆☆☆☆☆".slice(0,5-n)+'</div></div></div><div class="uc-p">'+esc(x.produk||"")+'</div>'+(x.teks?'<div class="uc-t">“'+esc(x.teks)+'”</div>':'')+'<div class="uc-d">'+esc(x.sumber||"Shopee")+' · '+esc(x.tgl||"")+'</div></div>';
  }).join("");
}
renderUlasan();

// ===== Firebase Firestore (aktif kalau firebase-config.js sudah diisi) =====
var FB=null;
function fbInit(){
  if(typeof FIREBASE_CONFIG==="undefined"||!FIREBASE_CONFIG||!FIREBASE_CONFIG.apiKey)return Promise.resolve(null);
  if(FB)return FB;
  FB=Promise.all([
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
    import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js")
  ]).then(function(m){
    var app=m[0].initializeApp(FIREBASE_CONFIG);
    return {db:m[1].getFirestore(app),f:m[1]};
  }).catch(function(e){console.warn("Firebase tidak aktif:",e);return null});
  return FB;
}
function fbAdd(col,data){
  return fbInit().then(function(x){
    if(!x)return;
    data.waktu=x.f.serverTimestamp();
    return x.f.addDoc(x.f.collection(x.db,col),data);
  }).catch(function(e){console.warn("Gagal simpan ke Firebase:",e)});
}
function loadCatatan(){
  fbInit().then(function(x){
    if(!x)return;
    var q=x.f.query(x.f.collection(x.db,"catatan"),x.f.where("tampil","==",true),x.f.limit(20));
    return x.f.getDocs(q).then(function(s){
      var arr=[];
      s.forEach(function(doc){
        var v=doc.data(),ms=v.waktu&&v.waktu.toMillis?v.waktu.toMillis():0;
        arr.push({nama:v.nama||"",jenis:v.jenis||"Checkout",waktu:ms?tgl(ms):"",t:ms});
      });
      arr.sort(function(a,b){return b.t-a.t});
      if(arr.length)renderAkt(arr.concat((typeof AKTIVITAS!=="undefined"&&AKTIVITAS)||[]));
    });
  }).catch(function(e){console.warn("Catatan Firebase gagal dimuat:",e)});
}
loadCatatan();
