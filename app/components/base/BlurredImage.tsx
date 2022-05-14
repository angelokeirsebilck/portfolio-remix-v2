import clsx from "clsx";
import * as React from "react";

interface BlurredImageProps {
  srcsetJpeg: string;
  srcsetWebp: string;
  placeholder: string;
  sizes: string;
  alt: string;
}

function BlurredImage(props: BlurredImageProps) {
  const [visible, setVisible] = React.useState(false);
  const jsImgElRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    console.log("test");
    if (!jsImgElRef.current) return;

    if (jsImgElRef.current.complete) return;

    let current = true;
    jsImgElRef.current.addEventListener("load", () => {
      if (!jsImgElRef.current || !current) return;
      setTimeout(() => {
        setVisible(true);
      }, 0);
    });

    return () => {
      current = false;
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      <img
        src={props.placeholder}
        alt={props.alt}
        className="w-full h-full blur-lg absolute top-0 left-0 right-0 bottom-0"
      />
      <picture className="relative z-10">
        <source
          srcSet={props.srcsetWebp}
          sizes={props.sizes}
          type="image/webp"
        />
        <img
          ref={jsImgElRef}
          srcSet={props.srcsetWebp}
          alt={props.alt}
          sizes={props.sizes}
          loading="lazy"
          className={clsx("transition-opacity", { "opacity-0": !visible })}
        />
      </picture>
    </div>
  );
}

export default BlurredImage;
