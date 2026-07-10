import { router } from '@inertiajs/react';
import { Dispatch, SetStateAction } from 'react';

type Task = {
    id: number | string;
    title: string;
    description: string;
    status: string;
};

type TasksProps = {
    tasks: Task[];
    setShowEditForm: Dispatch<SetStateAction<boolean>>;
    setEditingTaskId: Dispatch<SetStateAction<number | string | null>>;
};

export default function Tasks({
    tasks,
    setShowEditForm,
    setEditingTaskId,
}: TasksProps) {
    const handleDelete = (id: number | string) => {
        router.delete(`/tasks/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}>
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                    <p>{task.status}</p>
                    <button onClick={() => handleDelete(task.id)}>Usuń</button>
                    <button
                        onClick={() => {
                            setShowEditForm(true);
                            setEditingTaskId(task.id);
                        }}
                    >
                        Edytuj
                    </button>
                </div>
            ))}
        </div>
    );
}
