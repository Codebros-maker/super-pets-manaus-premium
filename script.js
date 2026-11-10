
'use strict';
document.documentElement.classList.add('js');
const $=(s,ctx=document)=>ctx.querySelector(s);
const $$=(s,ctx=document)=>Array.from(ctx.querySelectorAll(s));
const phone=document.body.dataset.phone;
const contact=(msg)=>`https://wa.me/55${phone}?text=${encodeURIComponent(msg)}`;
function openWhatsApp(msg){const a=document.createElement('a');a.href=contact(msg);a.target='_blank';a.rel='noopener noreferrer';document.body.appendChild(a);a.click();a.remove();}
let toastTimer;
function notify(text){const toast=$('#toast');if(!toast)return;toast.textContent=text;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3400)}
const menu=$('.menu-btn');const nav=$('.nav-list');
if(menu&&nav){menu.addEventListener('click',()=>{const opened=nav.classList.toggle('is-open');menu.setAttribute('aria-expanded',String(opened));menu.textContent=opened?'✕ Fechar':'☰ Menu'});$$('.nav-list a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.textContent='☰ Menu'}));}
$$('[data-contact]').forEach(el=>el.addEventListener('click',()=>{openWhatsApp(el.dataset.contact)}));
$$('[data-filter-group]').forEach(group=>{const target=group.dataset.filterGroup;const cards=$$(`[data-card-group="${target}"]`);$$('[data-filter]',group).forEach(btn=>btn.addEventListener('click',()=>{$$('[data-filter]',group).forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});const filter=btn.dataset.filter;cards.forEach(card=>{card.hidden=filter!=='Todos'&&card.dataset.category!==filter})}))});
$$('.faq-question').forEach(q=>q.addEventListener('click',()=>{const a=q.nextElementSibling;const opened=q.getAttribute('aria-expanded')==='true';q.setAttribute('aria-expanded',String(!opened));a.hidden=opened}));
const reveal=$$('.reveal');if('IntersectionObserver' in window){const obs=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in');obs.unobserve(entry.target)}})},{threshold:.05});reveal.forEach(el=>obs.observe(el))}else reveal.forEach(el=>el.classList.add('in'));
$$('img').forEach(img=>{img.addEventListener('error',()=>{img.classList.add('image-failed');const p=img.parentElement;if(p)p.classList.add('has-failed-image')})});


let selectedPet='dog';const info={dog:{title:'Tudo para acompanhar o ritmo dele.',description:'Rações, petiscos, brinquedos e acessórios para o dia a dia dos cães.',photo:'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=1000&q=85&fit=crop&auto=format',alt:'Cão, fotografia ilustrativa',query:'Olá, Super Pets! Gostaria de consultar produtos para cães (ração, petiscos e acessórios).'},cat:{title:'Um mundo feito para os felinos.',description:'Rações, areia higiênica, brinquedos e acessórios para gatos.',photo:'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=1000&q=85&fit=crop&auto=format',alt:'Gato, fotografia ilustrativa',query:'Olá, Super Pets! Gostaria de consultar produtos para gatos (ração, areia, brinquedos e acessórios).'}};
$$('[data-pet]').forEach(btn=>btn.addEventListener('click',()=>{selectedPet=btn.dataset.pet;$$('[data-pet]').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-pressed',String(b===btn))});$('#pet-reco-title').textContent=info[selectedPet].title;$('#pet-reco-desc').textContent=info[selectedPet].description;$('#pet-display-image').src=info[selectedPet].photo;$('#pet-display-image').alt=info[selectedPet].alt;}));
$('#pet-reco-contact').addEventListener('click',()=>openWhatsApp(info[selectedPet].query));
$('#pet-checklist').addEventListener('submit',e=>{e.preventDefault();const items=$$('#pet-checklist input[type="checkbox"]:checked').map(e=>e.value);if(!items.length){notify('Selecione pelo menos um item da lista.');return;}const detail=$('#pet-detail').value.trim();openWhatsApp('Olá, Super Pets! Gostaria de consultar disponibilidade e valores para:\n'+items.map(t=>'• '+t).join('\n')+(detail?'\nDetalhe: '+detail:'')+'\nObrigado!');notify('Abrindo sua lista no WhatsApp.');});
