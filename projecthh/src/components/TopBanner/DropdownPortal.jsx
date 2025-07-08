
import ReactDOM from 'react-dom';

const DropdownPortal = ({ children }) => {
  const el = document.getElementById("dropdown-root");
  return el ? ReactDOM.createPortal(children, el) : null;
};

export default DropdownPortal;
