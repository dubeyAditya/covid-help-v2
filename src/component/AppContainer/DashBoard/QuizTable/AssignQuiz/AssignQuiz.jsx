import React from "react";
import { Drawer, Button, Icon, Select, message, Avatar, List } from 'antd';
import api from '../../../../../services';

const { Option } = Select;



class AssignQuiz extends React.Component {

    state = {
        studentList: [],
        selectedList: [],
        isLoading: false
    };

    onClose = () => {
        this.setState({ selectedList: [] });
        this.props.handleClose();
    };

    updateList = (uid) => {
        const list = [...this.state.selectedList, uid];
        this.setState({ selectedList: list });
    }

    removeFromList = (uid) => {
        const selectedList = this.state.selectedList.filter((id) => id !== uid);
        this.setState({ selectedList });
    }

    componentDidMount() {
        // TODO : Fetch Data for specific user has questions assigned

        const value = this.props.quiz.key;
        if (value) {
            this.setState({ isLoading: true });
            api.find("quizList", "quizId", '==', `/quiz/${value}`).then((list) => {
                let quizList = [];
                list.forEach((doc) => {
                    quizList.push(doc.data());
                })
                const selectedList = quizList.length ? quizList[0].users : [];
                this.setState({ isLoading: false });
                this.setState({ selectedList })
            });
        }



        api.find("users", 'enabled', '==', true)
            .then((list) => {
                let studentList = [];
                list.forEach((doc) => {
                    studentList.push(doc.data());
                });
                this.setState({ studentList });
            })
            .catch(err => message.error(err));
    }

    getStudents = () => {
        return this.state.studentList.map((student) => (
            <Option key={student.uid} value={student.uid} >
                <Avatar src={student.photoURL}></Avatar> {" "} {student.name} ({student.className})
          </Option>))
    }

    getSelectedList = () => {
        return this.state.selectedList.map((uid) => {
            return this.state.studentList.find((student) => student.uid === uid)
        });
    }

    getStudentList = (student) => {
        return <List.Item>
            <List.Item.Meta
                avatar={<Avatar src={student.photoURL} />}
                title={student.name}
                description={student.className}
            />
        </List.Item>
    }

    assignExams = async () => {
        this.setState({ isLoading: true });
        const quizDocId = `/quiz/${this.props.quiz.key}`;
        const activeQuiz = {
            state: 'Assigned',
            quizId: quizDocId,
            users: this.state.selectedList
        }
        api.add('quizList', activeQuiz).then(() => {
            message.success("Assigned Quiz to Selected Students.");
            this.setState({ isLoading: false });
        }, (err) => {
            message.error("Opps ! Unable to Assign Quiz.");
            this.setState({ isLoading: false });
        });
    }


    getActionBtn = () => {
        return (<div
            style={{
                position: 'absolute',
                bottom: 0,
                width: '100%',
                borderTop: '1px solid #e8e8e8',
                padding: '10px 16px',
                textAlign: 'right',
                left: 0,
                background: '#fff',
                borderRadius: '0 0 4px 4px',
            }}>
            <Button
                style={{
                    marginRight: 8,
                }}
                onClick={this.onClose}>
                Cancel
             </Button>
            <Button onClick={this.assignExams} type="primary">
                Assign
            </Button>
        </div>)
    }

    loadContent = () => {
        return (
            <div>
                <Select
                    onSelect={this.updateList}
                    onDeselect={this.removeFromList}
                    style={{ width: '100%' }}
                    mode="multiple"
                    size="large"
                    placeholder="Please select students"
                    removeIcon={<Icon style={{ fontSize: '16px' }} type="close-circle" theme="twoTone" twoToneColor="#eb2f96" />}
                    menuItemSelectedIcon={<Icon type="check-circle" style={{ fontSize: '16px' }} theme="filled" twoToneColor="#52c41a" />}
                >
                    {this.getStudents()}
                </Select>
                <List
                    header={<h4>Shared With</h4>}
                    loading={this.state.isLoading}
                    itemLayout="horizontal"
                    dataSource={this.getSelectedList()}
                    renderItem={this.getStudentList}
                />
                {this.getActionBtn()}
            </div>)
    }

    render() {
        return <Drawer
            title="Select Students"
            width="400"
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.props.visible}
        >
            {this.loadContent()}
        </Drawer>
    }
}
export default AssignQuiz;
