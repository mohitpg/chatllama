export const Button = ({ children, onClick }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{"borderRadius":"0.5rem","width":"12rem","height":"3rem","fontWeight":700,"textTransform":"uppercase","backgroundColor":"#ffffff","transitionProperty":"all","transitionTimingFunction":"cubic-bezier(0.4, 0, 0.2, 1)","transitionDuration":["300ms","300ms"],":hover":{"backgroundColor":"#9CA3AF"}}}
      >
        {children}
      </button>
    );
  };