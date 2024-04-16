import Loader from "@/components/Loader";

function loading() {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <Loader />
    </div>
  );
}

export default loading;
