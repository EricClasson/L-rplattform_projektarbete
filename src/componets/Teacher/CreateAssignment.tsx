// import { useEffect, useState } from 'react';
// import { assignAssignmentToStudent, createAssignment, fetchUsersByRole } from '../../helpers';
// import useSignInAndGetUser from '../../hooks/useSignInAndGetUser';
// import useAuth from '../../hooks/useAuth';

// interface User {
//     uid: string;
//     email: string;
//     role: 'student' | 'teacher';
// }

// function CreateAssignment() {
//     const [students, setStudents] = useState<User[]>([]);
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [selectedStudent, setSelectedStudent] = useState('');

//     const { user } = useAuth();

//     useEffect(() => {
//         const fetchData = async () => {
//             const students = await fetchUsersByRole('student');
//             setStudents(students);
//         };

//         fetchData();
//     }, []);
// a
//     console.log('user', user);

//     const handleAssignmentCreation = async () => {
//         if (title && description && selectedStudent) {
//             try {
//                 const assignmentId = await createAssignment(title, description, user?.uid ?? '');
//                 await assignAssignmentToStudent(assignmentId, selectedStudent);
//                 console.log('Assignment created and assigned successfully');
//             } catch (error) {
//                 console.log('Error creating and assigning assignment: ', error);
//             }
//         } else {
//             alert('Please fill in all fields and select a student');
//         }
//     };

//     return (
//         <div>
//             <h1>Create and Assign Assignment</h1>
//             <div>
//                 <label>Title:</label>
//                 <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
//             </div>
//             <div>
//                 <label>Description:</label>
//                 <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
//             </div>
//             <div>
//                 <label>Student:</label>
//                 <select
//                     onChange={(e) => setSelectedStudent(e.target.value)}
//                     value={selectedStudent}
//                 >
//                     <option value="">Select a student</option>
//                     {students.map((student) => (
//                         <option key={student.uid} value={student.uid}>
//                             {student.email}
//                         </option>
//                     ))}
//                 </select>
//             </div>
//             <button onClick={handleAssignmentCreation}>Create and Assign Assignment</button>
//         </div>
//     );
// }

// export default CreateAssignment;
