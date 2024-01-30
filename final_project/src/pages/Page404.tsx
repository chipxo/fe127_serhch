import img_404 from "../assets/img_404.png";

const Page404 = () => {
  return (
    <div className="grid min-h-[69.3vh] place-items-center">
      <div className="relative grid place-items-center">
        <h2 className="text-center text-4xl font-bold text-accent">
          Page wasn't wound :(
        </h2>
        <img
          src={img_404}
          className="h-5/6 w-5/6"
          alt="Page was't found image"
        />
      </div>
    </div>
  );
};

export default Page404;
