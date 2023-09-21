import { useNavigate } from "react-router-dom";

export default function LinkButton({ children, to, classes }) {
  const navigate = useNavigate();

  return (
    <div
      className={`text-lg text-blue-500 hover:text-blue-600 inline-block hover:underline ${classes}`}
      onClick={() => navigate(to)}
    >
      {children}
    </div>
  );
}
