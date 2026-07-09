type Task = {
    id: number | string;
    title: string;
    description: string;
    status: string;
};

export default function Tasks({ tasks }: { tasks: Task[] }) {
    console.log(tasks);
    return (
        <div>
            {tasks.map((task) => (
                <div key={task.id}>
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                    <p>{task.status}</p>
                </div>
            ))}
        </div>
    );
}
