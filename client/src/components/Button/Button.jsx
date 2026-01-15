import './Button.css';

function Button({ className = '', type = 'button', children, ...props }) {
  return (
    <button type={type} className={`btn ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export default Button;
