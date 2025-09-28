
export interface UpdateTask {
    title?: string;
    isDone?: boolean;
};

export interface Task {
    created: string;
    id: number;
    isDone: boolean;
    title: string;
};

export interface Info {
    all: number;
    completed: number;
    inWork: number;
};

interface Meta {
    totalAmount: number;
}

export interface TaskResponse<T, N> {
    data: T[];
    info?: N;
    meta: Meta;
}

export type ParameterFilter = 'all' | 'completed' | 'inWork';

interface TodoItem {
    id: number;
    title: string;
    isDone: boolean;
};

export interface TodoItemProps {
    item: TodoItem;
    getTasks: () => Promise<void>;
};

export interface TodoListProps {
  tasks: Task[];
  active: ParameterFilter;
  getTasks: () => Promise<void>;
  loading: boolean;
}

export interface TabsProps {
    counter: Info | null;
    active: ParameterFilter;
    setActive: React.Dispatch<React.SetStateAction<ParameterFilter>>;
    getTasks: () => Promise<void>;
}

export interface AddTaskProps {
    getTasks: () => Promise<void>;
}

