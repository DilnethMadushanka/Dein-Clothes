import { useState, useCallback } from "react";
import AnnouncementBar from "./components/AnnouncementBar.jsx";
import Header from "./components/Header.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import CategoryRow from "./components/CategoryRow.jsx";
import FlashSale from "./components/FlashSale.jsx";
import PromoBanners from "./components/PromoBanners.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import Perks from "./components/Perks.jsx";
import Styled from "./components/Styled.jsx";
import Newsletter from "./components/Newsletter.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import QuickView from "./components/QuickView.jsx";

export default function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [wish, setWish] = useState([]);
  const [quick, setQuick] = useState(null);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");

  const add = useCallback((p, size) => {
    const key = `${p.id}-${size}`;
    setCart((c) => {
      const hit = c.find((i) => i.key === key);
      return hit ? c.map((i) => (i.key === key ? { ...i, qty: i.qty + 1 } : i)) : [...c, { ...p, key, size, qty: 1 }];
    });
    setQuick(null);
    setCartOpen(true);
  }, []);
  const setQty = useCallback(
    (key, d) => setCart((c) => c.map((i) => (i.key === key ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0)),
    []
  );
  const toggleWish = useCallback(
    (id) => setWish((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
    []
  );
  const pickCat = useCallback((c) => {
    setCat(c);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const count = cart.reduce((n, i) => n + i.qty, 0);

  return (
    <>
      <AnnouncementBar />
      <Header
        count={count}
        wishCount={wish.length}
        query={query}
        setQuery={setQuery}
        cat={cat}
        pickCat={pickCat}
        onCart={() => setCartOpen(true)}
      />
      <main>
        <HeroCarousel onPick={pickCat} />
        <CategoryRow onPick={pickCat} />
        <FlashSale wish={wish} onWish={toggleWish} onQuick={setQuick} />
        <PromoBanners onPick={pickCat} />
        <ProductGrid query={query} cat={cat} setCat={setCat} wish={wish} onWish={toggleWish} onQuick={setQuick} />
        <Perks />
        <Styled />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer open={cartOpen} items={cart} onClose={() => setCartOpen(false)} onQty={setQty} />
      <QuickView product={quick} onClose={() => setQuick(null)} onAdd={add} />
    </>
  );
}
