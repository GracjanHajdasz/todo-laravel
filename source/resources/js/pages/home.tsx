import { Head, Link } from '@inertiajs/react';
import Tasks from '@/components/Tasks';
import AddTaskForm from '@/components/AddTaskForm';
import { useState } from 'react';
import EditTaskForm from '@/components/EditTaskForm';

type Task = {
    id: number | string;
    title: string;
    description: string;
    status: string;
};

export default function Home({ tasks }: { tasks: Task[] }) {
    const [showEditForm, setShowEditForm] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState<number | string | null>(
        null,
    );

    return (
        <>
            <Head title="Home" />
            <div className="bg-white text-black">
                <Tasks
                    tasks={tasks}
                    setShowEditForm={setShowEditForm}
                    setEditingTaskId={setEditingTaskId}
                />
            </div>
            <AddTaskForm />
            {showEditForm && (
                <EditTaskForm
                    editingTaskId={editingTaskId}
                    tasks={tasks}
                    setShowEditForm={setShowEditForm}
                />
            )}
        </>
    );
}
