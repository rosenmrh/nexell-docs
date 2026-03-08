/* Nexell Dox — Phone Ofuscation (anti-scraping)
 * El numero se reconstruye en el DOM via JS.
 * Bots que parsean HTML crudo no lo encuentran.
 * Google Bot ejecuta JS → SEO intacto.
 */
(function(){
  var _p=['491','585','672','34'];
  var _n=_p[3]+_p[2]+_p[1]+_p[0];
  var telFull='+'+_n;
  var telDisplay=_n.substring(2,5)+' '+_n.substring(5,8)+' '+_n.substring(8);
  var waUrl='https://wa.me/'+_n+'?text='+encodeURIComponent('Hola, necesito información sobre legalización de instalaciones');
  window._ndxTelDisplay=telDisplay;
  document.querySelectorAll('[data-ndx-tel]').forEach(function(el){
    var t=el.getAttribute('data-ndx-tel');
    if(t==='link'){el.href='tel:'+telFull;el.textContent=telDisplay;}
    else if(t==='link-full'){el.href='tel:'+telFull;el.textContent=telFull;}
    else if(t==='text'){el.textContent=telDisplay;}
    else if(t==='wa'){el.href=waUrl;}
    else if(t==='call-bar'){el.href='tel:'+telFull;}
  });
  var s=document.querySelector('script[type="application/ld+json"]');
  if(s){try{var d=JSON.parse(s.textContent);d.telephone=telFull;s.textContent=JSON.stringify(d);}catch(e){}}
})();
