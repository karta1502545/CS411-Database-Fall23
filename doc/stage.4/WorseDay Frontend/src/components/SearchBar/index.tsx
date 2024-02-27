import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom'; 
import './SearchBar.scss';
import Cookies from 'js-cookie';
import axios from 'axios';

function SearchBar({setPosts}: any) {
  const navigate = useNavigate();
    // Declare a map {string: number} to store the emo string to its ID
    // Down: 1
    // Blue: 2
    // Bummed out: 3
    // Upset: 4
    // Low: 5
    // Gloomy: 6
    // In a funk: 7
    // Disheartened: 8
    // Unhappy: 9
    // Fed up: 10
    const [emoMap, setEmoMap] = useState(new Map<string, number>());
    // init the map
    emoMap.set('down', 1);
    emoMap.set('blue', 2);
    emoMap.set('bummed out', 3);
    emoMap.set('upset', 4);
    emoMap.set('low', 5);
    emoMap.set('gloomy', 6);
    emoMap.set('in a funk', 7);
    emoMap.set('disheartened', 8);
    emoMap.set('unhappy', 9);
    emoMap.set('fed up', 10);

    // Declare a map {number: string} to store the emo ID to its string
    
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if(searchTerm === ""){
        const username = Cookies.get('username');
        await axios.get("/post/username/" + username, {}).then((response: any) => {
          setPosts(response.data);
        });
        setSearchTerm('');
        return;
      }
      console.log('Searching for:', searchTerm);
      // if search tern start with #, then it is a hashtag
      // if search trem start with @, then it is a user
      if(searchTerm.startsWith('#')){
        let hashtag = searchTerm.substring(1);
        if(emoMap.has(hashtag)){
          console.log("Found: ", emoMap.get(hashtag));
          
          await axios.get("/post/tag/"+emoMap.get(hashtag)).then((response: any) => {
            setPosts(response.data);
          });
        }else{
          // notice the user that the hashtag is not found
          alert("Hashtag not found!");
        }
      }else if(searchTerm.startsWith('@')){
        let user = searchTerm.substring(1);
        await axios.get("/post/username/" + user, {}).then((response: any) => {
          setPosts(response.data);
        });
      }
      
      // clear the search bar
      // setSearchTerm('');
      // Here, you can add logic to perform the search
    };
    return (
      <div className="search-container"> {/* Container for adding top space */}
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Search with # for tags or @ for users"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button type="submit" className="search-button">
          <FaSearch />
        </button>
      </form>
    </div>
    );
  }

export default SearchBar;