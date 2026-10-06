// Catálogo de categorías y productos BMX
const CATEGORIES = [
  { 
    slug: "cuadros", 
    name: "Cuadros", 
    imagen: "../assets/images/productos/cuadro1.jpg",
    products: [
      { id: "1", name: "Cuadro Wethepeople", price: 225.000, description: "descripcion", imagenes: ["../assets/images/productos/cuadro_wethepeople1.jpg"], isNew: true },
      { id: "2", name: "Cuadro Federal", price: 250.000, description: "descripcion", imagenes: ["../assets/images/productos/cuadro_federal1.jpg"] },
      { id: "3", name: "Cuadro Fiend", price: 210.000, description: "descripcion", imagenes: ["../assets/images/productos/cuadro_fiend1.jpg"] },
    ]
  },
  { 
    slug: "horquillas", 
    name: "Horquillas", 
    imagen: "../assets/images/productos/horquilla1.jpg",
    products: [
      { id: "1", name: "Horquilla Kink", price: 180.000, description: "descripcion", imagenes: ["../assets/images/productos/horquilla_kink1.jpg"], isNew: true },
      { id: "2", name: "Horquilla Rígida", price: 120.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Horquilla BMX", price: 95.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "volantes", 
    name: "Volantes", 
    imagen: "../assets/images/productos/volante1.jpg",
    products: [
      { id: "1", name: "Volante Kink", price: 89.000, description: "descripcion", imagenes: ["../assets/images/productos/volante_kink1.jpg"] },
      { id: "2", name: "Volante Street", price: 85.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Volante Básico", price: 60.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "stems", 
    name: "Stems", 
    imagen: "../assets/images/productos/stem1.jpg",
    products: [
      { id: "1", name: "Stem Colony", price: 65.000, description: "descripcion", imagenes: ["../assets/images/productos/stem_colony1.jpg"], isNew: true },
      { id: "2", name: "Stem Front Load", price: 75.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Stem Adjustable", price: 90.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },

    ]
  },
  { 
    slug: "headsets", 
    name: "Headsets", 
    imagen: "../assets/images/productos/headset1.jpg",
    products: [
      { id: "1", name: "Headset FitBikeCO", price: 39.000, description: "descripcion", imagenes: ["../assets/images/productos/headset_fitbikeco1.jpg"] },
      { id: "2", name: "Headset Estándar", price: 55.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Headset Presición", price: 95000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "palancas", 
    name: "Palancas",
    imagen: "../assets/images/productos/palancas1.jpg",
    products: [
      { id: "1", name: "Palanca Kink", price: 140.000, description: "descripcion", imagenes: ["../assets/images/productos/palancas_kink1.jpg"] },
      { id: "2", name: "Palanca 175mm", price: 145000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Palanca 165mm", price: 135000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "pedales", 
    name: "Pedales",
    imagen: "../assets/images/productos/pedales1.jpg",
    products: [
      { id: "1", name: "Pedales Kink", price: 25.000, description: "descripcion", imagenes: ["../assets/images/productos/pedales_kink1.jpg"], isNew: true },
      { id: "2", name: "Pedal Street", price: 65000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Pedal Básico", price: 45000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "plato", 
    name: "Platos",
    imagen: "../assets/images/productos/plato1.jpg",
    products: [
      { id: "1", name: "Plato Cult 25T", price: 45.000, description: "descripcion", imagenes: ["../assets/images/productos/plato_cult1.jpg"] },
      { id: "2", name: "Plato 36T", price: 70.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Plato 28T", price: 65.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "bottom-brackets", 
    name: "Bottom Brackets",
    imagen: "../assets/images/productos/bottom_brackets1.jpg",
    products: [
      { id: "1", name: "Bottom Bracket Kink", price: 35.000, description: "descripcion", imagenes: ["../assets/images/productos/bb_kink1.jpg"] },
      { id: "2", name: "BB Estándar", price: 60.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "BB Premium", price: 110.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "cadenas", 
    name: "Cadenas",
    imagen: "../assets/images/productos/cadena1.jpg",
    products: [
      { id: "1", name: "Cadena Merrit", price: 35.000, description: "descripcion", imagenes: ["../assets/images/productos/cadena_merrit1.jpg"] },
      { id: "2", name: "Cadena Estándar", price: 25.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Cadena Básica", price: 18.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "mazas-delanteras", 
    name: "Mazas delanteras",
    imagen: "../assets/images/productos/maza_delantera1.jpg",
    products: [
      { id: "1", name: "Maza Delantera Cinema", price: 55.000, description: "descripcion", imagenes: ["../assets/images/productos/md_cinema1.jpg"] },
      { id: "2", name: "Maza Delantera Sport", price: 180.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Maza Delantera Básica", price: 140.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "mazas-traseras", 
    name: "Mazas traseras",
    imagen: "../assets/images/productos/maza_trasera1.jpg",
    products: [
      { id: "1", name: "Maza Trasera StrangerCassette", price: 150.000, description: "descripcion", imagenes: ["../assets/images/productos/mt_stranger1.jpg"] },
      { id: "2", name: "Maza Trasera Freecoaster", price: 280.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Maza Trasera Básica", price: 160.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "aros", 
    name: "Aros",
    imagen: "../assets/images/productos/aro1.jpg",
    products: [
      { id: "1", name: "Aro Eclat 20\"", price: 50.000, description: "descripcion", imagenes: ["../assets/images/productos/aro_eclat1.jpg"] },
      { id: "2", name: "Aro 20\" Reforzado", price: 140.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Aro 20\" Básico", price: 100.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "rayos", 
    name: "Rayos",
    imagen: "../assets/images/productos/rayos1.jpg",
    products: [
      { id: "1", name: "Rayos Mission", price: 15.000, description: "descripcion", imagenes: ["../assets/images/productos/rayos_mission1.jpg"] },
      { id: "2", name: "Juego de Rayos Aligerados", price: 55.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Juego de Rayos Básico", price: 30.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "llantas", 
    name: "Llantas",
    imagen: "../assets/images/productos/llantas1.jpg",
    products: [
      { id: "1", name: "Llanta Mission 20\"", price: 30.000, description: "descripcion", imagenes: ["../assets/images/productos/llantas_mission1.jpg"] },
      { id: "2", name: "Llanta Dirt 2.3\"", price: 95.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Llanta All-Terrain", price: 85.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "tubos", 
    name: "Tubos",
    imagen: "../assets/images/productos/tubos1.jpg",
    products: [
      { id: "1", name: "Tubo Primo 20\"", price: 5.000, description: "descripcion", imagenes: ["../assets/images/productos/tubos_primo1.jpg"] },
      { id: "2", name: "Tubo 20\" Reforzado", price: 2.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Tubo 20\" Básico", price: 8.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "asientos", 
    name: "Asientos",
    imagen: "../assets/images/productos/asiento1.jpg",
    products: [
      { id: "1", name: "Asiento Federal", price: 45.000, description: "descripcion", imagenes: ["../assets/images/productos/asiento_federal1.jpg"] },
      { id: "2", name: "Asiento Sport", price: 55.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Asiento Básico", price: 40.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "postes", 
    name: "Postes de asiento",
    imagen: "../assets/images/productos/poste1.jpg",
    products: [
      { id: "1", name: "Poste Sunday", price: 15.000, description: "descripcion", imagenes: ["../assets/images/productos/poste_sunday1.jpg"] },
      { id: "2", name: "Poste Estándar", price: 60.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Poste Ligero", price: 75.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "grips", 
    name: "Grips",
    imagen: "../assets/images/productos/grips1.jpg",
    products: [
      { id: "1", name: "Grips Eclat", price: 25.000, description: "descripcion", imagenes: ["../assets/images/productos/grips_eclat1.jpg"] },
      { id: "2", name: "Grips Estándar", price: 25.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Grips Económico", price: 15.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "pegs", 
    name: "Pegs",
    imagen: "../assets/images/productos/pegs1.jpg",
    products: [
      { id: "1", name: "Peg Family Cromoly\"", price: 19.000, description: "descripcion", imagenes: ["../assets/images/productos/pegs_family1.jpg"] },
      { id: "2", name: "Peg Aluminio 4.0\"", price: 65.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Peg Básico 4.0\"", price: 40.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
  { 
    slug: "hubguards", 
    name: "Hubguards",
    imagen: "../assets/images/productos/hubguard1.jpg",
    products: [
      { id: "1", name: "Hubguard Trasero Colony", price: 11.000, description: "descripcion", imagenes: ["../assets/images/productos/hubguard_colony.jpg"] },
      { id: "2", name: "Hubguard Trasero", price: 48.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
      { id: "3", name: "Kit Completo", price: 80.000, description: "descripcion", imagenes: ["../assets/images/productos/"] },
    ]
  },
];

// Categorías de ropa (separadas de las piezas BMX)
const CLOTHES_CATEGORIES = [
  { 
    slug: "ropa", 
    name: "Ropa",
    imagen: "../assets/images/productos/ropa1.jpg",
    products: [
      { id: "1", name: "Jersey BMX Rojo", price: 45.000, description: "descripcion", imagenes: ["../assets/images/productos/jersey_rojo1.jpg"], isNew: true },
      { id: "2", name: "Pantalones BMX Negro", price: 80.000, description: "descripcion", imagenes: ["../assets/images/productos/pantalones_negro1.jpg"] },
      { id: "3", name: "Casco BMX Full Face", price: 150.000, description: "descripcion", imagenes: ["../assets/images/productos/casco_fullface1.jpg"] },
      { id: "4", name: "Guantes BMX Protección", price: 35.000, description: "descripcion", imagenes: ["../assets/images/productos/guantes1.jpg"] },
      { id: "5", name: "Calcetines BMX", price: 15.000, description: "descripcion", imagenes: ["../assets/images/productos/calcetines1.jpg"] },
      { id: "6", name: "Chaqueta BMX Impermeable", price: 120.000, description: "descripcion", imagenes: ["../assets/images/productos/chaqueta1.jpg"] },
    ]
  },
];

// Clasificación de gama aplicada directamente a los productos existentes.
[...CATEGORIES, ...CLOTHES_CATEGORIES].forEach(category => {
  category.products.forEach(product => {
    product.nivel = product.price <= 50
      ? "entrada"
      : product.price <= 150
        ? "media"
        : "alta";
  });
});

function sortProductsForDisplay(products) {
  return [...products].sort((a, b) => {
    const aNew = a.isNew ? 1 : 0;
    const bNew = b.isNew ? 1 : 0;
    if (aNew !== bNew) return bNew - aNew;
    return (a._order || 0) - (b._order || 0);
  });
}

function sortProductsByCatalog(products) {
  return sortProductsForDisplay(products.map(product => ({ ...product, _order: product._order || 0 })));
}

function getCategory(slug) { 
  const inBMX = CATEGORIES.find(c => c.slug === slug);
  const inClothes = CLOTHES_CATEGORIES.find(c => c.slug === slug);
  return inBMX || inClothes;
}

function getProduct(slug, id) { return getCategory(slug)?.products.find(p => p.id === id); }
function getQueryParam(name) { return new URLSearchParams(window.location.search).get(name); }
