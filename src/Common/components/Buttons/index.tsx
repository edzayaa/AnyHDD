import './index.css'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button = (buttonProps: ButtonProps) => {
  return (
    <button {...buttonProps} className={`custom-button ${buttonProps.className ?? ''}`}>
      {buttonProps.children}
    </button>
  );
};

export default Button;