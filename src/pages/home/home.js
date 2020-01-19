import * as React from 'react';
import { useEffect } from "react";
import { actions, connect, Link } from "../../utils/mirror";
import './styles/home.scss';


const Home = ({ home }) => {
  useEffect(() => {
    document.title = "首页 | Learn React Hooks";
  }, []);

  return (
    <div className="wrap">
      <Link className='about-link' to='/about'>about</Link>
      <div className='btn-group'>
        <button className='btn' onClick={actions.home.add}>add</button>
        <button className='btn' onClick={actions.home.inc}>inc</button>
      </div>
      <div className='number'>{home.get('count', '0')}</div>
    </div>
  );
};


export default connect(({ home }) => ({
  home
}))(Home);
