import { Link } from "react-router-dom";

export default function ComingSoon() {
  return (
    <div className="patriotic-bg min-h-screen flex items-center justify-center">
      <div>
        <Link to="/">
          <img
            src="/assets/logo.svg"
            alt="Benefits Access Center"
            className="h-8 w-auto bg-white"
            loading="lazy"
          />
        </Link>
      </div>
      <h1 className="text-white text-5xl font-bold tracking-wide">
        Coming Soon
      </h1>
    </div>
  );
}
