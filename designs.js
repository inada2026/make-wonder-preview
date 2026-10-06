const motionButton=document.getElementById('motion-toggle');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
function setPaused(paused){document.body.classList.toggle('motion-paused',paused);motionButton.textContent=paused?'動きを見る':'動きを止める';motionButton.setAttribute('aria-pressed',String(paused));}
setPaused(reduced.matches);
motionButton.addEventListener('click',()=>setPaused(!document.body.classList.contains('motion-paused')));
document.getElementById('motion-replay').addEventListener('click',()=>{if(reduced.matches)return;setPaused(false);const nodes=[...document.querySelectorAll('.display-brand,.portrait,.person,.service-content,.draw-frame,.draw-frame rect')];nodes.forEach(n=>n.style.animation='none');void document.body.offsetWidth;nodes.forEach(n=>n.style.animation='');});
reduced.addEventListener('change',e=>setPaused(e.matches));
const stage=document.querySelector('.service-stage');
if(document.body.classList.contains('design-02'))stage.addEventListener('pointermove',e=>{if(reduced.matches||document.body.classList.contains('motion-paused'))return;const r=stage.getBoundingClientRect();stage.style.setProperty('--light-x',`${(e.clientX-r.left)/r.width*100}%`);stage.style.setProperty('--light-y',`${(e.clientY-r.top)/r.height*100}%`);});
