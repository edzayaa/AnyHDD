import './index.css'
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  commonStyles?: boolean;
  commonWithoutIcon?: boolean;
}

const Button = (buttonProps: ButtonProps) => {
  return (
    <button {...buttonProps} className={`custom-button ${buttonProps.commonStyles ? 'common-styles' : ''} ${buttonProps.className ?? ''}`}>
      {buttonProps.children}
      {
        buttonProps.commonStyles && !buttonProps.commonWithoutIcon && 
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="9" viewBox="0 0 16 9" fill="none">
          <path d="M14.9179 4.91794C15.1488 4.68712 15.1488 4.31288 14.9179 4.08206L11.1565 0.320624C10.9257 0.0898037 10.5514 0.0898038 10.3206 0.320624C10.0898 0.551445 10.0898 0.925679 10.3206 1.1565L13.6641 4.5L10.3206 7.8435C10.0898 8.07432 10.0898 8.44855 10.3206 8.67937C10.5514 8.91019 10.9257 8.91019 11.1565 8.67937L14.9179 4.91794ZM0.5 4.5L0.5 5.09105L14.5 5.09105L14.5 4.5L14.5 3.90895L0.5 3.90895L0.5 4.5Z" fill="#2F80ED"/>
        </svg>
      }
    </button>
  );
};

export default Button;