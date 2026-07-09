import { Head, Link } from '@inertiajs/react';
import Tasks from '@/components/Tasks';

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
            <div className="min-h-screen bg-white text-black">
                <Tasks tasks={tasks} />
            </div>
        </>
    );
}
