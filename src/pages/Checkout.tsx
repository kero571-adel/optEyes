import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  ShieldCheck,
  ArrowLeft,
  Check,
  MapPin,
  Clock,
  Truck,
} from "lucide-react";
import { useApp } from "../context/AppContext";

// ─── Egypt Governorates with shipping info ────────────────────────────────────
const GOVERNORATES: Record<
  string,
  { shipping: number; days: string; cities: string[] }
> = {
  Cairo: {
    shipping: 30,
    days: "1–2 business days",
    cities: [
      "Nasr City",
      "Heliopolis",
      "Maadi",
      "Zamalek",
      "New Cairo",
      "Shubra",
      "Ain Shams",
      "Other",
    ],
  },
  Giza: {
    shipping: 30,
    days: "1–2 business days",
    cities: [
      "6th of October",
      "Sheikh Zayed",
      "Dokki",
      "Mohandessin",
      "Haram",
      "Faisal",
      "Other",
    ],
  },
  Alexandria: {
    shipping: 40,
    days: "2–3 business days",
    cities: [
      "Smouha",
      "Sporting",
      "Miami",
      "Agami",
      "Montaza",
      "Sidi Bishr",
      "Other",
    ],
  },
  Qalyubia: {
    shipping: 35,
    days: "2–3 business days",
    cities: [
      "Banha",
      "Qalyub",
      "Shubra El Kheima",
      "Obour",
      "Khosous",
      "Other",
    ],
  },
  Sharqia: {
    shipping: 45,
    days: "2–3 business days",
    cities: ["Zagazig", "10th of Ramadan", "Bilbeis", "Minya Al Qamh", "Other"],
  },
  Dakahlia: {
    shipping: 45,
    days: "2–3 business days",
    cities: ["Mansoura", "Talkha", "Mit Ghamr", "Aga", "Beni Ebeid", "Other"],
  },
  Gharbia: {
    shipping: 45,
    days: "2–3 business days",
    cities: ["Tanta", "El Mahalla El Kubra", "Kafr El Zayat", "Zefta", "Other"],
  },
  Monufia: {
    shipping: 45,
    days: "2–3 business days",
    cities: ["Shebin El Kom", "Menouf", "Ashmoun", "Sadat City", "Other"],
  },
  Beheira: {
    shipping: 45,
    days: "2–3 business days",
    cities: ["Damanhur", "Kafr El Dawwar", "Rashid", "Abu Hummus", "Other"],
  },
  "Kafr El Sheikh": {
    shipping: 50,
    days: "3–4 business days",
    cities: ["Kafr El Sheikh", "Desouk", "Fuwwah", "Baltim", "Other"],
  },
  Damietta: {
    shipping: 50,
    days: "3–4 business days",
    cities: ["Damietta", "New Damietta", "Faraskur", "Other"],
  },
  "Port Said": {
    shipping: 55,
    days: "3–4 business days",
    cities: ["Port Said", "Port Fouad", "Other"],
  },
  Ismailia: {
    shipping: 50,
    days: "3–4 business days",
    cities: ["Ismailia", "Fayed", "Abu Sweir", "Other"],
  },
  Suez: {
    shipping: 55,
    days: "3–4 business days",
    cities: ["Suez", "Ain Sokhna", "Other"],
  },
  "North Sinai": {
    shipping: 70,
    days: "4–6 business days",
    cities: ["Arish", "Sheikh Zuweid", "Rafah", "Other"],
  },
  "South Sinai": {
    shipping: 75,
    days: "4–6 business days",
    cities: [
      "Sharm El Sheikh",
      "Dahab",
      "Nuweiba",
      "Taba",
      "St. Catherine",
      "Other",
    ],
  },
  "Red Sea": {
    shipping: 75,
    days: "4–6 business days",
    cities: ["Hurghada", "El Gouna", "Safaga", "Marsa Alam", "Other"],
  },
  Matrouh: {
    shipping: 75,
    days: "4–6 business days",
    cities: ["Marsa Matrouh", "Sidi Barani", "Siwa", "Other"],
  },
  Fayoum: {
    shipping: 50,
    days: "3–4 business days",
    cities: ["Fayoum", "Ibsheway", "Sinnuris", "Other"],
  },
  "Beni Suef": {
    shipping: 55,
    days: "3–4 business days",
    cities: ["Beni Suef", "Nasser", "El Wasta", "Other"],
  },
  Minya: {
    shipping: 60,
    days: "3–5 business days",
    cities: ["Minya", "Mallawi", "Abu Qurqas", "Samalut", "Other"],
  },
  Asyut: {
    shipping: 65,
    days: "3–5 business days",
    cities: ["Asyut", "Abnub", "Manfalut", "Dayrut", "Other"],
  },
  Sohag: {
    shipping: 65,
    days: "3–5 business days",
    cities: ["Sohag", "Girga", "Akhmim", "Tahta", "Other"],
  },
  Qena: {
    shipping: 70,
    days: "4–5 business days",
    cities: ["Qena", "Luxor", "Nag Hammadi", "Dishna", "Other"],
  },
  Luxor: {
    shipping: 70,
    days: "4–5 business days",
    cities: ["Luxor City", "Esna", "Armant", "Other"],
  },
  Aswan: {
    shipping: 75,
    days: "4–6 business days",
    cities: ["Aswan", "Kom Ombo", "Edfu", "Abu Simbel", "Other"],
  },
  "New Valley": {
    shipping: 80,
    days: "5–7 business days",
    cities: ["Kharga", "Dakhla", "Farafra", "Other"],
  },
};

