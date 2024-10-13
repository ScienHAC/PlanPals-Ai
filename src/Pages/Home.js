import React from 'react'
// import { Link } from 'react-router-dom'
import { useAuth } from '../MyComponents/AuthContext';
const Home = () => {
    const { isAuthenticated } = useAuth();
    return (
        <>
            {isAuthenticated ? (
                <>
                    <div id='Table_data'>
                        <button>Create</button>
                        <table>
                            <thead>
                                <tr id='Main'>
                                    <th>mathematics</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </>
            ) : (
                <>
                    <h1>PlanPals.ai</h1>
                </>
            )}
        </>
    )
}

export default Home
