import { Vinyl } from "./Vinyl";
import { Logo } from "./Logo";

/**
 * Ladeanimation beim ersten Besuch: Die Platte dreht mit 33⅓ U/min, der Tonarm
 * wandert mit dem Ladefortschritt nach innen. Danach wächst die Platte auf
 * Hero-Größe und die Fläche öffnet sich von der Mitte aus.
 *
 * Läuft komplett ohne React: Markup kommt aus dem HTML, die Steuerung aus
 * `loaderScript` im <head>. So erscheint sie beim ersten Paint und blockiert
 * nichts. Ohne JavaScript, bei „Bewegung reduzieren“ und ab dem zweiten
 * Seitenaufruf pro Sitzung bleibt sie aus.
 */
export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="grooves absolute inset-[-20%] opacity-60" />
      <div className="loader-stage">
        <div className="loader-disc">
          <div className="loader-spin size-full">
            <Vinyl className="size-full" />
          </div>
          <Tonearm />
        </div>
      </div>
      <div className="loader-meta">
        <Logo className="h-9 md:h-11" />
        <p className="mt-4 flex items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
          <span>Wird aufgelegt</span>
          <span className="loader-count text-paper" />
        </p>
      </div>
    </div>
  );
}

/** Tonarm im Koordinatensystem der Platte (400 × 400). Drehpunkt bei (430, 20). */
function Tonearm() {
  return (
    <svg viewBox="0 0 400 400" className="loader-tonearm absolute inset-0 size-full overflow-visible">
      <g className="loader-arm">
        <line x1="430" y1="20" x2="430" y2="292" stroke="#f2ede4" strokeOpacity="0.85" strokeWidth="5" strokeLinecap="round" />
        <rect x="421" y="290" width="18" height="38" rx="3" fill="#d9541e" />
        <rect x="428" y="326" width="4" height="7" fill="#f2ede4" />
      </g>
      <circle cx="430" cy="20" r="20" fill="#1b1a18" stroke="#f2ede4" strokeOpacity="0.3" strokeWidth="2" />
      <circle cx="430" cy="20" r="7" fill="#f2ede4" fillOpacity="0.85" />
    </svg>
  );
}

// Tonarmwinkel: 0° = Ruheposition neben der Platte, 15,4° = äußerste Rille, 38,7° = kurz vorm Etikett
export const loaderScript = `(function(){
var d=document.documentElement;
try{
  if(sessionStorage.getItem("respin-loader")||matchMedia("(prefers-reduced-motion: reduce)").matches)return;
  sessionStorage.setItem("respin-loader","1");
}catch(e){return}
d.setAttribute("data-loader","on");
var t0=performance.now(),MIN=1100,MAX=4500,ready=false,p=0,exitAt=0,last=t0;
function set(){ready=true}
Promise.all([
  document.fonts?document.fonts.ready:0,
  new Promise(function(r){document.readyState==="complete"?r():addEventListener("load",r)})
]).then(set,set);
setTimeout(set,MAX);
function ease(x){return 1-Math.pow(1-x,3)}
function io(x){return x<0.5?4*x*x*x:1-Math.pow(2-2*x,3)/2}
function tick(now){
  var dt=Math.min(now-last,64)/1000,el=now-t0,s=d.style;last=now;
  if(!exitAt){
    var target=ready?1:Math.min(0.9,el/2200);
    p+=(target-p)*Math.min(1,dt*(ready?7:4));
    if(ready&&p>0.995&&el>=MIN){p=1;exitAt=now;d.setAttribute("data-loader","exit");setTimeout(function(){d.setAttribute("data-loader","done")},1500)}
  }
  var swing=ease(Math.min(el/450,1)),arm=swing*(15.4+p*23.3);
  if(exitAt){
    var x=Math.min(Math.max((now-exitAt-150)/1100,0),1);
    arm*=1-ease(Math.min((now-exitAt)/380,1));
    s.setProperty("--loader-hole",(io(x)*Math.hypot(innerWidth,innerHeight)).toFixed(1)+"px");
  }
  s.setProperty("--loader-arm",arm.toFixed(2)+"deg");
  s.setProperty("--loader-pct",Math.round(p*100));
  if(!exitAt||now-exitAt<1300)requestAnimationFrame(tick);
  else ["--loader-arm","--loader-pct","--loader-hole"].forEach(function(k){s.removeProperty(k)});
}
requestAnimationFrame(tick);
})();`;
