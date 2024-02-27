import React, { useState, useEffect } from 'react';
import { Header, Feed, SearchBar } from '../../components';
import axios from 'axios';

//import { useAuth } from '../../context/auth';
import Cookies from "js-cookie";
import './Home.scss';
import { Cookie } from '@mui/icons-material';

// interface HomeProps {
//   showCreatePost: any;
//   changeState: any;
// }

function Home(): React.ReactElement {
  // const { currentUser } = useAuth();
  // const photo = currentUser?.photoURL ?? undefined;
  // const user = currentUser?.displayName ?? null;
  const tmp = Cookies.get('username');

  const photo = undefined;
  const user = tmp === undefined ? null : tmp;

  const [posts, setPosts] = useState<any[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  console.log("Home init");
  // axios.get("/post", {})
  //     .then((response: any) => {
  //       setPosts(response.data);
  //     });

  const refreshPosts = () => {
    setRefreshKey(oldKey => oldKey + 1);
  };
  useEffect(() => {
    if (posts.length === 0) {
      axios.get("/post/username/" + user)
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching data: ', error);
        });
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      // new curposts
      // const curposts : any[] = [];
      // iterate posts and get all posts

      try {
        // Map all posts to HTTP requests
        const requests = posts.map((post) =>
          axios.get(`/post/${post.feelingID}`)
        );
    
        // Perform all requests in parallel
        const responses = await Promise.all(requests);

        // console.log('Responses:', responses);
    
        // deleted post should be filtered out
        const filteredResponses = responses.filter(element => element.data.length !== 0);
        // Extract data from each response
        const curposts = filteredResponses.map((response) => response.data[0]);
    
        // Update state with the fetched posts
        setPosts(curposts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
      
    }
    fetchData();
    // refreshPosts();
  }, [refreshKey]);



  return (
    <>
      {/* <div className={showCreatePost?"halfVisualHome":"fullVisualHome"}></div> */}

      <Header photoUrl={photo} username={user} />
      <SearchBar setPosts={setPosts}/> {/* Add the SearchBar component here */}
      {/* <div className='homeBody'> */}
        {/* <SideBar photoUrl={photo} username={user} /> */}
        <Feed refreshPosts={refreshPosts} posts={posts} photoUrl={photo} username={user}/>
        {/* <Widget /> */}
      {/* </div> */}
    </>
  );
}

export default Home;
