/* In-page motion: sec-intro-04 reveal and FV glow/wipe. No logo-only opening screen. */
(()=>{
 const body=document.body, reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const animations=new Set();let observer;
 const paused=()=>reduce.matches||body.classList.contains('motion-paused');
 const glow=document.createElement('div');glow.className='motion-glow';glow.setAttribute('aria-hidden','true');document.querySelector('.service-stage').prepend(glow);
 function animate(el,frames,options={}){if(!el||paused())return;const a=el.animate(frames,{duration:750,easing:'cubic-bezier(.2,.7,.3,1)',...options});animations.add(a);a.onfinish=()=>animations.delete(a);a.oncancel=()=>animations.delete(a);return a;}
 function opening(){animate(document.querySelector('.service-content'),[{opacity:.7,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:950});}
 function stop(){[...animations].forEach(a=>a.cancel());}
 document.getElementById('motion-toggle').addEventListener('click',()=>{if(paused())stop();else opening()});
 document.getElementById('motion-replay').addEventListener('click',()=>{stop();opening()});
 reduce.addEventListener('change',()=>{if(paused())stop()});
 const reveals=document.querySelectorAll('.section .split>div,.section .work-list>a,.footer .brand');
 if('IntersectionObserver' in window){observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){observer.unobserve(entry.target);animate(entry.target,[{opacity:.25,transform:'translateY(28px)'},{opacity:1,transform:'none'}],{duration:850});}}},{threshold:.12});reveals.forEach(el=>observer.observe(el));}
 document.querySelectorAll('[data-service],#reset').forEach(b=>b.addEventListener('click',()=>{animate(document.querySelector('.service-content'),[{opacity:.7,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:650});animate(document.querySelector('.hero-scene-image'),[{opacity:.6},{opacity:1}],{duration:750});}));
 window.addEventListener('pagehide',stop);opening();
})();
