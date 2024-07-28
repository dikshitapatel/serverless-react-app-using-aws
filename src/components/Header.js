import React, { useState,useEffect } from 'react';

const Header = () => {

    const[menuLinksData, setMenuLinksData] = useState([]);


     useEffect(() => {
      const loadMenuLinksData = async () =>{
        const fetchData = await fetch('https://hhqrdfwigd.execute-api.us-east-2.amazonaws.com/Production/menuLinks');
        const data = await fetchData.json();
        setMenuLinksData(data);
      }
      loadMenuLinksData();
    },[]);

    

     return(
    <header id="intro">
      <article className="fullheight">
        <div className="hgroup">
          <h1>Landon Hotel</h1>
          <h2>West London</h2>
          <p><a href="#welcome"><img src="https://landonhotel.com/images/misc/arrow.png" alt="down arrow"/></a></p>
        </div>
      </article>

      <nav id="nav">
        <div className="navbar">
          <div className="brand"><a href="#welcome">Landon <span>Hotel</span></a></div>
          <ul>
          {
            menuLinksData.map((link) => 
            <li><a className={`info ${link.class}`} href={link.href}><span>{link.text}</span></a></li>
          )
          }            
          </ul>
        </div>
      </nav>
    </header>   
    );
}
export default Header;