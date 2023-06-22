import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';

const Header = ({ compArray }) => {
  return (
    <header className="comp-header">
      <AiOutlineHome className="icon" />
      {compArray?.map((comp, index) => (
        <div key={index} className="arr-wrapper">
          <MdOutlineKeyboardArrowRight className="icon-right" />
          <span>{comp.compName}</span>
        </div>
      ))}
    </header>
  );
};
export default Header;
