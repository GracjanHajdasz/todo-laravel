<?php

namespace App\Enums;

enum StatusEnum: string
{
    case ToDo = 'todo';
    case InProgress = 'in_progress';
    case Done = 'done';

    public function label(): string
    {
        return match($this){
            self :: ToDo => 'todo',
            self :: InProgress => 'in_progress',
            self :: Done => 'done',
        };
    }

    public function allowedTransitions(): array
    {
        return match($this) {
            self :: ToDo => [self :: InProgress],
            self :: InProgress => [self :: Done],
            self::Done => [self :: Done],
        };
    }

    public function canTransitionTo(self $status): bool
    {
        return in_array($status, $this->allowedTransitions(), true);
    }
}
