import "animate.css";
import { useEffect, useRef, useState } from "react";
import Button from "../common/CommonButton";
import SectionsTitle from "../common/SectionsTitle";

import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const img = [1, 2, 3, 4, 5];
const imgHidden = [3, 4, 1, 5, 2];

const Gallery = (props) => {
  const [hiddenImg, setHiddenImg] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const delegate = props.delegate || "[data-fancybox]";
    const options = props.options || {};

    NativeFancybox.bind(container, delegate, { ...options, toolbar: true });

    return () => {
      NativeFancybox.unbind(container);
      NativeFancybox.close();
    };
  }, [props.delegate, props.options]);

  return (
    <section ref={containerRef} id="gallery" className="relative mt-20">
      <div className="container grid gap-y-12 text-center">
        <div>
          {/* Title */}
          <SectionsTitle isBgDark={false} isTitle={true} text={"Gallery"} />
        </div>
        <div className="md:photos relative z-[888] grid gap-3 ">
          {/* Images */}
          {img.map((id) => (
            <a
              key={id}
              data-fancybox="gallery"
              href={`public/gallery_img/gallery_${id}.png`}
              className="w-full transition hover:scale-95 hover:cursor-glass sm:max-w-full"
            >
              <img
                src={`public/gallery_img/gallery_${id}.png`}
                alt={`img-${id}`}
                className="w-full"
              />
            </a>
          ))}
        </div>
        <div className="relative">
          {/* Hidden images */}
          {hiddenImg && (
            <div className="relative -top-10 grid grid-cols-gallery-min gap-3 transition duration-1000">
              {[...imgHidden].map((id) => (
                <img
                  key={id}
                  src={`public/gallery_img/gallery_${id}.png`}
                  className="w-full transition hover:scale-105 hover:cursor-glass sm:max-w-full"
                  alt={id}
                  data-fancybox="gallery"
                />
              ))}
            </div>
          )}
        </div>
        <Button
          text={`See ${hiddenImg ? "less" : "more"}`}
          isActive={hiddenImg}
          onClick={() => setHiddenImg(!hiddenImg)}
        />
      </div>
    </section>
  );
};

export default Gallery;
