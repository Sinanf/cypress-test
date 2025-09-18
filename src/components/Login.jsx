import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = { email: "", password: "", terms: false };
const errorMessages = {
  email: "Lütfen geçerli bir email adresi giriniz.",
  password: "Şifre en az 8 karakter, 1 büyük harf ve 1 rakam içermelidir.",
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    const next = type === "checkbox" ? checked : value;
    setForm((p) => ({ ...p, [name]: next }));
  };

  useEffect(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    const passOk = /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(form.password);
    setErrors({
      email: emailOk ? "" : errorMessages.email,
      password: passOk ? "" : errorMessages.password,
    });
    setIsValid(emailOk && passOk && form.terms);
  }, [form.email, form.password, form.terms]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;
    navigate("/success");
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Email: </label>
        <input
          data-cy="form-email"
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p data-cy="error-email" style={{ color: "red" }}>
            {errors.email}
          </p>
        )}

        <label htmlFor="password">Password: </label>
        <input
          data-cy="form-password"
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <p data-cy="error-password" style={{ color: "red" }}>
            {errors.password}
          </p>
        )}

        <label style={{ display: "block", marginTop: 8 }}>
          <input
            data-cy="form-terms"
            type="checkbox"
            name="terms"
            checked={form.terms}
            onChange={handleChange}
          />
          <span style={{ marginLeft: 8 }}>
            Şartları kabul ediyorum (KVKK / GDPR)
          </span>
        </label>

        <button
          data-cy="form-submit"
          type="submit"
          disabled={!isValid}
          style={{ marginTop: 12 }}
        >
          Giriş
        </button>
      </form>
    </main>
  );
}