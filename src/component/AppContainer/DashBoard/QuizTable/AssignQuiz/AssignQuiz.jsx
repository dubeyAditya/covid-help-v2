import React from "react";
import { Spin, Tag, message, Modal } from 'antd';
import api from '../../../../../services';
import TableTransfer from './TableTransfer';

const leftTableColumns = [
    {
        dataIndex: 'name',
        title: 'Name',
    },
    {
        dataIndex: 'className',
        title: 'Class',
        render: text => (text.length < 3 ? <Tag color="purple">{text} <sup>th</sup></Tag> : <Tag color="green">{text}</Tag>),
    },
    {
        dataIndex: 'course',
        title: 'Course',
    },
];
const rightTableColumns = [
    {
        dataIndex: 'name',
        title: 'Name',
    }
];

class AssignQuiz extends React.Component {

    state = {
        studentList: [],
        selectedList: [],
        isLoading: false
    };

    componentWillMount() {
        this.loadStudentData();
    }

    loadStudentData = async () => {
        this.setState({ isLoading: true })
        const quizId = this.props.quiz.key;
        const quizList = await api.find("quizList", "quizId", '==', quizId);
        const students = await api.find("users", 'enabled', '==', true);
        const assignedUsers = quizList.length ? quizList[0].users : [];
        const selectedList = this.mapUidtoId(assignedUsers, students);
        this.setState({ isLoading: false, selectedList, studentList: students.filter(student => student.role !== 'admin') });
    }

    onClose = () => {
        this.setState({ selectedList: [] });
        this.props.handleClose();
    };

    setSelectedList = (selectedStudentDocIds) => {
        this.setState({ selectedList: selectedStudentDocIds });
    }

    mapIdtoUid = () => {
        return this.state.studentList.filter(stu => this.state.selectedList.includes(stu.id)).map(student => student.uid);
    }

    mapUidtoId = (users, students) => {
        return students.filter(student => users.includes(student.uid)).map(student => student.id);
    }

    successCallback = () => {
        message.success("Quiz has been assigned to Selected Students.");
        this.setState({ isLoading: false });
        this.onClose();
    }

    errorCallback = (err) => {
        console.error(err);
        message.error("Opps! Unable to Assign Quiz.Please try after sometime.");
        this.setState({ isLoading: false });
    }

    assignExams = async (activeQuiz, userQuizs) => {
        this.setState({ isLoading: true });
        const quizList = await api.find("quizList", "quizId", '==', activeQuiz.quizId)
        if (quizList.length > 0) {
            api.update('quizList', quizList[0].id, activeQuiz).then(async () => {
                await api.removeBatch('userQuiz', 'quizId', '==', activeQuiz.quizId);
                await api.addBatch('userQuiz', userQuizs);
                this.successCallback();
            }, this.errorCallback)
        }
        else {
            api.add('quizList', activeQuiz).then(() => api.addBatch('userQuiz', userQuizs).then(this.successCallback), this.errorCallback);
        }

    }

    handleAssignment = async () => {
        if (this.state.selectedList.length > 0) {
            const quizId = this.props.quiz.key;
            const users = this.mapIdtoUid();

            const activeQuiz = {
                state: 'Assigned',
                quizId,
                users
            }

            const userQuizs = users.map((uid) => ({
                uid,
                quizId,
                state: 'Assigned',
                resultId: null
            }));

            this.assignExams(activeQuiz, userQuizs);
        }
        else {
            message.warning("Please select atleast one student.");
        }
    }

    filterList = (inputValue, item) => (item.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1 || item.className.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1)

    render() {
        const { selectedList, studentList, isLoading } = this.state;
        const { visible } = this.props;
        return (
            <Modal
                title="Select Students"
                closable={false}
                onOk={this.handleAssignment}
                onCancel={this.onClose}
                visible={visible}
                width={window.innerWidth * 0.8}
                okText="Assign"
                confirmLoading={isLoading}
                maskClosable={false}
                destroyOnClose={true}
            >
                <Spin tip="Loading..." spinning={isLoading}>{
                    <TableTransfer
                        dataSource={studentList}
                        targetKeys={selectedList}
                        showSearch={true}
                        onChange={this.setSelectedList}
                        filterOption={this.filterList}
                        leftColumns={leftTableColumns}
                        rightColumns={rightTableColumns}
                    />
                }</Spin>
            </Modal>)
    }
}
export default AssignQuiz;
