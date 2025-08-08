const LoadingSpinner = ({ size = 'large', message = 'Cargando...' }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-secondary/20">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-primary ${
          size === 'large' ? 'w-16 h-16' : size === 'medium' ? 'w-12 h-12' : 'w-8 h-8'
        }`}></div>
        
        {/* Logo */}
        <div className="text-center">
          <h1 className="text-2xl font-light text-primary mb-2">VELOUR</h1>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
