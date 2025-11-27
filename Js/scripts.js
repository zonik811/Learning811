// ============ BASE DE DATOS ============
const pokemonDatabase = [
  { id: 1, nombre: 'Pikachu', tipo: 'Eléctrico', hp: 35, ataque: 55 },
  { id: 4, nombre: 'Charizard', tipo: 'Fuego', hp: 78, ataque: 84 },
  { id: 7, nombre: 'Blastoise', tipo: 'Agua', hp: 79, ataque: 83 },
  { id: 1, nombre: 'Pikachu', tipo: 'Eléctrico', hp: 35, ataque: 55 },
  { id: 4, nombre: 'Charizard', tipo: 'Fuego', hp: 78, ataque: 84 },
  { id: 1, nombre: 'Pikachu', tipo: 'Eléctrico', hp: 35, ataque: 55 },
  { id: 4, nombre: 'Charizard', tipo: 'Fuego', hp: 78, ataque: 84 },
  { id: 1, nombre: 'Pikachu', tipo: 'Eléctrico', hp: 35, ataque: 55 },
  { id: 4, nombre: 'Charizard', tipo: 'Fuego', hp: 78, ataque: 84 },
  { id: 1, nombre: 'Pikachu', tipo: 'Eléctrico', hp: 35, ataque: 55 },
  { id: 4, nombre: 'Charizard', tipo: 'Fuego', hp: 78, ataque: 84 },
  { id: 1, nombre: 'Pikachu', tipo: 'Eléctrico', hp: 35, ataque: 55 },
  { id: 4, nombre: 'Charizard', tipo: 'Fuego', hp: 78, ataque: 84 },
];

// ============ ESTADO ============
let pokemonActual = [...pokemonDatabase];

// ============ RENDER Y CREACIÓN DINÁMICA ============
function renderizarPokemon(pokemonArray = pokemonActual) {
  const grid = document.getElementById('pokemonGrid');
  if (!grid) return;

  // Mensaje "No encontrado"
  if (!pokemonArray.length) {
    grid.innerHTML = '<div class="empty-message" style="text-align:center; color:#b8c1ec; font-size:1.2rem; padding:40px 0;">No hay Pokémon para mostrar</div>';
    mostrarFiltrosActivos({ Búsqueda: document.querySelector('.search-bar input').value });
    return;
  }

  grid.innerHTML = pokemonArray.map(pokemon => `
    <div class="pokemon-card" style="
      background: linear-gradient(135deg, #1a1a2e, #16213e);
      border: 2px solid #667eea33; border-radius:14px; padding:20px; margin-bottom:12px; text-align:center;">
      <div class="pokemon-id" style="font-size:0.95rem; color:#a78bfa; margin-bottom:9px;">#${pokemon.id}</div>
      <h2 style="font-size:1.3rem; color:#667eea; margin:8px 0;">${pokemon.nombre}</h2>
      <span class="pokemon-type" style="background:rgba(102,126,234,0.2); padding:7px 15px; border-radius:25px; font-size:0.9rem; color:#b8c1ec;">${pokemon.tipo}</span>
      <div class="pokemon-stats" style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin:15px 0;">
        <div class="stat" style="background:rgba(102,126,234,0.13); padding:8px; border-radius:6px; color:#d1d5f0;">HP: ${pokemon.hp}</div>
        <div class="stat" style="background:rgba(102,126,234,0.13); padding:8px; border-radius:6px; color:#d1d5f0;">ATK: ${pokemon.ataque}</div>
      </div>
    </div>
  `).join('');
  mostrarFiltrosActivos({ Búsqueda: document.querySelector('.search-bar input').value });
}

// ============ BARRA BUSQUEDA Y FILTROS ============
function activarBusqueda() {
  const input = document.querySelector('.search-bar input');
  if (!input) return;
  input.addEventListener('input', function() {
    const texto = this.value.toLowerCase();
    pokemonActual = pokemonDatabase.filter(pokemon =>
      pokemon.nombre.toLowerCase().includes(texto)
    );
    renderizarPokemon();
  });
}

// ============ BOTÓN DE ORDENAR DINÁMICO ============
function crearBotonOrdenar() {
  let controles = document.querySelector('.search-bar');
  if (!document.getElementById('btnOrdenarAZ')) {
    const boton = document.createElement('button');
    boton.textContent = "Ordenar A-Z";
    boton.id = 'btnOrdenarAZ';
    boton.style = "margin-left:20px; padding:10px 18px; border-radius:8px; background:#667eea; color:#fff; border:none; font-weight:600; cursor:pointer;";
    boton.onclick = function() {
      pokemonActual = [...pokemonActual].sort((a, b) => a.nombre.localeCompare(b.nombre));
      renderizarPokemon();
    };
    controles.appendChild(boton);
  }
}

// ============ FILTROS ACTIVOS - Visibles sobre el grid ============
function mostrarFiltrosActivos(filtros) {
  let container = document.getElementById('activeFilters');
  if (!container) {
    container = document.createElement('div');
    container.id = 'activeFilters';
    container.style.cssText = "display:flex; gap:10px; margin:16px 0;";
    document.querySelector('.pokemon-grid').before(container);
  }
  container.innerHTML = Object.entries(filtros)
    .filter(([k, v]) => v && v.trim())
    .map(([k, v]) => `<div style="background:rgba(102,126,234,0.16); padding:8px 12px; border-radius:20px; font-size:1rem;"><strong>${k}:</strong> ${v}</div>`)
    .join('');
}

// ============ INICIALIZA TODO LO DINÁMICO ============
document.addEventListener('DOMContentLoaded', () => {
  crearBotonOrdenar();
  renderizarPokemon();
  activarBusqueda();
});
