import { useTranslation } from 'react-i18next'
import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import { useState } from "react";
import "./Header.css";
import { auth } from '../firebase';
import { Link } from "react-router-dom";
import { useStateValue } from '../StateProvider/StateProvider';
const languages = [
  { value: '', text: "Language" },
  { value: 'en', text: "English" },
  { value: 'mr', text: "Marathi" },
  { value: 'ta', text: "Tamil" },
  { value: 'te', text: "Telugu" },
  {value :'hi',text:"Hindi"}
]
const Header=()=> {
  const [{basket,user}]=useStateValue()
  const { t } = useTranslation(); 
  const [lang, setLang] = useState();
  const handleChange = e => { 
        setLang(e.target.value);
        let loc = "http://localhost:3000/";
        window.location.replace(loc + "?lng=" + e.target.value);
  }
  const handleAuth=()=>{
    if(user)
    {
      auth.signOut()
    }
  }
  return (
    <div className="header">
    <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt=""/>
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        {/* <SearchIcon className="header__searchIcon" /> */}
        <i className="fa fa-search" aria-hidden="true"></i>

      </div>

    <div className="sel">
    <img src="../../img/india.png" alt=""></img>
    <select  value={lang} onChange={handleChange}>
                {languages.map(item => {
                    return (<option key={item.value} 
                    value={item.value}>{item.text}</option>);
                })}
            </select>
    </div>
    
      <div className="header__nav">
      <Link to={!user && '/login'}>
          <div onClick={handleAuth} className="header__option">
            <span className="header__optionLineOne">Hello {!user ? 'Guest' : user.email}</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
          <i class="fa fa-shopping-basket" aria-hidden="true"></i>
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
        </div>
      </div>
  );

}
export default Header;