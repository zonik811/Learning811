// ==========================================
// 🔴 POKÉDEX MEJORADA - DÍA 10
// JavaScript consolidado para módulos 2 y 3
// ==========================================

// ========== BASE DE DATOS ==========
const pokemonDatabase = [
  { id: 1, nombre: 'Pikachu', tipo: 'Eléctrico', hp: 35, ataque: 55 },
  { id: 4, nombre: 'Charizard', tipo: 'Fuego', hp: 78, ataque: 84 },
  { id: 7, nombre: 'Blastoise', tipo: 'Agua', hp: 79, ataque: 83 },
  { id: 25, nombre: 'Bulbasaur', tipo: 'Planta', hp: 45, ataque: 49 },
  { id: 22, nombre: 'Fearow', tipo: 'Volador', hp: 65, ataque: 90 }
];

// ========== VARIABLES GLOBALES ==========
let pokemonActual = [...pokemonDatabase];
let favoritos = JSON.parse(localStorage.getItem('pokemonFavoritos')) || [];

// ========== RETO 1: RENDERIZAR POKÉMON ==========
function renderizarPokemon(pokemonArray = pokemonActual, gridId = 'pokemonGrid') {
  const grid = document.getElementById(gridId);
  if (!grid) return;
  
  if (!pokemonArray || pokemonArray.length === 0) {
    grid.innerHTML = '<div class="empty-message">No hay Pokémon para mostrar</div>';
    actualizarEstadisticas();
    return;
  }

  grid.innerHTML = pokemonArray.map(pokemon => `
    <div class="pokemon-card" onclick="abrirModal(${pokemon.id})">
      <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
      <h2>${pokemon.nombre}</h2>
      <span class="pokemon-type">${pokemon.tipo}</span>
      <div class="pokemon-stats">
        <div class="stat">HP: ${pokemon.hp}</div>
        <div class="stat">ATK: ${pokemon.ataque}</div>
      </div>
      <button class="btn-favorite ${favoritos.includes(pokemon.id) ? 'active' : ''}" 
              onclick="event.stopPropagation(); toggleFavorito(${pokemon.id})">
        ${favoritos.includes(pokemon.id) ? '⭐' : '☆'}
      </button>
    </div>
  `).join('');
  
  actualizarEstadisticas();
}

// ========== RETO 2: BÚSQUEDA EN TIEMPO REAL ==========
function setupBusqueda(inputId = 'searchInput') {
  const searchInput = document.getElementById(inputId);
  if (!searchInput) return;
  
  searchInput.addEventListener('input', function() {
    const busqueda = this.value.toLowerCase();
    pokemonActual = pokemonDatabase.filter(pokemon => 
      pokemon.nombre.toLowerCase().includes(busqueda)
    );
    renderizarPokemon();
  });
}

// ========== RETO 4: ORDENAR A-Z ==========
function sortAZ() {
  pokemonActual.sort((a, b) => a.nombre.localeCompare(b.nombre));
  renderizarPokemon();
}

// ========== RETO 5: ORDENAR POR ATAQUE ==========
function sortAtaque() {
  pokemonActual.sort((a, b) => b.ataque - a.ataque);
  renderizarPokemon();
}

// ========== RETO 6: MOSTRAR SOLO FAVORITOS ==========
function showFavorites() {
  pokemonActual = pokemonDatabase.filter(pokemon => 
    favoritos.includes(pokemon.id)
  );
  renderizarPokemon();
}

// ========== RETO 7: GUARDAR/QUITAR FAVORITOS ==========
function toggleFavorito(id) {
  const index = favoritos.indexOf(id);
  
  if (index > -1) {
    favoritos.splice(index, 1);
  } else {
    favoritos.push(id);
  }
  
  localStorage.setItem('pokemonFavoritos', JSON.stringify(favoritos));
  renderizarPokemon();
}

