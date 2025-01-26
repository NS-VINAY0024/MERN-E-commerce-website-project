import { useEffect } from "react";
import CategoryItem from "../layout/CategoryItem";
import { useProductStore } from "../store/useProductStore";
import FeaturedProducts from "../layout/FeaturedProduct";

const slides = [
  {
    href: "/product/1",
    name: "High-quality Product 1",
    imageUrl: `${import.meta.env.PUBLIC_URL}/image/01.png`,
  },
  {
    href: "/product/2",
    name: "High-quality Product 2",
    imageUrl: `${import.meta.env.PUBLIC_URL}/image/02.png`,
  },
  {
    href: "/product/3",
    name: "High-quality Product 3",
    imageUrl: `${import.meta.env.PUBLIC_URL}/image/03.png`,
  },
  {
    href: "/product/4",
    name: "High-quality Product 4",
    imageUrl: `${import.meta.env.PUBLIC_URL}/image/04.png`,
  },
  {
    href: "/product/5",
    name: "High-quality Product 5",
    imageUrl: `${import.meta.env.PUBLIC_URL}/image/05.png`,
  },
  {
    href: "/product/6",
    name: "High-quality Product 6",
    imageUrl: `${import.meta.env.PUBLIC_URL}/image/06.png`,
  },
  {
    href: "/product/7",
    name: "High-quality Product 7",
    imageUrl: `${import.meta.env.PUBLIC_URL}/image/07.png`,
  },
  {
    href: "/product/8",
    name: "High-quality Product 8",
    imageUrl: `${import.meta.env.PUBLIC_URL}/image/08.png`,
  },
];

const HomePage = ({ userName }) => {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  const discounts = [
    "• 20% Discount on all Grocery •",
    "• 30% Discount on purchase of Rs.2000 and above •",
    "• 50% discount on using Amazon Pay Later •",
    "• Flat 10% off on Payments using ICIC credit cards •",
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-yellow-300 h-4 flex items-center overflow-hidden md:h-8">
          <div className="animate-marquee whitespace-nowrap text-black font-bold text-[14px] md:text-[18px] py-2">
            {discounts.map((discount, index) => (
              <span key={index} className="mx-4">
                {discount}
              </span>
            ))}
          </div>
        </div>
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Welcome, {userName} to AGNI Smart Shopping Mart
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {slides.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>

        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}
      </div>
    </div>
  );
};
export default HomePage;
