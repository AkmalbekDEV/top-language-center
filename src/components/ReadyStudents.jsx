import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../api/firebase-config';
import { ClockIcon, UserIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';

const ReadyStudentsList = () => {
  const { groupId, weekId } = useParams();

  const { data: readyStudents, isLoading } = useQuery({
    queryKey: ['ready-students', groupId, weekId],
    queryFn: async () => {
      const q = query(
        collection(db, 'student_test_attempts'),
        where('weekRef', '==', weekId),
        where('groupRef', '==', groupId),
        where('status', '==', 'ready')
        // Removed orderBy, we'll sort in JavaScript
      );

      const snapshot = await getDocs(q);
      const students = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          // Convert timestamp to milliseconds for easier sorting
          startedAtMs: data.startedAt?.seconds ? data.startedAt.seconds * 1000 : Date.now(),
          startedAt: data.startedAt
        };
      });

      // Sort by startedAt timestamp in descending order (most recent first)
      return students.sort((a, b) => b.startedAtMs - a.startedAtMs);
    },
    refetchInterval: 5000,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });

  // Helper function to format timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'N/A';

    try {
      // Handle both Timestamp objects and regular timestamps
      const date = timestamp instanceof Timestamp ?
        timestamp.toDate() :
        new Date(timestamp.seconds * 1000);

      return new Intl.DateTimeFormat('default', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }).format(date);
    } catch (error) {
      console.error('Error formatting timestamp:', error);
      return 'Invalid Date';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Ready Students</h2>
        <div className="flex items-center space-x-2">
          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-1 rounded-full">
            {readyStudents?.length || 0} Students Ready
          </span>
          <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"
            title="Auto-refreshing every 5 seconds" />
        </div>
      </div>

      {readyStudents?.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 mb-2">
            <UserIcon className="mx-auto h-12 w-12" />
          </div>
          <p className="text-gray-500">No students are ready for the test yet</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Started At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {readyStudents?.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <UserIcon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.studentName}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.studentLogin}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      {formatTimestamp(student.startedAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.score}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Ready
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ReadyStudentsList;