// ========== RETO 8: MODAL INTERACTIVO ==========
function abrirModal(id) {
  const pokemon = pokemonDatabase.find(p => p.id === id);
  const modal = document.getElementById('detailModal');
  
  if (!modal || !pokemon) return;
  
  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-modal" onclick="closeModal()">✕</button>
      <div class="pokemon-id">#${String(pokemon.id).padStart(3, '0')}</div>
      <h2>${pokemon.nombre}</h2>
      <span class="pokemon-type">${pokemon.tipo}</span>
      <div class="pokemon-stats" style="margin-top: 20px;">
        <div class="stat">HP: ${pokemon.hp}</div>
        <div class="stat">Ataque: ${pokemon.ataque}</div>
      </div>
      <button class="btn btn-primary" style="margin-top: 20px;" onclick="toggleFavorito(${pokemon.id}); abrirModal(${pokemon.id})">
        ${favoritos.includes(pokemon.id) ? '⭐ Quitar de Favoritos' : '☆ Agregar a Favoritos'}
      </button>
    </div>
  `;
  
  modal.classList.add('active');
}

function closeModal() {
  const modal = document.getElementById('detailModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

// ========== RETO 9: RESETEAR FILTROS ==========
function resetFilters() {
  pokemonActual = [...pokemonDatabase];
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';
  renderizarPokemon();
}

// ========== RETO 10: MOSTRAR TODOS ==========
function showAll() {
  pokemonActual = [...pokemonDatabase];
  renderizarPokemon();
}

// ========== RETO 11: ESTADÍSTICAS EN VIVO ==========
function actualizarEstadisticas() {
  const totalElem = document.getElementById('totalPokemon');
  const foundElem = document.getElementById('foundPokemon');
  const favElem = document.getElementById('favoritesCount');
  
  if (totalElem) totalElem.textContent = pokemonDatabase.length;
  if (foundElem) foundElem.textContent = pokemonActual.length;
  if (favElem) favElem.textContent = favoritos.length;
}

// ========== UTILIDADES ==========
function copyCode(button) {
  const codeElement = button.closest('.code-wrapper').querySelector('code');
  const text = codeElement.textContent;
  
  navigator.clipboard.writeText(text).then(() => {
    const originalText = button.textContent;
    button.textContent = '✅ ¡Copiado!';
    button.classList.add('copied');
    
    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove('copied');
    }, 2000);
  });
}

function toggleSolution(header) {
  const content = header.nextElementSibling;
  const toggle = header.querySelector('.solution-toggle');
  
  if (content && toggle) {
    content.classList.toggle('show');
    toggle.classList.toggle('show');
  }
}

// ========== EJECUTORES DE RETOS (MÓDULO 2) ==========
function ejecutarReto1() {
  renderizarPokemon(pokemonDatabase, 'pokemonGrid1');
}

function ejecutarReto2() {
  renderizarPokemon(pokemonDatabase, 'pokemonGrid2');
  setupBusqueda('searchInput2');
}

function ejecutarReto3() {
  const container = document.getElementById('activeFilters3');
  if (!container) return;
  
  const filtros = { 'Búsqueda': 'pikachu', 'Tipo': 'Eléctrico' };
  
  container.innerHTML = Object.entries(filtros)
    .filter(([key, value]) => value)
    .map(([key, value]) => `
      <div style="background: rgba(102,126,234,0.2); padding: 8px 12px; border-radius: 20px; font-size: 0.9rem;">
        <strong>${key}:</strong> ${value}
      </div>
    `).join('');
}

function ejecutarReto4() {
  let temp = [...pokemonDatabase];
  temp.sort((a, b) => a.nombre.localeCompare(b.nombre));
  renderizarPokemon(temp, 'pokemonGrid4');
}

// ========== INICIALIZACIÓN ==========
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('pokemonGrid')) {
    renderizarPokemon();
  }
  
  setupBusqueda('searchInput');
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeModal();
  });
  
  const modal = document.getElementById('detailModal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
});