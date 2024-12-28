import { Header } from "../components/Layout/Header";
import { LuShoppingCart } from "react-icons/lu";
import { Search } from "../components/UI/Search";
import { headerInfo } from "../utils/headerInfo";

export default function Sale() {
  return (
    <div className="pb-12 h-[100vh] max-w-[95%]">
      <Header
        caption={headerInfo.Sale.caption}
        title={headerInfo.Sale.title}
        namePage={headerInfo.Sale.namePage}
      >
        <LuShoppingCart className="text-4xl" />
      </Header>
      <Search placeholder='numero de ticket o fecha' />
    </div>
  );
}
