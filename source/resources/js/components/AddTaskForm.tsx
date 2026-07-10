import { useForm } from '@inertiajs/react';

export default function AddTaskForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        description: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tasks', {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="bg-white text-black">
            <input
                value={data.title}
                onChange={(e) => setData('title', e.target.value)}
            />
            <input
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
            />

            {errors.title && <p className="text-red-500">{errors.title}</p>}

            <button type="submit" disabled={processing}>
                Dodaj
            </button>
        </form>
    );
}
