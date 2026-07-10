import { useForm } from '@inertiajs/react';
import { Dispatch, SetStateAction, useEffect } from 'react';

type Task = {
    id: number | string;
    title: string;
    description: string;
    status: string;
};

type EditTaskFormProps = {
    editingTaskId: number | string | null;
    tasks: Task[];
    setShowEditForm: Dispatch<SetStateAction<boolean>>;
};

export default function EditTaskForm({
    editingTaskId,
    tasks,
    setShowEditForm,
}: EditTaskFormProps) {
    const editingTask = tasks.find((task) => task.id === editingTaskId);
    useEffect(() => {
        if (editingTask) {
            setData({
                title: editingTask.title,
                description: editingTask.description,
                status: editingTask.status,
            });
        }
    }, [editingTaskId]);

    const { data, setData, put, processing, errors, reset } = useForm({
        title: '',
        description: '',
        status: '',
    });

    const submit = (e: React.FormEvent, id: number | string | null) => {
        e.preventDefault();
        put(`/tasks/${id}`, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setShowEditForm(false);
            },
            onError: (errors) => {
                console.log(errors.status);
            },
        });
    };

    return (
        <form
            onSubmit={(e) => submit(e, editingTaskId)}
            className="bg-white text-black"
        >
            <input
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
            />
            <input
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
            />

            <select
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
            >
                <option value="todo">Do zrobienia</option>
                <option value="in_progress">W trakcie</option>
                <option value="done">Gotowe</option>
            </select>

            {errors.status && <p className="text-red-500">{errors.status}</p>}
            {errors.title && <p className="text-red-500">{errors.title}</p>}

            <button type="submit" disabled={processing}>
                Zapisz
            </button>
        </form>
    );
}
