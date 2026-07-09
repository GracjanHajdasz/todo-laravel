import { Head, Link } from '@inertiajs/react';
import Tasks from '@/components/Tasks';
import AddTaskForm from '@/components/AddTaskForm';

type Task = {
    id: number | string;
    title: string;
    description: string;
    status: string;
};

export default function Home({ tasks }: { tasks: Task[] }) {
    return (
        <>
            <Head title="Home" />
            <div className="bg-white text-black">
                <Tasks tasks={tasks} />
            </div>
            <AddTaskForm />
        </>
    );
}
