import React, { useState, useEffect } from "react";
import { useHeading } from './../../../context/HeadingContext';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import './dashboard.css';
import { Link } from "react-router-dom";
import { Skeleton } from 'primereact/skeleton';
import axios from 'axios';  // Import Axios

const Dashboard: React.FC = () => {
  const { setHeading } = useHeading();
  const [totalPosts, setTotalPosts] = useState<number>(0); 
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0); 
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    setHeading('Dynamic Heading for SomeComponent');

    // Function to fetch total posts count
    const fetchTotalPosts = async () => {
      setLoading(true); 
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setTotalPosts(response.data.length);  // Set total posts count
        setError(null);  // Clear any previous error
      } catch (error) {
        setError('Failed to fetch total posts. Please try again later.');  // Set error message
      }finally {
        setLoading(false);  // Set loading to false after the request completes (success or error)
      }

      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setTotalActiveUsers(response.data.length);  // Set total posts count
        setError(null);  // Clear any previous error
      } catch (error) {
        setError('Failed to fetch total posts. Please try again later.');  // Set error message
      }finally {
        setLoading(false);  // Set loading to false after the request completes (success or error)
      }
    };

    fetchTotalPosts();  // Call the function
  }, [setHeading]);

  return (
    <div className="nagetive-wraaper">
      <div className="counter-section">
        <div className="counter-row">
          <div className="counter-col">
            <Card title="Total Posts" subTitle={error ? (<><div className="error-count">Data Error</div></>) : totalPosts.toString()} className="create-dub">
            {loading?(
              <>
              <Skeleton height="2rem" className="mb-2" borderRadius="16px"></Skeleton>
              <Skeleton width="10rem" height="4rem" borderRadius="16px"></Skeleton>
              <Skeleton size="5rem"></Skeleton>
              </>
            ):(<>
              <div className="card-bodyinner">
                <Avatar icon="pi pi-id-card" size="large" className="avatar-profile avatar-perple" />
              </div>
              <div className="card-footer">
                <Link to="/post/all-posts">View More</Link>
              </div>
              </>
            )}
              
              {/* {error && <div className="error-message">{error}</div>} */}
            </Card>
          </div>
          <div className="counter-col">
            <Card title="Total Projects" subTitle="550" className="create-dub">
              <div className="card-bodyinner">
                <Avatar icon="pi pi-tablet" size="large" className="avatar-profile avatar-orange" />
              </div>
              <div className="card-footer">
                <Link to="">View More</Link>
              </div>
            </Card>
          </div>
          <div className="counter-col">
            <Card title="Active Users" subTitle={error ? (<><div className="error-count">Data Error</div></>) : totalActiveUsers.toString()} className="create-dub">
              <div className="card-bodyinner">
                <Avatar icon="pi pi-users" size="large" className="avatar-profile avatar-blue" />
              </div>
              <div className="card-footer">
                <Link to="/user/all-users">View More</Link>
              </div>
            </Card>
          </div>
          <div className="counter-col">
            <Card title="Total Students" subTitle="400" className="create-dub">
              <div className="card-bodyinner">
                <Avatar icon="pi pi-graduation-cap" size="large" className="avatar-profile avatar-yellow" />
              </div>
              <div className="card-footer">
                <Link to="">View More</Link>
              </div>
            </Card>
          </div>
          <div className="counter-col">
            <Card title="All Products" subTitle="15" className="create-dub">
              <div className="card-bodyinner">
                <Avatar icon="pi pi-shop" size="large" className="avatar-profile avatar-brown" />
              </div>
              <div className="card-footer">
                <Link to="">View More</Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
