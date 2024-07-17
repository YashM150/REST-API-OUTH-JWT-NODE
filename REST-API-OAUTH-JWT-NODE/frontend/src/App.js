import React from 'react';

function App() {
    
    const handleLogin = () => {
        window.open('http://localhost:5000/api/auth/google');
    };
    const handleLogin1 = () => {
        window.open('http://localhost:5000/api/auth/github');
    };
    const handleLogout = () => {
        window.open('http://localhost:5000/logout', '_self');
    };

    return (
        <div>
            <div className='Outer1'>
                <div className='Outer'>
                    <h1>Login Through OAuth</h1>
                    <button onClick={handleLogin} className='butn'>Login with Google</button>
                    <button onClick={handleLogin1} className='butn'>Login with GITHub</button>


                    <button onClick={handleLogout} className='butn'>Logout</button>

                </div>
            </div>
           
        </div>
    );
}

export default App;