const lensPrice: Record<string, number> = {
  "Single Vision": 0,
  Progressive: 50,
  "Blue Light": 30,
};

export default function Checkout() {
  const { cart, getCartTotal, placeOrder } = useApp();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    governorate: "",
    city: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedGov = form.governorate ? GOVERNORATES[form.governorate] : null;
  const subtotal = getCartTotal();
  const shipping = selectedGov ? selectedGov.shipping : 0;
  const grandTotal = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">🛒</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Nothing to checkout
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Add some frames to your cart first.
          </p>
          <Link
            to="/shop"
            className="px-6 py-3 bg-teal text-white font-semibold rounded-full hover:bg-teal-dark transition-colors"
          >
            Browse Frames
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    // reset city when governorate changes
    if (name === "governorate") {
      setForm((f) => ({ ...f, governorate: value, city: "" }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
    if (errors[name]) setErrors((er) => ({ ...er, [name]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    else if (!/^(\+20|0)?1[0125]\d{8}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid Egyptian mobile number";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      e.email = "Invalid email address";
    if (!form.governorate) e.governorate = "Please select your governorate";
    if (!form.city) e.city = "Please select your city";
    if (!form.address.trim()) e.address = "Detailed address is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      const orderId = placeOrder(form);
      navigate(`/order-confirmation/${orderId}`);
    }, 1500);
  };

  // ── helpers ──────────────────────────────────────────────────────────────────
  const Field = ({
    label,
    name,
    required = true,
    optional = false,
    children,
  }: {
    label: string;
    name: string;
    required?: boolean;
    optional?: boolean;
    children: React.ReactNode;
  }) => (
    <div>
      <label className="flex items-center gap-1.5 text-sm font-medium text-gray-700 mb-1.5">
        {label}
        {optional && (
          <span className="text-xs text-gray-400 font-normal">(optional)</span>
        )}
        {required && !optional && <span className="text-teal text-xs">*</span>}
      </label>
      {children}
      {errors[name] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <span>⚠</span> {errors[name]}
        </p>
      )}
    </div>
  );

  const inputCls = (name: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-none focus:ring-2 ${
      errors[name]
        ? "border-red-300 focus:ring-red-100 focus:border-red-400"
        : "border-gray-200 focus:ring-teal/20 focus:border-teal"
    }`;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/cart"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-teal mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Cart
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── LEFT: form ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal/10 text-teal text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" name="name">
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ahmed Mohamed"
                      className={inputCls("name")}
                    />
                  </Field>
                  <Field label="Phone Number" name="phone">
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      type="tel"
                      placeholder="01xxxxxxxxx"
                      className={inputCls("phone")}
                    />
                  </Field>
                  <div className="sm:col-span-2">
                    <Field
                      label="Email Address"
                      name="email"
                      optional
                      required={false}
                    >
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="ahmed@example.com"
                        className={inputCls("email")}
                      />
                    </Field>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal/10 text-teal text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  {/* Governorate */}
                  <Field label="Governorate" name="governorate">
                    <select
                      name="governorate"
                      value={form.governorate}
                      onChange={handleChange}
                      className={
                        inputCls("governorate") + " bg-white cursor-pointer"
                      }
                    >
                      <option value="">Select governorate…</option>
                      {Object.keys(GOVERNORATES)
                        .sort()
                        .map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                    </select>
                  </Field>

                  {/* Shipping badge — appears after governorate selection */}
                  {selectedGov && (
                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 bg-teal/5 border border-teal/20 rounded-xl px-4 py-2.5">
                        <Truck size={15} className="text-teal shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">Shipping cost</p>
                          <p className="text-sm font-bold text-gray-900">
                            EGP {selectedGov.shipping}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-teal/5 border border-teal/20 rounded-xl px-4 py-2.5">
                        <Clock size={15} className="text-teal shrink-0" />
                        <div>
                          <p className="text-xs text-gray-500">
                            Estimated delivery
                          </p>
                          <p className="text-sm font-bold text-gray-900">
                            {selectedGov.days}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* City — only visible after governorate */}
                  {form.governorate && (
                    <Field label="City / District" name="city">
                      <select
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className={
                          inputCls("city") + " bg-white cursor-pointer"
                        }
                      >
                        <option value="">Select city…</option>
                        {selectedGov?.cities.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </Field>
                  )}

                  {/* Detailed address */}
                  <Field label="Detailed Address" name="address">
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Street name, building number, floor, apartment…"
                      rows={3}
                      className={inputCls("address") + " resize-none"}
                    />
                  </Field>
                </div>
              </div>

              {/* Payment notice */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-teal/10 text-teal text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  Payment
                </h2>
                <div className="bg-teal/5 rounded-xl p-4 flex items-start gap-3 border border-teal/15">
                  <ShieldCheck
                    size={20}
                    className="text-teal shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Cash on Delivery
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      Pay when you receive your order. Our delivery team will
                      contact you to confirm.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: summary ── */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 shadow-sm">
                <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>

                {/* items */}
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.lensType}`}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div className="w-10 h-10 bg-gray-50 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-900 font-medium line-clamp-1 text-xs">
                          {item.product.name}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {item.lensType} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium text-gray-900 text-xs shrink-0">
                        $
                        {(
                          (item.product.price +
                            (lensPrice[item.lensType] || 0)) *
                          item.quantity
                        ).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* totals */}
                <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-teal" />
                      Shipping
                      {form.governorate && (
                        <span className="text-gray-400 text-xs">
                          ({form.governorate})
                        </span>
                      )}
                    </span>
                    <span>
                      {selectedGov ? (
                        <span className="font-medium">
                          EGP {selectedGov.shipping}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs italic">
                          select governorate
                        </span>
                      )}
                    </span>
                  </div>
                  {selectedGov && (
                    <div className="flex justify-between text-gray-400 text-xs">
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> Delivery
                      </span>
                      <span>{selectedGov.days}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                    <span>Total</span>
                    <span>
                      {grandTotal.toFixed(2)}{" "}
                      {selectedGov ? `+ EGP ${selectedGov.shipping}` : ""}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full mt-6 py-3.5 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 ${
                    submitting
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-teal hover:bg-teal-dark shadow-lg shadow-teal/20 hover:-translate-y-0.5"
                  }`}
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <Check size={18} />
                      Place Order
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
