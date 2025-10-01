import { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import {
  publicRegisterThunk,
  AppDispatch,
} from "@/providers/store/public-auth-store";
import Link from "next/link";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import CardMessage from "@/components/auth/CardMessage";

interface FormErrors {
  [key: string]: string;
}

export default function PublicRegisterForm() {
  const dispatch = useDispatch<AppDispatch>();

  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    acceptedPolicy: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Validaciones
  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(form.firstName)) {
      newErrors.firstName = "Ingrese un nombre válido (mínimo 2 letras).";
    }
    if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(form.lastName)) {
      newErrors.lastName = "Ingrese un apellido válido (mínimo 2 letras).";
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)
    ) {
      newErrors.email = "Ingrese un correo electrónico válido.";
    }
    if (!/^[a-zA-ZÀ-ÿ0-9\s]{2,}$/.test(form.username)) {
      newErrors.username = "Ingrese un nombre de usuario válido (mínimo 4 caracteres).";
    }
    // if (
    //   !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(form.password)
    // ) {
    //   newErrors.password =
    //     "La contraseña debe tener al menos 8 caracteres, mayúscula, minúscula, número y caracter especial.";
    // }
    // if (form.password !== form.confirmPassword) {
    //   newErrors.confirmPassword = "Las contraseñas no coinciden.";
    // }
    // if (form.address.trim().length < 5) {
    //   newErrors.address = "Ingrese una dirección válida (mínimo 5 caracteres).";
    // }
    // if (!form.city) {
    //   newErrors.city = "Seleccione una ciudad.";
    // }
    if (!/^\d{7,}$/.test(form.phone)) {
      newErrors.phone = "Ingrese un número de teléfono válido (mínimo 7 dígitos).";
    }
    if (!form.acceptedPolicy) {
      newErrors.acceptedPolicy = "Debe aceptar la política de datos.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    let value: string | boolean = "";

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    const payload = {
      username: form.username,
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      phone: form.phone,
    };

    dispatch(publicRegisterThunk(payload) as any)
      .unwrap()
      .then((resp: any) => {
        setShowSuccessMessage(true);
        setForm({
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          acceptedPolicy: false
        });
      })
      .catch(() => {
        setErrors({
          acceptedPolicy: "No se pudo registrar el usuario. Intente nuevamente.",
        });
      })
      .finally(() => {
        setIsLoading(false)
      });
  };

  if (showSuccessMessage) {
      return (
        <CardMessage
          label="¡Registro exitoso, tu cuenta está en proceso de validación y sera informado por correo!"
          labelButton="Página de inicio"
          path="/landing"
        />
      );
    }

  return (
    <div className="relative w-full flex justify-center px-4 sm:px-6 lg:px-8">
      <Link
        href="/landing"
        className="absolute top-4 left-4 bg-white rounded-full shadow-md p-2 hover:bg-gray-100 transition"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="h-5 w-5 text-gray-700" />
      </Link>
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/assets/img/logo-nexuscore.png"
            alt="logo-nexuscore"
            className="h-10 sm:h-12"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Nombres</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Nombres"
              className={`w-full border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Apellidos</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Apellidos"
              className={`w-full border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+57"
              className={`w-full border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Usuario</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="nombre de usuario"
              className={`w-full border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1">
              Crea una contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Escribe tu contraseña"
              className={`w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar contraseña"
              className={`w-full border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div> */}

          {/* 
          <div>
            <label className="block text-sm font-medium mb-1">
              Dirección de residencia
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Dirección de residencia"
              className={`w-full border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            />
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">{errors.address}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Ciudad de residencia
            </label>
            <select
              name="city"
              value={form.city}
              onChange={handleChange}
              className={`w-full border ${
                errors.city ? "border-red-500" : "border-gray-300"
              } rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400`}
            >
              <option value="" disabled hidden>
                Ciudad
              </option>
              <option value="Bogotá">Bogotá</option>
              <option value="Medellín">Medellín</option>
              <option value="Cali">Cali</option>
            </select>
            {errors.city && (
              <p className="text-red-500 text-xs mt-1">{errors.city}</p>
            )}
          </div> */}

          {/* Botón + Política */}
          <div className="flex flex-col items-center gap-2 sm:col-span-2 mt-4">
            <button
              type="submit"
              disabled={!form.acceptedPolicy || isLoading}
              className={`w-full sm:w-1/2 py-3 rounded-full text-white font-medium transition-colors ${
                form.acceptedPolicy
                  ? "bg-orange-500 hover:bg-orange-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? "Registrando..." : "Registrarse"}
            </button>

            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="acceptedPolicy"
                checked={form.acceptedPolicy}
                onChange={handleChange}
                className="accent-orange-400"
              />
              <label>Aceptar política y tratamiento de datos</label>
            </div>
            {errors.acceptedPolicy && (
              <p className="text-red-500 text-xs">{errors.acceptedPolicy}</p>
            )}
          </div>

          {/* Google & Facebook */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:col-span-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full sm:w-1/2 py-3 rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faGoogle} size="lg" /> Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full sm:w-1/2 py-3 rounded-full border border-gray-300 transition-colors hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faFacebookF}
                size="lg"
                style={{ color: "#1877F2" }}
              />
              Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
