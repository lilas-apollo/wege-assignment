"use client";
import SkeletonProduct from "@/components/SkeletonProduct";
import { useProduct } from "@/hooks/useProduct";
import { ArrowBigLeft, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCartStore } from "@/store/cart";

export default function ProductPage() {
  const params = useParams();
  const { id } = params;
  const { data: product, isLoading, isError } = useProduct(String(id) || "");
  const addItem = useCartStore((state) => state.addItem);

  if (isLoading)
    return (
      <div className="p-6">
        <SkeletonProduct />
      </div>
    );
  if (isError || !product)
    return (
      <div className="p-6 text-center text-gray-500">Product not found</div>
    );

  return (
    <div className="max-w-full sm:p-10 p-2 m-auto">
      <div className="flex items-center gap-4 mb-4">
        <Link
          href={"/"}
          className="transition-transform duration-200 transform origin-center hover:scale-125"
        >
          <ArrowBigLeft />
        </Link>
        <h1 className="text-3xl font-bold ">{product.title}</h1>
      </div>
      <div className="w-full gap-6 ">
        {product.image && (
          <div className="w-full sm:h-[460px] h-[300px] relative mb-6">
            <Image
              src={product.image}
              alt={product.title}
              className=" object-cover rounded-lg"
              fill
            />
          </div>
        )}
        <div className="flex gap-3 w-full justify-start items-center mt-4 mb-6  md:text-[15px] text-[13px]">
          <Link className="hover:text-violet-600" href={"/"}>
            {" "}
            Home
          </Link>
          <svg
            width="17"
            height="14"
            viewBox="0 0 17 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="rotate-180"
          >
            <path
              d="M8.46094 6.08594L13.7734 0.773438C14.1641 0.382813 14.75 0.382813 15.1016 0.773438L16 1.63281C16.3516 2.02344 16.3516 2.60938 16 2.96094L12.2109 6.71094L16 10.5C16.3516 10.8516 16.3516 11.4375 16 11.8281L15.1016 12.7266C14.75 13.0781 14.1641 13.0781 13.7734 12.7266L8.46094 7.41406C8.10938 7.02344 8.10938 6.4375 8.46094 6.08594ZM0.960938 7.41406C0.609375 7.02344 0.609375 6.4375 0.960938 6.08594L6.27344 0.773438C6.66406 0.382813 7.25 0.382813 7.60156 0.773438L8.5 1.63281C8.85156 2.02344 8.85156 2.60938 8.5 2.96094L4.71094 6.75L8.5 10.5C8.85156 10.8516 8.85156 11.4766 8.5 11.8281L7.60156 12.7266C7.25 13.0781 6.66406 13.0781 6.27344 12.7266L0.960938 7.41406Z"
              fill="#7E76BD"
            />
          </svg>
          <p>{product.title}</p>
        </div>

        <div className=" space-y-3">
          <p className="text-gray-700">{product.description}</p>
          <p className="font-semibold text-xl">Price: ${product.price}</p>
          {product.category && (
            <p className="text-sm text-gray-500">
              Category: {product.category}
            </p>
          )}
          {/* ADD TO CART BUTTON */}
          <button
            type="button"
            onClick={() => {
              addItem(product);
            }}
            className="sm:px-8 px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white flex items-center justify-center cursor-pointer"
            aria-label="Add to cart"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}
