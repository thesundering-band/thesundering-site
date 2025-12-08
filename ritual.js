(function(){
  // Tiny “ritual state” across pages
  const KEY = "sundering_rite_v1";

  function getState(){
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
    catch { return {}; }
  }
  function setState(s){
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  // Mark a room as “visited”
  const page = document.documentElement.getAttribute("data-page");
  if(page){
    const s = getState();
    s.visited = s.visited || {};
    s.visited[page] = true;
    s.last = page;
    setState(s);
  }

  // Render progress UI
  const el = document.querySelector("[data-rite-progress]");
  if(el){
    const s = getState();
    const visited = s.visited || {};
    const count = Object.keys(visited).length;
    el.textContent = `RITE PROGRESS: ${count}/8 SIGILS MARKED`;
  }
  
  const glyphs = [
  { id:"source", name:"THE SOURCE", icon:"assets/glyphs/source.png", hint:"All power has a mouth.", reveal:"..." },
  { id:"cabal", name:"THE CABAL", icon:"assets/glyphs/cabal.png", hint:"Hunger wearing a crown.", reveal:"..." },
  { id:"breach", name:"THE BREACH", icon:"assets/glyphs/breach.png", hint:"A door that should not open.", reveal:"..." },
  { id:"fracture", name:"THE FRACTURE", icon:"assets/glyphs/fracture.png", hint:"One world becomes many.", reveal:"..." },
  { id:"veil", name:"THE VEIL", icon:"assets/glyphs/veil.png", hint:"What watches back.", reveal:"..." },
  { id:"witness", name:"THE WITNESS", icon:"assets/glyphs/witness.png", hint:"You are part of the record.", reveal:"..." }
];

  // Secret: if they visit enough, unlock “Mirror” link (or anything)
  const secretEl = document.querySelector("[data-secret-slot]");
  if(secretEl){
    const s = getState();
    const visited = s.visited || {};
    const count = Object.keys(visited).length;
    if(count >= 5){
      secretEl.innerHTML = `<a class="btn" href="rite-the-abyss.html">
        UNSEAL: THE ABYSS <small>access granted</small>
      </a>`;
    } else {
      secretEl.innerHTML = `<span class="tagline">UNSEAL: requires 5 marked sigils.</span>`;
    }
  }
})();
