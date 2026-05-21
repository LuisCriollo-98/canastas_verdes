import Link from "next/link";
import { Leaf, Truck, Shield, ChevronRight, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-white">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-green-600 via-green-600 to-green-600 overflow-hidden">
        {/* dot pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* decorative blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full -translate-y-48 translate-x-48 opacity-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-300 rounded-full translate-y-40 -translate-x-40 opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-screen-xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* copy */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Del campo a tu mesa
            </h1>
            <p className="text-green-100 text-lg sm:text-xl leading-relaxed mb-10 max-w-lg">
              Descubre la mejor selección de frutas y verduras orgánicas,
              cosechadas directamente por agricultores locales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/1"
                className="inline-flex items-center justify-center gap-2 bg-green-400 hover:bg-green-300 text-green-900 font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-lg hover:shadow-green-400/25"
              >
                Explorar Tienda
                <ChevronRight className="w-5 h-5" />
              </Link>
              <a
                href="#nosotros"
                className="inline-flex items-center justify-center gap-2 border-2 border-green-300 text-green-100 hover:bg-green-800/50 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200"
              >
                Conocer más
              </a>
            </div>
          </div>

          {/* hero image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-green-900/50">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&q=80"
                alt="Frutas y verduras frescas"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent" />
            </div>
            
          </div>
        </div>
      </section>
      {/* ── FEATURES ─────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Nos comprometemos a llevar lo mejor del campo directo a
              tu hogar con calidad y frescura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Leaf className="w-7 h-7 text-green-600" />,
                bg: "bg-green-100",
                title: "Productos Frescos",
                desc: "Cosechados el mismo día de la entrega. Garantizamos la máxima frescura y sabor en cada uno de nuestros productos.",
              },
              {
                icon: <Truck className="w-7 h-7 text-blue-600" />,
                bg: "bg-blue-100",
                title: "Directo de las Fincas",
                desc: "Trabajamos directamente con agricultores locales de confianza, eliminando intermediarios y apoyando la economía campesina.",
              },
              {
                icon: <Shield className="w-7 h-7 text-yellow-600" />,
                bg: "bg-yellow-100",
                title: "Calidad Garantizada",
                desc: "Cada producto pasa por un riguroso control de calidad. Si no estás satisfecho, te lo reemplazamos sin preguntas.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-5`}
                >
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {f.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ─────────────────────────────────────────── */}
      <section id="nosotros" className="py-20 bg-white scroll-mt-16">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=700&q=80"
                alt="Agricultores locales"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mt-3 mb-6">
              Conectando el campo
              <br />
              con tu hogar
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5">
              Canastas Verdes nació en 2019 con una misión clara: acercar los
              productos del campo colombiano a las mesas de las familias urbanas.
              Creemos que todos merecen acceso a alimentos frescos, sanos y de
              calidad.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8">
              Trabajamos de la mano con más de 20 fincas certificadas en
              diferentes municipios, garantizando trazabilidad, buenas prácticas
              agrícolas y comercio justo para los agricultores. Cada compra que
              realizas apoya directamente a una familia campesina colombiana.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="py-20 bg-green-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-gray-500 text-lg">
              Simple, rápido y conveniente.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              {
                step: "1",
                emoji: "🛒",
                title: "Escoge tus productos",
                desc: "Navega por nuestra amplia selección de frutas y verduras frescas organizadas por categorías.",
              },
              {
                step: "2",
                emoji: "🧺",
                title: "Arma tu canasta",
                desc: "Agrega los productos que deseas a tu carrito. Ajusta las cantidades a tu medida.",
              },
              {
                step: "3",
                emoji: "🚚",
                title: "Recíbelo en casa",
                desc: "Procesamos tu pedido y lo entregamos fresco directamente en la puerta de tu hogar.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 bg-white rounded-full shadow-md flex items-center justify-center text-4xl">
                    {s.emoji}
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 bg-green-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {s.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {s.title}
                </h3>
                <p className="text-gray-500 leading-relaxed max-w-xs mx-auto">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-green-600 text-white text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            ¿Listo para comer más fresco?
          </h2>
          <p className="text-green-100 text-lg mb-10">
            Únete a cientos de familias que ya disfrutan de productos frescos y
            orgánicos directo del campo.
          </p>
          <Link
            href="/1"
            className="inline-flex items-center gap-2 bg-white text-green-800 hover:bg-green-50 font-bold px-10 py-4 rounded-full text-lg transition-all duration-200 shadow-lg"
          >
            Ir a la Tienda
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-extrabold text-xl mb-3">
              Canastas Verdes
            </h3>
            <p className="text-sm leading-relaxed">
              Frutas y verduras frescas, directas del campo a tu hogar. Calidad
              y sostenibilidad en cada canasta.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Navegación</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/home"
                  className="hover:text-green-400 transition-colors"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/1"
                  className="hover:text-green-400 transition-colors"
                >
                  Tienda
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-green-400 transition-colors"
                >
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="hover:text-green-400 transition-colors"
                >
                  Registrarse
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li> Pasto, Nariño</li>
              <li> prueba@correo.com</li>
              <li> 300 123 4567</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs">
          © 2026 Canastas Verdes. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
