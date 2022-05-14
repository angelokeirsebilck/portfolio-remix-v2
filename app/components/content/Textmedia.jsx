import React from "react";
import BlurredImage from "../base/BlurredImage";
import { Image } from "../base/Image";
// import parse from "html-react-parser";
import Container from "../base/Container";

const getSizes = () => {
  return "(max-width: 375px) 342px, (max-width: 640px) 607px, (max-width: 768px) 720px, (max-width: 1024px) 475px, (max-width: 1280px) 603px, 732px";
};

const Textmedia = ({ content }) => {
  return (
    <Container>
      <div className="grid md:grid-cols-2 gap-10">
        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: content.itemText }}
        />
        {/* <div className="">
          <BlurredImage
            srcsetWebp={
              content.itemMedia[0].fieldPortfolioDefaultImgOpt.srcsetWebp
            }
            srcsetJpeg={content.itemMedia[0].fieldPortfolioDefaultImgOpt.srcset}
            alt={content.itemMedia[0].title}
            placeholder={
              content.itemMedia[0].fieldPortfolioDefaultImgOpt.placeholderImage
            }
            sizes={getSizes()}
          />
        </div> */}
        <Image
          key={`id${content.itemMedia[0].fieldPortfolioDefaultImgOpt.placeholderImage}`}
          blurDataUrl={
            content.itemMedia[0].fieldPortfolioDefaultImgOpt.placeholderImage
          }
          className="aspect-h-4 aspect-w-3 md:aspect-w-3 md:aspect-h-2"
          img={
            <picture className="">
              <source
                srcSet={
                  content.itemMedia[0].fieldPortfolioDefaultImgOpt.srcsetWebp
                }
                sizes={getSizes()}
                type="image/webp"
              />
              <img
                key={
                  content.itemMedia[0].fieldPortfolioDefaultImgOpt
                    .placeholderImage
                }
                srcSet={content.itemMedia[0].fieldPortfolioDefaultImgOpt.srcset}
                alt={content.itemMedia[0].title}
                sizes={getSizes()}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </picture>
          }
        />
      </div>
    </Container>
  );
};

export default Textmedia;
