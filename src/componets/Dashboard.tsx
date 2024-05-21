import { useLocation } from 'react-router-dom';
// import useSignInAndGetUser from '../hooks/useSignInAndGetUser';
// import useAuth from '../hooks/useAuth';
// import useGetStudentAssignments from '../hooks/useGetStudentAssignments';

const Dashboard = () => {
    const location = useLocation();
    const { role } = location.state || { role: 'guest' };

    // const { assignments } = useGetStudentAssignments();

    // const { user } = useAuth();

    // console.log('user', user);

    // console.log('assignments: ', assignments);

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome as {role}</h2>
        </div>
    );
};

export default Dashboard;
