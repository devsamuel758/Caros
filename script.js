// Dados fictícios (poderiam vir de uma API futuramente)
const carros = [
  { 
    id: 1, 
    modelo: "Toyota Corolla", 
    marca: "Toyota", 
    ano: 2023, 
    combustivel: "Flex", 
    imagem: "./img/image.png",
    preco: "R$ 120.000",
    localVenda: "São Paulo, SP",
    descricao: "Sedã confiável, econômico e confortável.",
    cor: "Prata"
  },
  { 
    id: 2, 
    modelo: "Honda Civic", 
    marca: "Honda", 
    ano: 2022, 
    combustivel: "Gasolina", 
    imagem: "./img/image copy.png",
    preco: "R$ 115.000",
    localVenda: "Rio de Janeiro, RJ",
    descricao: "Sedã esportivo, design moderno e bom desempenho.",
    cor: "Preto"
  },
  { 
    id: 3, 
    modelo: "BMW i3", 
    marca: "BMW", 
    ano: 2024, 
    combustivel: "Elétrico", 
    imagem: "./img/image copy 2.png",
    preco: "R$ 250.000",
    localVenda: "Curitiba, PR",
    descricao: "Compacto elétrico premium, ideal para cidade.",
    cor: "Branco"
  },
  { 
    id: 4, 
    modelo: "Chevrolet Onix", 
    marca: "Chevrolet", 
    ano: 2021, 
    combustivel: "Flex", 
    imagem: "./img/image copy 3.png",
    preco: "R$ 75.000",
    localVenda: "Belo Horizonte, MG",
    descricao: "Hatch compacto, econômico e prático para o dia a dia.",
    cor: "Vermelho"
  }
];


// Seletores
const searchInput = document.getElementById("searchInput");
const brandFilter = document.getElementById("brandFilter");
const fuelFilter = document.getElementById("fuelFilter");
const clearBtn = document.getElementById("clearFilters");
const cardGrid = document.getElementById("cardGrid");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("modal");
const modalContent = document.getElementById("modalContent");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const yearEl = document.getElementById("year");

// Atualiza ano automaticamente
yearEl.textContent = new Date().getFullYear();

// Renderização de cards
function renderCards(lista) {
  cardGrid.innerHTML = "";

  if (lista.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  lista.forEach(car => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${car.imagem}" alt="${car.modelo}">
      <h3>${car.modelo}</h3>
      <p>${car.marca} • ${car.ano} • ${car.combustivel}</p>
      <button class="btn small" data-id="${car.id}">Detalhes</button>
    `;
    cardGrid.appendChild(card);
  });
}

// Filtro de catálogo
function filtrar() {
  const termo = searchInput.value.toLowerCase();
  const marca = brandFilter.value;
  const combustivel = fuelFilter.value;

  const resultado = carros.filter(c => {
    const matchSearch = c.modelo.toLowerCase().includes(termo) || c.marca.toLowerCase().includes(termo);
    const matchMarca = marca ? c.marca === marca : true;
    const matchCombustivel = combustivel ? c.combustivel === combustivel : true;
    return matchSearch && matchMarca && matchCombustivel;
  });

  renderCards(resultado);
}

// Eventos
searchInput.addEventListener("input", filtrar);
brandFilter.addEventListener("change", filtrar);
fuelFilter.addEventListener("change", filtrar);
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  brandFilter.value = "";
  fuelFilter.value = "";
  filtrar();
});

// Modal - abrir e fechar
cardGrid.addEventListener("click", (e) => {
  if (e.target.matches(".btn.small")) {
    const id = e.target.dataset.id;
    const car = carros.find(c => c.id == id);
    if (!car) return;

    modalContent.innerHTML = `
      <h2>${car.modelo}</h2>
      <img src="${car.imagem}" alt="${car.modelo}" style="width:100%; border-radius:8px; margin-bottom:12px;">
      <p><strong>Marca:</strong> ${car.marca}</p>
      <p><strong>Ano:</strong> ${car.ano}</p>
      <p><strong>Combustível:</strong> ${car.combustivel}</p>
    `;
    modal.setAttribute("aria-hidden", "false");
  }
});

modalBackdrop.addEventListener("click", closeModal);
modalClose.addEventListener("click", closeModal);
function closeModal() {
  modal.setAttribute("aria-hidden", "true");
}

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  renderCards(carros);
});
