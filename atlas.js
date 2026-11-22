/* East Texas Legacy: "atlas" finish layer. Nov. 20, 2026. Everything here is extra:
   if this file fails, every page still reads in full. */
{
const d=document,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS='http://www.w3.org/2000/svg';

/* a pine treeline, the same every time */
const treePath=()=>{let s=7,x=0,p='M0 56V42';const r=(a,b)=>{s=(s*9301+49297)%233280;return a+Math.floor(s/233280*(b-a+1))};
  while(x<1440){const w=r(10,18),h=r(14,34),base=r(36,46);p+=`L${x+w/2} ${base-h}L${x+w} ${base}`;x+=w}return p+'V56Z'};
const trees=(fill,cls)=>{const v=d.createElementNS(NS,'svg');v.setAttribute('viewBox','0 0 1440 56');v.setAttribute('preserveAspectRatio','xMidYMax slice');
  v.setAttribute('aria-hidden','true');v.setAttribute('class',cls);v.innerHTML=`<path d="${treePath()}" fill="${fill}"/>`;return v};
const bg=el=>{let c=getComputedStyle(el).backgroundColor;return(!c||c==='rgba(0, 0, 0, 0)'||c==='transparent')?'#F7F3EA':c};

/* 0. "All pages" link in every page's main menu (Nov. 22, 2026) */
{const nav=d.querySelector('.top nav, nav[aria-label="Main"], header nav');
 if(nav&&!nav.querySelector('a[href$="everything.html"]')){const a=d.createElement('a');a.href='everything.html';a.textContent='All pages';a.className='atlas-all';
  if(/everything\.html$/.test(location.pathname))a.setAttribute('aria-current','page');nav.appendChild(a);}
 else if(!nav&&!d.querySelector('a.atlas-all')){const home=d.querySelector('body>.top a[href="./"], body>div:first-child a[href="./"]');
  if(home){const a=d.createElement('a');a.href='everything.html';a.textContent='All pages';a.className='atlas-all';
   a.style.cssText='margin-left:1.1rem;font-weight:600;text-decoration:none;color:'+getComputedStyle(home).color;home.after(a);}}}

/* 1. hero plates: slow zoom and a treeline edge */
const hero=d.querySelector('.hero');
if(hero){
  const img=hero.querySelector(':scope>img');
  if(img&&!reduce)img.classList.add('atlas-burns');
  hero.classList.add('atlas-tl');
  hero.appendChild(trees(bg(d.body),'atlas-trees'));
}

/* 2. treeline over the footer */
const foot=d.querySelector('body>footer');
if(foot&&!foot.previousElementSibling?.classList?.contains('atlas-foot')){
  const t=trees(bg(foot),'atlas-foot');t.style.background=bg(d.body);foot.before(t);
}

/* 3. the river line: how far down the page you are */
const river=d.createElement('div');river.className='atlas-river';
const top=d.querySelector('header.top');
if(top&&getComputedStyle(top).position!=='static'){top.appendChild(river)}else{river.classList.add('fixed');d.body.appendChild(river)}

/* 4. chapter rail on wide screens, from the page's own table of contents */
const toc=[...d.querySelectorAll('nav.toc a[href^="#"]')].filter(a=>d.getElementById(a.getAttribute('href').slice(1)));
let railItems=[],railTargets=[];
if(toc.length>2){
  const rail=d.createElement('nav');rail.className='atlas-rail';rail.setAttribute('aria-label','Chapters');
  rail.innerHTML='<ol>'+toc.map(a=>`<li><a href="${a.getAttribute('href')}">${a.textContent}</a></li>`).join('')+'</ol>';
  d.body.appendChild(rail);railItems=[...rail.querySelectorAll('li')];railTargets=toc.map(a=>d.getElementById(a.getAttribute('href').slice(1)));
}

/* 5. a big first letter on the page's opening story */
const storyPage=/\/(black-heritage|county-history|family-research|huntington|lost-to-the-lake|oak-flat|old-ways|roots|water-record|who-decides|heroes|recipes)(\.html)?$/.test(location.pathname);
const first=storyPage&&[...d.querySelectorAll('main section p, main p')].find(p=>!p.className&&p.textContent.trim().length>180&&!p.closest('aside,.card,figure,.vs,.facts'));
if(first&&/^[A-Z]/.test(first.textContent.trim()))first.classList.add('atlas-drop');

/* 6. sections ease in as you reach them */
if(!reduce&&'IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');io.unobserve(e.target)}}),{threshold:.08});
  d.querySelectorAll('main>section').forEach(s=>{if(s.getBoundingClientRect().top>innerHeight){s.classList.add('atlas-reveal');io.observe(s)}});
}

const railEl=d.querySelector('.atlas-rail');
const onScroll=()=>{
  if(railEl){const hb=hero?hero.getBoundingClientRect().bottom:0,last=railTargets[railTargets.length-1];const lb=last?last.getBoundingClientRect().bottom:1;railEl.style.visibility=(hb<60&&lb>0)?'visible':'hidden'}
  const h=d.documentElement.scrollHeight-innerHeight;river.style.transform=`scaleX(${h>0?Math.min(1,scrollY/h):0})`;
  if(railItems.length){let a=0;railTargets.forEach((t,i)=>{if(t.getBoundingClientRect().top<innerHeight*.4)a=i});railItems.forEach((l,i)=>l.classList.toggle('on',i===a))}
};
addEventListener('scroll',onScroll,{passive:true});onScroll();

