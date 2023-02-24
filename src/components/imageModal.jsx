import React from 'react';
import { ReactComponent as CloseIcon } from '../Assets/close.svg';
import '../style/model.css';

const ImageModal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modalMain">
        <CloseIcon className="closeButton" onClick={handleClose} />
        {children}
      </section>
    </div>
  );
};

export default ImageModal;
