/* East Texas Legacy: "Next on the trail" cards. Nov. 22, 2026.
   Adds a photo teaser for the next story at the end of each page, plus two related links.
   Everything here is extra: if this file fails, every page still reads in full.
   Every teaser line is drawn from text already published on the page it points to. */
(function(){
var d=document;
var P={
 'tour.html':{t:'Take the tour',img:'img/hist/hc-diboll-mill-aerial-1903.jpg',hook:'Deep East Texas, one photo at a time. Made to watch together on a big screen.'},
 'roots.html':{t:'Deep East Texas, ring by ring',img:'img/hist/mission-tejas.jpg',hook:'From the Caddo mounds to the Big Thicket, told one ring at a time.'},
 'county-history.html':{t:'A courthouse on the move',img:'img/hist/hc-log-train-1907.jpg',hook:'Four county seats, steamboats on the Angelina, and the county that voted against secession, 184 to 139.'},
 'black-heritage.html':{t:'The families who built the county',img:'img/hist/hc-hg-temple-band-1955.jpg',hook:'George Hackney, Square Long, Long Chapel, Dunbar High School and the people whose work built the first mills.'},
 'oak-flat.html':{t:'Under the black gum tree',img:'img/fam/fam-dale-russell.jpg',hook:'165 years of one Piney Woods family at Oak Flat near Huntington.'},
 'family-research.html':{t:'Is your family in the book?',img:'img/fam/fam-snowdens.jpg',hook:'The 1976 county history profiles the families who settled here before about 1910. Type a surname and check.'},
 'huntington.html':{t:'Huntington',img:'img/hist/hc-rockland-trestle.jpg',hook:'The railroad came through, and Huntington was laid out in a single summer, its lots sold to the highest bidder.'},
 'old-ways.html':{t:'Piney Woods ways',img:'img/hist/hc-fastrill-mule-1928.jpg',pos:'50% 8%',hook:'Riding the Ring, party lines, dog-trot houses, cane syrup and shape notes.'},
 'lost-to-the-lake.html':{t:'Lost to the lake',img:'img/hist/paddlers.jpg',hook:'Sam Rayburn Reservoir sits on top of a community, family farms and graves that didn’t move.'},
 'candy-man.html':{t:'The Candy Man and the lake',img:'img/hist/hc-neches-mist.jpg',hook:'In August 1973, police dug in the pines near Lake Sam Rayburn. One of the victims still has no name.'},
 'heroes.html':{t:'The ones who stood up for this place',img:'img/hero-rosier.jpg',pos:'50% 40%',hook:'Lady Bird Johnson, Lance Rosier and the neighbors who wouldn’t quit.'},
 'recipes.html':{t:'Put it on the table',img:'img/mayhaw-jelly.jpg',pos:'50% 75%',hook:'Mayhaw jelly, skillet cornbread, fried catfish, hushpuppies and chicken and dumplings.'},
 'wild-foods.html':{t:'Wild foods of the Piney Woods',img:'img/plants/persimmon.jpg',hook:'Mayhaws, muscadines, persimmons and pawpaws, with the poisonous look-alike for every one.'},
 'events.html':{t:'What’s coming up',img:'img/hist/hc-timberland-theater-1942.jpg',hook:'Festivals, parades and gatherings around Deep East Texas, each linked to its source.'},
 'share.html':{t:'Your family’s turn',img:'img/hist/hc-fastrill-berries-1935.jpg',pos:'50% 4%',hook:'Add a story, a recipe, a recording or a photo, so our grandchildren have it too.'},
 'library.html':{t:'The library',img:'img/hist/hc-fastrill-marker-2000.jpg',hook:'Every report, record, filing and news story behind our work, with a note on what each one says.'},
 'who-decides.html':{t:'Who decides the route',img:'img/hist/hc-hewt-neches-bridge-1910.jpg',hook:'Railroads, paper mills and highways remade the county. Here is who made those calls.'},
 'water.html':{t:'The water fight',img:'img/hist/cypress-knees.jpg',hook:'They want the water. We want it in writing.'},
 'water-record.html':{t:'The water record',img:'img/hist/boykin-creek.jpg',hook:'From a water-powered mill on Mill Creek to Sam Rayburn Reservoir: how our water was used, stored and sold.'},
 'water-history.html':{t:'We’ve watched our water drop before',img:'img/hist/hc-rocky-shoals-2009.jpg',hook:'State reports measured our water dropping nearly 500 feet, and recovering when the mill cut back.'},
 'good-water.html':{t:'Leave the good water for the people',img:'img/hist/neches-canoe.jpg',hook:'Lufkin already owns river and lake water it bought for industry in 2009.'},
 'drawdown.html':{t:'What one big straw does',img:'img/hist/hc-angelina-river-2012.jpg',hook:'Pick a pumping rate and watch the water level drop around a big new well, year by year.'},
 'projects.html':{t:'Seven big projects',img:'img/hist/hc-aldridge-ruins.jpg',hook:'Two data centers, two gas plants, a solar farm and two battery sites are lined up for Angelina County.'},
 'your-say.html':{t:'Where you get a say',img:'img/hist/hc-lufkin-depot-1959.jpg',hook:'Four public bodies have a hand in what happens here, and every one of them answers to you.'},
 'pineywoods-rules.html':{t:'They heard you. Then they passed it anyway.',img:'img/hist/longleaf.jpg',hook:'What the Pineywoods groundwater district passed on Nov. 9, 2026, after hours of opposition.'},
 'mill-creek.html':{t:'Mill Creek',img:'img/hist/boykin-creek.jpg',hook:'Sewage spills, a fish kill and what the state let the City do with its fine.'},
 'donate.html':{t:'Keep the receipts coming',img:'img/hist/hc-commissary-1903.jpg',hook:'Every record on these pages was paid for. Help keep the requests, the maps and the meetings going.'},
 'everything.html':{t:'Everything, in one place',img:'img/hist/mission-tejas.jpg',hook:'Every story, photo, recipe and record on the site. Pick a door.'}
};
/* page: [next, related, related] */
var T={
 'roots.html':['county-history.html','oak-flat.html','heroes.html'],
 'county-history.html':['black-heritage.html','huntington.html','lost-to-the-lake.html'],
 'black-heritage.html':['oak-flat.html','family-research.html','county-history.html'],
 'oak-flat.html':['family-research.html','huntington.html','recipes.html'],
 'family-research.html':['huntington.html','oak-flat.html','share.html'],
 'huntington.html':['old-ways.html','oak-flat.html','county-history.html'],
 'old-ways.html':['lost-to-the-lake.html','recipes.html','wild-foods.html'],
 'lost-to-the-lake.html':['candy-man.html','water-record.html','county-history.html'],
 'candy-man.html':['heroes.html','lost-to-the-lake.html','share.html'],
 'heroes.html':['recipes.html','roots.html','water.html'],
 'recipes.html':['wild-foods.html','old-ways.html','share.html'],
 'wild-foods.html':['share.html','recipes.html','heroes.html'],
 'events.html':['share.html','recipes.html','your-say.html'],
 'share.html':['tour.html','family-research.html','everything.html'],
 'library.html':['everything.html','water-record.html','county-history.html'],
 'who-decides.html':['your-say.html','county-history.html','water-record.html'],
 'water.html':['water-record.html','your-say.html','projects.html'],
 'water-record.html':['water-history.html','lost-to-the-lake.html','mill-creek.html'],
 'water-history.html':['good-water.html','drawdown.html','water-record.html'],
 'good-water.html':['drawdown.html','projects.html','your-say.html'],
 'drawdown.html':['projects.html','water-history.html','good-water.html'],
 'projects.html':['your-say.html','water.html','pineywoods-rules.html'],
 'your-say.html':['pineywoods-rules.html','projects.html','events.html'],
 'pineywoods-rules.html':['donate.html','your-say.html','water.html'],
 'mill-creek.html':['water-history.html','water-record.html','your-say.html'],
 '1606-lufkin.html':['projects.html','your-say.html','water.html']
};
var page=(location.pathname.split('/').pop()||'index.html');
var row=T[page]; if(!row||d.querySelector('.trail-next'))return;
var esc=function(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')};
var nx=P[row[0]]; if(!nx)return;
var css='.trail-next{max-width:1000px;margin:3rem auto 2.5rem;padding:0 1.5rem;font-family:"Source Sans 3",system-ui,sans-serif}'+
 '.trail-next .lbl{font-size:.78rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--mayhaw,#9B2335);margin:0 0 .7rem}'+
 '.trail-next a.go{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);text-decoration:none;color:#F4F1EA;background:#12201A;border-radius:10px;overflow:hidden;min-height:220px;box-shadow:0 18px 40px -24px rgba(0,0,0,.6);transition:transform .25s ease}'+
 '.trail-next a.go:hover,.trail-next a.go:focus-visible{transform:translateY(-3px)}'+
 '.trail-next .ph{position:relative;overflow:hidden}.trail-next .ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 25%;transition:transform 6s ease}'+
 '.trail-next a.go:hover .ph img{transform:scale(1.06)}'+
 '.trail-next .tx{padding:1.6rem 1.7rem;display:flex;flex-direction:column;justify-content:center}'+
 '.trail-next .tx small{color:#FDE68A;font-weight:700;letter-spacing:.12em;text-transform:uppercase;font-size:.75rem}'+
 '.trail-next .tx b{font-family:"Playfair Display",Georgia,serif;font-size:clamp(1.4rem,2.6vw,2rem);line-height:1.15;margin:.4rem 0 .6rem;color:#fff}'+
 '.trail-next .tx span{color:#D9D4C8;font-size:1.05rem;line-height:1.5}'+
 '.trail-next .tx em{margin-top:1rem;font-style:normal;font-weight:700;color:#FDE68A}'+
 '.trail-next .more{display:flex;flex-wrap:wrap;gap:.5rem .6rem;margin-top:.9rem;align-items:center;font-size:.95rem}'+
 '.trail-next .more a{border:1px solid rgba(127,127,127,.4);border-radius:999px;padding:.35rem .85rem;text-decoration:none;font-weight:600}'+
 '@media (max-width:700px){.trail-next a.go{grid-template-columns:1fr}.trail-next .ph{aspect-ratio:16/9}}'+
 '@media (prefers-reduced-motion:reduce){.trail-next a.go,.trail-next .ph img{transition:none}.trail-next a.go:hover{transform:none}}';
var st=d.createElement('style');st.textContent=css;d.head.appendChild(st);
var box=d.createElement('section');box.className='trail-next';box.setAttribute('aria-label','Next on the trail');
var h='<p class="lbl">Next on the trail</p><a class="go" href="'+esc(row[0])+'"><span class="ph"><img src="'+esc(nx.img)+'" alt="" loading="lazy"'+(nx.pos?' style="object-position:'+esc(nx.pos)+'"':'')+'></span>'+
 '<span class="tx"><small>Up next</small><b>'+esc(nx.t)+'</b><span>'+esc(nx.hook)+'</span><em>Keep going &rarr;</em></span></a><div class="more"><span>Or try:</span>';
row.slice(1).forEach(function(p){if(P[p])h+='<a href="'+esc(p)+'">'+esc(P[p].t)+'</a>'});
h+='<a href="everything.html">All pages</a></div>';
box.innerHTML=h;
var foot=d.querySelector('.atlas-foot')||d.querySelector('body>footer');
if(foot)foot.before(box);else d.body.appendChild(box);
})();
