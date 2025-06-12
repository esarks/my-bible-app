import React from 'react';
import { Link } from 'react-router-dom';
import BibleViewer from '../components/BibleViewer';

const ScriptureSearchPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/">Home</Link> | <Link to="/profile">Profile</Link>
      </div>

      <h1>Scripture Search</h1>
      <BibleViewer />
    </div>
  );
};

export default ScriptureSearchPage;
