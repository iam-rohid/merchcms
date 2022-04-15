import Head from "next/head";
import React from "react";

export type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  noPrefix?: boolean;
};

const SEO = ({
  title,
  description = "",
  keywords = ["merchcms", "merch", "cms", "ecommerce"],
  noPrefix,
}: SEOProps) => {
  return (
    <Head>
      <title>
        {noPrefix ? title : `${title ? `${title} - ` : ""}MerchCMS`}
      </title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(",")} />
    </Head>
  );
};

export default SEO;
