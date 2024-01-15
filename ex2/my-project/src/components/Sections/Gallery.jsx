import { Fancybox as NativeFancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useEffect, useRef, useState } from "react";
import Button from "../common/CommonButton";
import SectionsTitle from "../common/SectionsTitle";

const img = [1, 2, 3, 4, 5];
const imgHidden = [3, 4, 5, 1, 2];

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

        {/* Title */}
        <SectionsTitle isBgDark={false} isTitle={true} text="Gallery" />
        <div className="md:photos relative z-[888] grid gap-3 sm:grid-cols-2">
        
          {/* Images */}
          {img.map((id) => (
            <a
              key={id}
              data-fancybox="gallery"
              href={`/gallery_img/gallery_${id}.png`}
              className="w-full transition hover:scale-95 hover:cursor-glass sm:max-w-full"
            >
              <img
                src={`/gallery_img/gallery_${id}.png`}
                alt={`img-${id}`}
                className="h-full w-full object-cover"
              />
            </a>
          ))}

          {/* Hidden images */}
          {hiddenImg &&
            imgHidden.map((id) => (
              <a
                key={id}
                data-fancybox="gallery"
                href={`public/gallery_img/gallery_${id}.png`}
                className="w-full transition hover:scale-105 hover:cursor-glass sm:max-w-full"
              >
                <img
                  src={`public/gallery_img/gallery_${id}.png`}
                  alt={`img-${id}`}
                  className="w-full"
                />
              </a>
            ))}
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
