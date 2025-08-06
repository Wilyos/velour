import { useLocation, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaSearch, FaArrowRight } from "react-icons/fa";

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  // Base de datos de contenido searchable
  const searchableContent = [
    // Productos
    {
      id: 1,
      title: "Shampoo Revitalizador",
      type: "Producto",
      description: "Fórmula revitalizadora diseñada para activar la raíz y reducir la caída capilar",
      path: "/shampoo",
      section: "producto",
      keywords: ["shampoo", "revitalizador", "caída", "cabello", "raíz", "grasa", "brillo", "fuerza"]
    },
    {
      id: 2,
      title: "Tratamiento Reparador",
      type: "Producto", 
      description: "Repara el daño capilar causado por herramientas de calor como planchas, secadores",
      path: "/tratamiento",
      section: "producto",
      keywords: ["tratamiento", "reparador", "calor", "plancha", "secador", "daño", "vitaminas", "biotina"]
    },
    // Secciones de productos
    {
      id: 3,
      title: "Beneficios del Shampoo",
      type: "Sección",
      description: "Mejora fuerza y brillo capilar, mayor resistencia, protección térmica",
      path: "/shampoo#beneficios",
      section: "beneficios",
      keywords: ["beneficios", "fuerza", "brillo", "resistencia", "protección", "térmica", "disciplina"]
    },
    {
      id: 4,
      title: "Beneficios del Tratamiento",
      type: "Sección",
      description: "Reparación, protección del color, vitaminas, control de caída",
      path: "/tratamiento#beneficios", 
      section: "beneficios",
      keywords: ["beneficios", "reparación", "color", "vitaminas", "biotina", "panthenol", "caída"]
    },
    {
      id: 5,
      title: "Modo de uso - Shampoo",
      type: "Sección",
      description: "Instrucciones para aplicar correctamente el shampoo",
      path: "/shampoo#modo-uso",
      section: "instrucciones",
      keywords: ["modo", "uso", "aplicar", "masajear", "enjuagar", "instrucciones"]
    },
    {
      id: 6,
      title: "Modo de uso - Tratamiento", 
      type: "Sección",
      description: "Instrucciones para aplicar correctamente el tratamiento",
      path: "/tratamiento#modo-uso",
      section: "instrucciones",
      keywords: ["modo", "uso", "aplicar", "masajear", "dejar", "actuar", "instrucciones"]
    },
    {
      id: 7,
      title: "Ingredientes del Shampoo",
      type: "Sección",
      description: "Almidón de maíz, arroz, proteínas hidrolizadas, microalgas",
      path: "/shampoo#ingredientes",
      section: "ingredientes",
      keywords: ["ingredientes", "almidón", "maíz", "arroz", "proteínas", "microalgas", "activos"]
    },
    {
      id: 8,
      title: "Ingredientes del Tratamiento",
      type: "Sección", 
      description: "Leche de cabra, romero, embrión de pato, aceite de aloe vera, argán",
      path: "/tratamiento#ingredientes",
      section: "ingredientes",
      keywords: ["ingredientes", "leche", "cabra", "romero", "embrión", "pato", "aloe", "argán"]
    },
    {
      id: 9,
      title: "Comentarios y Reseñas",
      type: "Sección",
      description: "Opiniones y calificaciones de nuestros productos",
      path: "/shampoo#comentarios",
      section: "comentarios",
      keywords: ["comentarios", "reseñas", "opiniones", "calificaciones", "testimonios"]
    },
    {
      id: 10,
      title: "Contacto",
      type: "Página",
      description: "Formulario de contacto para consultas y pedidos",
      path: "/form",
      section: "contacto",
      keywords: ["contacto", "formulario", "consultas", "pedidos", "información"]
    },
    // Secciones generales
    {
      id: 11,
      title: "Sobre Nosotros",
      type: "Sección",
      description: "Información sobre nuestra empresa y misión",
      path: "/#nosotros",
      section: "empresa",
      keywords: ["nosotros", "empresa", "misión", "historia", "velour"]
    },
    {
      id: 12,
      title: "Síguenos en Instagram",
      type: "Sección",
      description: "Conecta con nosotros en redes sociales",
      path: "/#instagram",
      section: "redes",
      keywords: ["instagram", "redes", "sociales", "síguenos", "conecta", "ofertas"]
    }
  ];

  // Filtrar resultados basados en la query
  const filteredResults = searchableContent.filter(item => {
    const searchLower = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.keywords.some(keyword => keyword.toLowerCase().includes(searchLower))
    );
  });

  // Agrupar resultados por tipo
  const groupedResults = filteredResults.reduce((acc, item) => {
    if (!acc[item.type]) {
      acc[item.type] = [];
    }
    acc[item.type].push(item);
    return acc;
  }, {});

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Producto': return '🧴';
      case 'Sección': return '📋';
      case 'Página': return '📄';
      default: return '📝';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Producto': return 'bg-secondary text-white';
      case 'Sección': return 'bg-accent text-white';
      case 'Página': return 'bg-primary text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <>
      <Header />
      <section className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header de resultados */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FaSearch className="text-2xl text-primary" />
              <h1 className="text-3xl md:text-4xl font-semibold text-primary yanone-kaffeesatz">
                RESULTADOS DE BÚSQUEDA
              </h1>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-secondary">
              <p className="text-lg text-gray-700">
                Búsqueda para: <span className="font-semibold text-primary">"{query}"</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {filteredResults.length} resultado{filteredResults.length !== 1 ? 's' : ''} encontrado{filteredResults.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>

          {/* Resultados */}
          {filteredResults.length > 0 ? (
            <div className="space-y-8">
              {Object.entries(groupedResults).map(([type, items]) => (
                <div key={type} className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold text-primary mb-4 flex items-center gap-2">
                    <span>{getTypeIcon(type)}</span>
                    {type}s ({items.length})
                  </h2>
                  <div className="grid gap-4">
                    {items.map(item => (
                      <Link
                        key={item.id}
                        to={item.path}
                        className="group p-4 border border-gray-200 rounded-lg hover:border-secondary hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-primary group-hover:text-secondary transition-colors">
                                {item.title}
                              </h3>
                              <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(item.type)}`}>
                                {item.type}
                              </span>
                            </div>
                            <p className="text-gray-600 leading-relaxed">
                              {item.description}
                            </p>
                            <div className="mt-2">
                              <span className="text-sm text-gray-500">
                                Sección: <span className="font-medium">{item.section}</span>
                              </span>
                            </div>
                          </div>
                          <FaArrowRight className="text-gray-400 group-hover:text-secondary transition-colors ml-4 mt-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="mb-6">
                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  No se encontraron resultados
                </h2>
                <p className="text-gray-600">
                  No pudimos encontrar contenido relacionado con "{query}"
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-700 mb-3">Sugerencias de búsqueda:</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['shampoo', 'tratamiento', 'beneficios', 'ingredientes', 'modo de uso', 'contacto'].map(suggestion => (
                    <Link
                      key={suggestion}
                      to={`/search?q=${suggestion}`}
                      className="px-3 py-1 bg-secondary text-white rounded-full text-sm hover:bg-primary transition-colors"
                    >
                      {suggestion}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Botón volver */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SearchResults;
