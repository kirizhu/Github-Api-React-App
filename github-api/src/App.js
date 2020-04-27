import React, { useState, useEffect } from 'react';
import { Form, Card, Icon, Image } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [followers, setFollowers] = useState('');
  const [following, setFollowing] = useState('');
  const [repos, setRepos] = useState('');
  const [avatar, setAvatar] = useState('');
  const [userInput, setUserInput] = useState('');
  const [joined, setJoined] = useState('');
  const [info, setInfo] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = async (user) => {
    const response = await axios.get(`/api/user/${user}`);
    if (response.data.message) {
      setError(response.data.message);
    } else {
      mapData(response.data);
      setError(null);
    }
  };

  useEffect(() => {
    fetchUsers('example');
  }, []);

  const mapData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
    created_at,
    bio,
  }) => {
    setName(name);
    setUsername(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
    setJoined(created_at);
    setInfo(bio);
  };
  const handleSearch = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    fetchUsers(userInput);
  };
  return (
    <div className='App'>
      <div className='navbar'>futurice Github Search</div>
      <div className='search'>
        <Form className='form' onSubmit={handleSubmit}>
          <Form.Group>
            <input
              className='input'
              placeholder='Github Username'
              onChange={handleSearch}
            />
          </Form.Group>
          <Form.Button
            color='black'
            fluid
            className='submit'
            type='submit'
            content='Search'
          />
        </Form>
      </div>
      {error ? (
        <h1 className='error'>{error} </h1>
      ) : (
        <div className='card'>
          <Card>
            <Image src={avatar} wrapped ui={true} />
            <Card.Content>
              <Card.Header>
                <a
                  style={{ color: 'black' }}
                  href={`https://github.com/${userName}`}
                  target='_blank'
                >
                  <Icon name='user' />
                  {userName}
                </a>
              </Card.Header>
              <Card.Meta>
                <span className='date'>
                  <Icon name='calendar alternate' /> Joined in {joined}
                </span>
              </Card.Meta>
              <Card.Content>{name}</Card.Content>
            </Card.Content>
            <Card.Content extra>
              <Card.Description>{info}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a
                target='_blank'
                href={`https://github.com/${userName}/followers`}
              >
                <Icon name='users' />
                {followers} Followers
              </a>
            </Card.Content>
            <Card.Content extra>
              <a
                target='_blank'
                href={`https://github.com/${userName}/repositories`}
              >
                <Icon name='folder' />
                {repos} Repos
              </a>
            </Card.Content>
            <Card.Content extra>
              <Icon name='users' />
              {following} Following
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
}

export default App;
