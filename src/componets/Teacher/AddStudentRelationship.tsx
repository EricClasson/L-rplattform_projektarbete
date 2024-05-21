// import { useEffect, useState } from 'react';
// import {
//     createAssignment,
//     createRelationship,
//     fetchUsersByRole,
//     assignAssignmentToStudent,
//     getAssignmentsForStudent,
// } from '../../helpers';

// interface User {
//     uid: string;
//     email: string;
//     role: 'student' | 'teacher';
// }

// function AddStudentRelationship() {
//     const [students, setStudents] = useState<User[]>([]);
//     const [teachers, setTeachers] = useState<User[]>([]);
//     const [selectedStudent, setSelectedStudent] = useState<string>('');
//     const [selectedTeacher, setSelectedTeacher] = useState<string>('');

//     useEffect(() => {
//         const fetchData = async () => {
//             const students = await fetchUsersByRole('student');
//             const teachers = await fetchUsersByRole('teacher');
//             setStudents(students);
//             setTeachers(teachers);
//         };

//         console.log(teachers);

//         fetchData();
//     }, []);

//     const handleSubmit = async () => {
//         if (selectedStudent && selectedTeacher) {
//             await createRelationship(selectedStudent, selectedTeacher);
//             console.log('Relationship created!');
//         } else {
//             console.log('Select both a student and a teacher');
//         }
//     };

//     return (
//         <div>
//             <h1>Add student to teacher</h1>
//             <label>Student:</label>
//             <select onChange={(e) => setSelectedStudent(e.target.value)} value={selectedStudent}>
//                 <option value="">Select a student</option>
//                 {students.map((student) => (
//                     <option key={student.uid} value={student.uid}>
//                         {student.email}
//                     </option>
//                 ))}
//             </select>
//             <label>Teacher:</label>
//             <select onChange={(e) => setSelectedTeacher(e.target.value)} value={selectedTeacher}>
//                 <option value="">Select a teacher</option>
//                 {teachers.map((teacher) => (
//                     <>
//                         <option key={teacher.uid} value={teacher.uid}>
//                             {teacher.email}
//                         </option>
//                     </>
//                 ))}
//             </select>
//             <button
//                 className="p-4 bg-green-500"
//                 onClick={() =>
//                     createAssignment(
//                         'HISTORIA',
//                         'En kurs om historia',
//                         'Tm7OIgBb1bbJMR6MYFKizoSLm5y1'
//                     )
//                 }
//             >
//                 lol
//             </button>
//             <button
//                 className="-p4 bg-zinc-900 text-white"
//                 onClick={() => assignAssignmentToStudent('Crb2pcAfkbOpkq3bEdWb', students[0].uid)}
//             >
//                 ASSIGN TO STUDENT
//             </button>
//             <button onClick={handleSubmit}>Create relationship</button>
//         </div>
//     );
// }

// export default AddStudentRelationship;