/* 7. the courthouse road (county history, four county seats) */
const seats=d.getElementById('seats');
if(seats){
  const cards=[...seats.querySelectorAll('article.card')];
  const card=t=>cards.find(c=>c.querySelector('h3')?.textContent.trim()===t);
  const intro=seats.querySelector('.lead')||seats.querySelector('p:not(.eyebrow)');
  const S=[
    {x:310,y:385,yr:'1846',name:'Shawnee Prairie',h:'A blanket over a log',body:intro},
    {x:165,y:255,yr:'1847',name:'Marion',cards:['Court in the wrong house']},
    {x:300,y:170,yr:'1857',name:'Jonesville',cards:['No quorum, no deal']},
    {x:430,y:236,yr:'1858',name:'Homer',cards:['The recount','The courthouse fire']},
    {x:330,y:88,yr:'1892',name:'Lufkin',cards:['Lufkin wins']}
  ];
  if(S.every(s=>s.body||s.cards.every(card))){
    const road=d.createElement('div');road.className='atlas-road';
    road.innerHTML=`<div class="atlas-map"><svg viewBox="0 0 640 460" role="group" aria-label="The courthouse's road, five stops">
      <g class="ct"><path d="M40 80c120-40 220 20 320-10s170-40 250 0"/><path d="M30 150c140-30 240 30 340 0s160-30 240 10"/><path d="M20 330c120 20 230-30 330 0s170 30 270-10"/><path d="M40 400c110 20 220-20 320 0s160 20 250-10"/></g>
      <path class="rv" d="M625 20C590 110 615 200 575 280S600 400 590 450"/><path class="rv" d="M40 30C90 120 60 220 120 300S170 420 140 450"/>
      <path class="rd" d="M310 385C250 330 185 300 165 240S240 150 300 170 390 265 430 236 380 120 330 88"/>
      ${S.map((p,i)=>`<g class="atlas-stop" tabindex="0" role="button" data-i="${i}" aria-label="${p.yr}, ${p.name}"><circle cx="${p.x}" cy="${p.y}" r="11"/><text x="${p.x+17}" y="${p.y-2}">${p.name}</text><text class="y" x="${p.x+17}" y="${p.y+18}">${p.yr}</text></g>`).join('')}
    </svg><div class="sk">A sketch, not a survey: the stops are in order, not drawn to scale. Tap a stop.</div></div>
    <div class="atlas-panel" aria-live="polite"></div>`;
    const panel=road.querySelector('.atlas-panel'),stops=[...road.querySelectorAll('.atlas-stop')];
    const part=c=>{const h=c.querySelector('h3'),ps=[...c.querySelectorAll('p')].map(p=>p.outerHTML).join(''),src=c.querySelector('.src');return `<h3>${h.innerHTML}</h3>${ps}${src?src.outerHTML:''}`};
    let cur=0;
    const show=i=>{cur=(i+S.length)%S.length;const p=S[cur];
      const inner=p.body?`<h3>${p.h}</h3><p>${(p.body.textContent.match(/[^.]+\.[^.]*?(?=\s[A-Z]|$)/g)||[p.body.textContent]).slice(0,2).join(' ').replace(/\s+/g,' ').trim()}</p>`:p.cards.map((t,k)=>`<div class="${k?'more':''}">${part(card(t))}</div>`).join('');
      panel.innerHTML=`<div class="yr">${p.yr}</div>${inner}<nav><button type="button" data-d="-1">Back</button><button type="button" data-d="1">Next stop</button></nav>`;
      stops.forEach((s,k)=>s.classList.toggle('on',k===cur))};
    road.addEventListener('click',e=>{const s=e.target.closest('.atlas-stop');if(s)show(+s.dataset.i);const b=e.target.closest('button[data-d]');if(b)show(cur+ +b.dataset.d)});
    road.addEventListener('keydown',e=>{const s=e.target.closest('.atlas-stop');if(s&&(e.key==='Enter'||e.key===' ')){e.preventDefault();show(+s.dataset.i)}});
    const grid=seats.querySelector('.cards');
    S.forEach(p=>p.cards&&p.cards.forEach(t=>card(t).classList.add('atlas-moved')));
    (intro||grid).insertAdjacentElement(intro?'afterend':'beforebegin',road);
    show(0);
  }
}

/* 9. 'Next on the trail' cards (Nov. 22, 2026) */
{if(!d.querySelector('script[src$="trail.js"]')){const t=d.createElement('script');t.src='/trail.js';t.defer=true;d.head.appendChild(t);}}

/* 10. the treasure hunt and field journal (Nov. 22, 2026) */
{if(!window.ETLHunt&&!d.querySelector('script[src$="hunt.js"]')){const t=d.createElement('script');t.src='/hunt.js';t.defer=true;d.head.appendChild(t);}}
}
