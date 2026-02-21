const Button = ({ children, loading, ...props }) => {
  return (
    <button
      {...props}
      disabled={loading}
      className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;