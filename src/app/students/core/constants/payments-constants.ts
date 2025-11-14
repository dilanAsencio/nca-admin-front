import { PaymentsCurrency } from "../enums/payments-enums";

export const currencyTypes = [
  { value: PaymentsCurrency.COP, label: "COP - Peso Colombiano" },
  { value: PaymentsCurrency.USD, label: "USD - Dólar Estadounidense" },
  { value: PaymentsCurrency.EUR, label: "EUR - Euro" },
];

export const slideVariants = {
  hidden: { x: "100%", opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.4 } },
  exit: { x: "100%", opacity: 0, transition: { type: "tween", duration: 0.3 } },
};