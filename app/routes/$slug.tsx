import * as React from "react";
import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import PagesDefaultContent from "../components/content/PagesDefaultContent";
import cmsClient from "../utils/cmsClient";
import { gql } from "graphql-request";

export const loader: LoaderFunction = async ({ params, request }) => {
  const globalNavQuery = gql`
    query MyQuery($siteId: [QueryArgument]!, $slug: [String!]) {
      entry(siteId: $siteId, slug: $slug) {
        ... on portfolioPages_default_Entry {
          id
          fieldPortfolioContent {
            ... on fieldPortfolioContent_typeTextMedia_BlockType {
              __typename
              id
              itemText
              itemMedia {
                ... on imagesPortfolio_Asset {
                  id
                  title
                  fieldPortfolioDefaultImgOpt {
                    srcsetWebp
                    srcset
                    src
                    placeholderImage
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const queryParams = {
    slug: params.slug,
    siteId: [3],
  };

  const data = await cmsClient.request(globalNavQuery, queryParams);

  return json(
    {
      data,
      slug: params.slug,
    },
    { status: 200, headers: { "cache-control": "no-cache" } }
  );
};

export default function Slug() {
  const loaderData = useLoaderData();
  let content;

  React.useEffect(() => {
    console.log("content use effect");
  }, []);

  switch (loaderData.data.entry.__typename) {
    default:
      content = <PagesDefaultContent loaderData={loaderData} />;
      break;
  }
  return <>{content}</>;
}
