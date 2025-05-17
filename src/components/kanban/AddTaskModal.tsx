import { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import { useAddTask } from "../../hooks/useTasks";

interface AddTaskModalProps {
    projectId: string;
    isOpen: boolean;
    onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ projectId, isOpen, onClose }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [taskTitle, setTaskTitle] = useState('');
    const addTaskMutation = useAddTask();

    const handleAddTask = async () => {
        if (!taskTitle.trim()) {
            messageApi.open({
                type: 'warning',
                content: 'The task title cannot be empty',
            })
            return
        }

        addTaskMutation.mutate({ projectId, title: taskTitle },
            {
                onSuccess: () => {
                    messageApi.open({
                        type: 'success',
                        content: 'Task added successfully',
                    })
                    setTaskTitle('');
                    onClose();
                },
                onError: (error) => {
                    messageApi.open({
                        type: 'error',
                        content: error.message,
                    })
                },
            }
        );
    };

    return (
        <Modal
            title="Add New Task"
            open={isOpen}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="add" type="primary" onClick={handleAddTask}>
                    Add
                </Button>,
            ]}
        >
            {contextHolder}
            <Input
                placeholder="Task Title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                onPressEnter={handleAddTask}
            />
        </Modal>
    );
}

export default AddTaskModal;