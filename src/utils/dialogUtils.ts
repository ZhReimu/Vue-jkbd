import { createVNode } from 'vue';
import { Modal } from 'ant-design-vue';
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';

const showConfirm = (title: string, content: string, onOk = () => { }) => {
    Modal.confirm({
        title,
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { style: 'color:red;' }, content),
        onOk() {
            onOk()
        }
    });
}
const showInfo = (title: string, content: string, onOk = () => { }) => {
    Modal.info({
        title,
        icon: createVNode(ExclamationCircleOutlined),
        content: createVNode('div', { style: 'color:red;' }, content),
        onOk() {
            onOk()
        }
    });
}
export {
    showConfirm,
    showInfo
}