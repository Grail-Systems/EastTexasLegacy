/* East Texas Legacy: the treasure hunt and field journal. Nov. 22, 2026.
   Twelve treasures sit beside real passages on twelve story pages. Tap one and it goes in
   your field journal (journal.html), kept only in this browser. Nothing is sent anywhere.
   Every journal line is copied word for word from the page it sits on.
   Everything here is extra: if this file fails, every page still reads in full. */
(function(){
if(window.ETLHunt)return;
var d=document,KEY='etl-hunt-1';
var I={
 word:'<path d="M4 5h16v10H9l-5 4z"/><path d="M8 9h8M8 12h5"/>',
 bell:'<path d="M6 16v-5a6 6 0 0112 0v5l1.5 2h-15z"/><path d="M10 20a2 2 0 004 0M12 3v2"/>',
 drop:'<path d="M12 3c3 5 6 8 6 11a6 6 0 01-12 0c0-3 3-6 6-11z"/>',
 sack:'<path d="M9 4h6l-1.5 3c3 1.5 5 5 5 8.5 0 3-2.5 4.5-6.5 4.5s-6.5-1.5-6.5-4.5c0-3.5 2-7 5-8.5z"/><path d="M10 7h4"/>',
 tree:'<path d="M12 21v-6"/><path d="M12 15c-5 0-7-3-6-6s4-5 6-6c2 1 5 3 6 6s-1 6-6 6z"/>',
 gavel:'<path d="M13 4l7 7M10 7l7 7M11.5 5.5l-5 5 2.5 2.5 5-5M7.8 11.8L3 16.5 5 18.5l4.8-4.7M12 21h8"/>',
 ring:'<path d="M12 3v4"/><circle cx="12" cy="13" r="6"/>',
 stone:'<path d="M7 21V9a5 5 0 0110 0v12z"/><path d="M5 21h14M12 10v6M10 12h4"/>',
 flower:'<circle cx="12" cy="6.5" r="2.4"/><circle cx="15.5" cy="10" r="2.4"/><circle cx="12" cy="13.5" r="2.4"/><circle cx="8.5" cy="10" r="2.4"/><path d="M12 16v5"/>',
 jar:'<path d="M7 3h10v3H7z"/><path d="M7.5 6v1.5A2 2 0 006 9.5V19a2 2 0 002 2h8a2 2 0 002-2V9.5a2 2 0 00-1.5-2V6"/><path d="M9 13h6"/>',
 leaf:'<path d="M5 19c0-9 6-14 14-14 0 8-5 14-14 14z"/><path d="M5 19l8-8"/>',
 boat:'<path d="M3 15h18l-2 4H5z"/><path d="M6 15v-4h10v4M9 11V6h2v5M14 11V8"/>'
};
/* id, page, section id, name, icon, line (verbatim from the page), clue (where to look) */
var L=[
 {id:'tejas',p:'roots.html',s:'caddo',n:'The word that named Texas',i:'word',
  x:'The Caddo word táyshaʼ meant “friend” or “ally.” The Spanish wrote it down as Tejas.',
  c:'Start at the very first ring of the county’s story, where the Caddo built their mounds.'},
 {id:'bell',p:'county-history.html',s:'churches',n:'The $13.60 bell',i:'bell',
  x:'Ryan Chapel ordered its bell from Montgomery Ward in 1907 for $13.60. It rang for services, for emergencies and when a grave needed digging.',
  c:'In the county history, listen for a church bell that came from a catalog.'},
 {id:'tar',p:'county-history.html',s:'oil',n:'The oil at Tar Spring',i:'drop',
  x:'Oil seeps were fairly common here when settlers arrived. They used the oil to grease wagon wheels and harness.',
  c:'Still in the county history: look for oil coming up out of a spring.'},
 {id:'sack',p:'black-heritage.html',s:'hackney',n:'George Hackney’s flour sack',i:'sack',
  x:'He left with what he owned in a flour sack. He settled in Lufkin anyway, bought land and town lots, ran a boarding house, and met the night trains to see travelers safely to their beds.',
  c:'Among the families who built the county, find the man who met the night trains.'},
 {id:'blackgum',p:'oak-flat.html',s:'oakflat',n:'The black gum tree',i:'tree',
  x:'Winnie’s grandfather, Eli Russell, farmed a field there, and in that field stood a black gum tree.',
  c:'Go to Oak Flat and find the tree that named a book.'},
 {id:'auction',p:'huntington.html',s:'auction',n:'A town lot, sold at auction',i:'gavel',
  x:'On June 22 they auctioned the lots. Hundreds of buyers came, and the county history says there was plenty of liquor and a few fistfights by the tracks.',
  c:'In Huntington, find the summer day the whole town went to the highest bidder.'},
 {id:'ring',p:'old-ways.html',s:'ring',n:'The iron ring',i:'ring',
  x:'Winnie Graham’s grandfather, Eli Russell of Oak Flat, won one. Then he gave his prize to a different girl than the one he’d marry, which made Leah jealous.',
  c:'Among the old Piney Woods ways, ride hard at a Saturday tournament.'},
 {id:'graves',p:'lost-to-the-lake.html',s:'graves',n:'The graves that stayed',i:'stone',
  x:'Federal relocation records could show which graves were moved and which were left behind. Those records can be requested.',
  c:'Under the lake, look for what didn’t move.'},
 {id:'rosier',p:'heroes.html',s:'rosier',n:'Mr. Big Thicket’s flowers',i:'flower',
  x:'He hunted flowers. He’d wander the Thicket for days, and with no formal schooling he came to know just about every plant in it.',
  c:'Among the heroes, find the man who hunted flowers instead of game.'},
 {id:'mayhaw',p:'recipes.html',s:'mayhaw',n:'A jar of mayhaw jelly',i:'jar',
  x:'They bloom white in late winter and drop ripe fruit in spring, often right into the water, where folks scoop them up with sieves.',
  c:'At the table, find the taste that belongs to Deep East Texas.'},
 {id:'file',p:'wild-foods.html',s:'sassafras',n:'A pinch of filé',i:'leaf',
  x:'Its dried, ground young leaves are filé powder, the seasoning and thickener stirred into gumbo after it comes off the heat.',
  c:'In the wild foods, find the tree whose leaves go in the gumbo.'},
 {id:'laura',p:'water-record.html',s:'river',n:'The steamboat Laura',i:'boat',
  x:'The Laura ran from Brown’s Ferry in Angelina County to Sabine Pass.',
  c:'In the water record, find the days when the Angelina carried boats.'}
];
function icon(k,cls){return '<svg class="'+(cls||'')+'" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'+I[k]+'</svg>'}
function load(){try{var v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v:[]}catch(e){return[]}}
function save(a){try{localStorage.setItem(KEY,JSON.stringify(a))}catch(e){}}
function found(){var a=load();return L.filter(function(t){return a.indexOf(t.id)>-1}).map(function(t){return t.id})}
function add(id){var a=load();if(a.indexOf(id)<0){a.push(id);save(a)}return found().length}
function norm(s){return (s||'').replace(/\s+/g,' ').trim()}
window.ETLHunt={list:L,found:found,icon:icon,clear:function(){save([])}};

/* styles */
var css='.hunt-tok{display:inline-flex;align-items:center;justify-content:center;width:2.1rem;height:2.1rem;margin:0 0 0 .45rem;vertical-align:middle;border-radius:50%;border:1.5px solid #B08A3E;background:radial-gradient(circle at 35% 30%,#F6E7BF,#D9B867 70%,#B08A3E);color:#5B4316;cursor:pointer;padding:0;box-shadow:0 0 0 0 rgba(217,184,103,.7);animation:huntglow 2.6s ease-in-out infinite}'+
'.hunt-tok svg{width:1.2rem;height:1.2rem}.hunt-tok:focus-visible{outline:3px solid #2F5D3A;outline-offset:2px}'+
'.hunt-tok.got{animation:none;background:#E9E4D6;border-color:#9A9384;color:#6B6557}'+
'@keyframes huntglow{0%,100%{box-shadow:0 0 0 0 rgba(217,184,103,0)}50%{box-shadow:0 0 0 7px rgba(217,184,103,.35)}}'+
'@media (prefers-reduced-motion:reduce){.hunt-tok{animation:none}}'+
'.hunt-toast{position:fixed;left:.8rem;right:.8rem;bottom:4.8rem;margin:0 auto;z-index:9999;max-width:30rem;background:#1F3A28;color:#F7F3EA;border-radius:10px;padding:1rem 1.2rem;box-shadow:0 10px 30px rgba(0,0,0,.35);font:1rem/1.45 "Source Sans 3",system-ui,sans-serif;display:flex;gap:.9rem;align-items:flex-start}'+
'.hunt-toast .ic{flex:none;width:2.6rem;height:2.6rem;border-radius:50%;background:radial-gradient(circle at 35% 30%,#F6E7BF,#D9B867 70%,#B08A3E);color:#5B4316;display:flex;align-items:center;justify-content:center}.hunt-toast .ic svg{width:1.5rem;height:1.5rem}'+
'.hunt-toast b{display:block;font-size:1.08rem}.hunt-toast a{color:#F6E7BF;font-weight:700}.hunt-toast button{background:none;border:0;color:#F7F3EA;font-size:1.4rem;line-height:1;cursor:pointer;margin-left:auto;padding:0 .2rem}'+
'.hunt-line{margin:.9rem 0 0;padding-top:.8rem;border-top:1px dashed currentColor;opacity:.92;font-size:1rem}.hunt-line a{font-weight:700}';
var st=d.createElement('style');st.textContent=css;d.head.appendChild(st);

function toast(t,n){var old=d.querySelector('.hunt-toast');if(old)old.remove();
 var b=d.createElement('div');b.className='hunt-toast';b.setAttribute('role','status');
 var done=n>=L.length;
 b.innerHTML='<span class="ic">'+icon(t.i)+'</span><div><b>You found '+t.n.replace(/^The /,'the ').replace(/^A /,'a ')+'.</b>'+
  (done?'That’s all '+L.length+'. You walked the whole trail! <a href="journal.html">Open your field journal</a>':'Your <a href="journal.html">field journal</a>: '+n+' of '+L.length+'.')+
  '</div><button type="button" aria-label="Close">×</button>';
 d.body.appendChild(b);b.querySelector('button').onclick=function(){b.remove()};
 setTimeout(function(){if(b.parentNode)b.remove()},9000)}

/* place this page's treasures */
var page=(location.pathname.split('/').pop()||'index.html');if(!/\./.test(page))page+='.html';
L.forEach(function(t){if(t.p!==page)return;var sec=d.getElementById(t.s);if(!sec)return;
 var key=norm(t.x).slice(0,40),el=null;
 [].some.call(sec.querySelectorAll('p,li,dd'),function(e){if(norm(e.textContent).indexOf(key)>-1){el=e;return true}});
 if(!el)return;
 var got=found().indexOf(t.id)>-1,btn=d.createElement('button');btn.type='button';btn.className='hunt-tok'+(got?' got':'');
 btn.setAttribute('aria-label',got?'Treasure already in your field journal: '+t.n:'Hidden treasure. Tap to add it to your field journal.');
 btn.title=got?'In your field journal':'A treasure! Tap to keep it.';btn.innerHTML=icon(t.i);
 btn.addEventListener('click',function(){var n=add(t.id);btn.classList.add('got');btn.title='In your field journal';btn.setAttribute('aria-label','Treasure already in your field journal: '+t.n);toast(t,n)});
 el.appendChild(btn)});

/* a field-journal line on the 'Next on the trail' card */
if(page!=='journal.html'){var tries=0,iv=setInterval(function(){var c=d.querySelector('.trail-next');
 if(c&&!c.querySelector('.hunt-line')){clearInterval(iv);var n=found().length,p=d.createElement('p');p.className='hunt-line';
  p.innerHTML=n?('Field journal: '+n+' of '+L.length+' treasures found. <a href="journal.html">Open it</a>'):(L.length+' treasures are hidden on these pages. Look for the gold seal. <a href="journal.html">Start your field journal</a>');
  c.appendChild(p)}
 if(++tries>40)clearInterval(iv)},150)}
})();
