import { Header } from "../components/Header";
import { LuShoppingCart } from "react-icons/lu";
import { Search } from "../components/Search";
export default function Sale() {
  return (
    <div className="pb-12 h-[100vh] max-w-[95%]">
      <Header
        caption="Registra las ventas de tus productos y mantén un control eficiente de tu negocio"
        title="Bienvenido a la pantalla de ventas"
        namePage="Venta"
      >
        <LuShoppingCart className="text-4xl" />
      </Header>
      <Search placeholder='numero de ticket o fecha' />
    </div>
  );
}
