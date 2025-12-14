import Button from "./components/Button"

const handleLogin = (e) => {
  e.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email === "admin@admin.com" && password === "admin") {
    alert("Login exitoso");
  } else {
    alert("Credenciales incorrectas");
  }
}

const Admin = () => {
  return (
    <section id="login" className="max-container flex justify-center items-center min-h-screen">
      <div className="lg:max-w-[40%] w-full flex flex-col items-center gap-5 p-5 sm:border-2 sm:border-violet-glow/30 rounded-xl shadow-glow backdrop-blur-sm bg-white/50 transition-all duration-500 hover:shadow-electric hover:scale-105">
        <h3 className="text-4xl leading-[68px] font-palanquin font-bold text-center">
          <span className="bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow bg-clip-text text-transparent"> Iniciar Sesión </span>
        </h3>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            className="input font-medium p-3 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-violet-glow/50"
            required
            id="email"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="input font-medium p-3 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-violet-glow/50"
            required
            id="password"
          />
          <div className="flex justify-center items-center w-full mt-2">
            <Button label="Entrar" fullwidth type="submit" />
          </div>
        </form>
      </div>
    </section>
  )
}

export default Admin