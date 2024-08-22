"use client";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingPage = ({ loading }: { loading: boolean }) => {
  const override = {
    display: "block",
    margin: "100px auto",
  };
  return (
    <div className="min-h-screen flex ">
    <ClipLoader
      color="#48d56f"
      cssOverride={override}
      loading={loading}
      size={100}
      aria-label="Loading Spinner"
      />
      </div>
  );
};
export default LoadingPage;
