import Image from "next/image";
import {
  isImageFitCover,
  isImageSlide,
  RenderSlideProps,
  SlideImage,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";

function isNextJsImage(slide: SlideImage) {
  return isImageSlide(slide) && typeof slide.width === "number" && typeof slide.height === "number";
}

export default function NextJsImage({ slide, offset, rect }: RenderSlideProps) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;
  const { height: sHeight = 100, width: sWidth = 100 } = slide ?? {};

  const width = !cover
    ? Math.round(Math.min(rect.width, (rect.height / sHeight) * sWidth))
    : rect.width;

  const height = !cover
    ? Math.round(Math.min(rect.height, (rect.width / sWidth) * sHeight))
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide.src}
        loading="lazy"
        draggable={false}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={offset === 0 ? () => click?.({ index: currentIndex }) : undefined}
      />
    </div>
  );
}
