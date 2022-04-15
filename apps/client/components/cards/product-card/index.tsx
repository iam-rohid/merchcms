import classNames from "classnames";
import React, { HTMLAttributes } from "react";
import { Product } from "types/product.type";
import Image from "next/image";

export type ProductCardProps = HTMLAttributes<HTMLAnchorElement> & {
  product: Product;
  gridView?: boolean;
};
const ProductCard = ({ gridView = true, product }: ProductCardProps) => {
  return (
    <div
      className={classNames(
        "bg-white border border-gray-200 flex hover:border-gray-400 cursor-pointer hover:z-[1] focus:z-[1]",
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
      <div className="p-4">
        <h3 className="font-semibold truncate">{product.name}</h3>
        <p className="mb-2 text-gray-600 dark:text-gray-400 truncate">
          {product.description}
        </p>
        <p className="font-semibold">$ {product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
