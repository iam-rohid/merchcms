import classNames from "classnames";
import React, { HTMLAttributes } from "react";
import { Product } from "types/product.type";
import Image from "next/image";
import Link from "next/link";

export type ProductCardProps = HTMLAttributes<HTMLAnchorElement> & {
  product: Product;
  gridView?: boolean;
};
const ProductCard = ({ gridView = true, product }: ProductCardProps) => {
  return (
    <Link href={`/my-store-1/${product.id}`}>
      <a
        className={classNames(
          "bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex hover:border-gray-400 dark:hover:border-gray-500 cursor-pointer hover:z-[1] focus:z-[1] overflow-hidden",
          {
            "flex-col": gridView,
            "flex-row": !gridView,
          }
        )}
      >
        <div
          className={classNames("aspect-square relative", {
            "h-32": !gridView,
            "w-full": gridView,
          })}
        >
          <Image
            src={product.coverImage}
            alt="Product Cover Phtoo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-4 flex-1 overflow-hidden">
          <h3 className="font-semibold truncate">{product.name}</h3>
          <p className="mb-2 text-gray-500 dark:text-gray-400 truncate">
            {product.description}
          </p>
          <p className="font-semibold">$ {product.price}</p>
        </div>
      </a>
    </Link>
  );
};

export default ProductCard;
