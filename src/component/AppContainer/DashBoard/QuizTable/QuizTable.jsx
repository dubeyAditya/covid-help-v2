import React, { useEffect, useState, useContext } from "react";

import { withRouter } from "react-router-dom";
import { Table, Divider, Button, Icon, Skeleton, Tooltip, Empty, Alert, Tag, message } from "antd";

import config from "../../../../config";

import api from "../../../../services";

import { appContext, AuthContext } from "../../../../context";
import { ViewQuestions } from "..";

import { Quiz } from '../../../../models/quiz.model';
import AssignQuiz from "./AssignQuiz";

const { Column } = Table;

const initialQuiz = new Quiz({
    quizTitle: "", quizSynopsis: "", questions: []
});

const ExamsTable = ({ history }) => {

    const [exams, setExams] = useState([]);

    const [isReady, setIsReady] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [showDrawer, setShowDrawer] = useState(false);

    const [quiz, setQuiz] = useState(initialQuiz);

    const { isAdmin, hasViewAccess } = useContext(appContext);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        isAdmin
            ? loadAdminQuiz()
            : loadUserQuiz()
        // eslint-disable-next-line
    }, []);

    const preview = (record) => () => {
        setQuiz(record);
        setShowModal(true);
    }

    const successCallback = (exams) => {
        console.log("Exams", exams);
        setExams(exams);
        setIsReady(true);
    }

    const failiureCallback = (err) => {
        console.log("Error in Feating Exams :", err);
    }

    const loadStudentList = (record) => () => {
        setShowDrawer(true);
        setQuiz(record);
    }

    const loadAdminQuiz = () => {
        api.get("quiz").then(async (quizs) => {
            const adminQuizs = await mapToAdminQuiz(quizs);
            successCallback(adminQuizs)
        }).catch(failiureCallback);
    }


    const loadUserQuiz = () => {
        api.find("userQuiz", 'uid', '==', user.uid).then(async (quizs) => {
            if (quizs.length > 0) {
                const userQuizs = await mapTouserQuiz(quizs);
                successCallback(userQuizs);
            }
            else {
                successCallback([]);
            }
        }).catch(failiureCallback);
    }

    const mapToAdminQuiz = async (quizs) => {
        const adminQuizs = [];
        for (let i = 0; i < quizs.length; i++) {
            const quiz = quizs[i];
            const [item] = await api.find("quizList", 'quizId', '==', quiz.key);
            console.log("this is QuisListItem", item);
            quiz.status = item && item.state ? item.state : 'Unassigned';
            adminQuizs.push(quiz);
        }
        return adminQuizs;

    }

    const mapTouserQuiz = async (quizs) => {
        const userQuizs = [];
        for (let i = 0; i < quizs.length; i++) {
            const item = quizs[i];
            const quiz = await api.getDoc("quiz", item.quizId);
            console.log(quiz, item);
            quiz.status = item.state;
            if (quiz) {
                userQuizs.push(quiz);
            }
        }
        return userQuizs;
    }

    const removeQuiz = (quizId) => () => {
        api.remove('quiz', quizId)
            .then(() => {
                const remainingExams = exams.filter(exam => exam.key !== quizId);
                setExams(remainingExams);
            }).catch(err => message.error("Unable to delete exam.Please try later"))
    }

    const openQuizForm = () => {
        window.open(config.addQuizURL)
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const getShareBtn = (record) => {
        return isAdmin && (
            <Button type="link" onClick={loadStudentList(record)}>
                <Icon type="share-alt" />
            </Button>)
    }

    const getDeleteBtn = (record) => {
        return isAdmin && (
            <Button type="link" onClick={removeQuiz(record.key)}>
                <Icon type="delete" />
            </Button>)
    }

    const loadQuiz = (record) => () => {
        console.log(record);
        history.push(`quiz/${record.id}`)
    }

    const loadResult = (record) => async() => {
        
        api.find('userResults', 'quizId', '==', record.id).then((quizs) => {
            const result = quizs.find(quiz => quiz.uid=== user.uid);
            console.log(result);
        });
    }

    const handleDraweClose = () => {
        setShowDrawer(false);
    }

    const getViewBtn = (record) => {
        return isAdmin
            ? <Tooltip placement='bottom' title='View Quiz'>
                <Button type="link" onClick={preview(record)}>
                    <Icon type="eye" />
                </Button>
            </Tooltip>
            : record.status === 'Completed'
                ? <Button type="primary" onClick={loadResult(record)}>
                    View Result
                </Button>
                : <Button type="primary" onClick={loadQuiz(record)}>
                    View Quiz
                </Button>

    }

    const renderStatusTags = (text, record) => {
        switch (text.toLowerCase()) {
            case 'assigned':
                return <Tag color='blue' >{text}</Tag>
            case 'unassigned':
                return <Tag color='orange'>{text}</Tag>
            case 'inprogress':
                return <Tag color='magenta'>{text}</Tag>
            case 'completed':
                return <Tag color='green'>{text}</Tag>

            default:
                return <Tag color='red'>{text}</Tag>
        }
    }

    return (
        <>
            {
                (!isAdmin && !hasViewAccess)
                    ? <><Alert
                        message={`Hello , ${user.displayName}`}
                        description="You Don't have permission to view Exams for now. Please connect to your class Coordinator"
                        type="info"
                    /><Divider>
                        </Divider>
                        <Empty />
                    </>
                    : isReady
                        ? (
                            <>
                                {isAdmin && <div><Button style={{ marginBottom: '1rem' }} type="primary" onClick={openQuizForm}>Add Quiz</Button></div>}
                                <Table dataSource={exams} >
                                    <Column title="Title" dataIndex="quizTitle" key="quizTitle" />
                                    <Column title="Toatal Questions" dataIndex="questions" key="questions" render={(text, record) => (
                                        <Tag>{record.questions.length}</Tag>
                                    )} />
                                    <Column title="Status" dataIndex="status" key="status" render={renderStatusTags} />

                                    <Column
                                        title="Action"
                                        key="action"
                                        render={(text, record) => (
                                            <span>
                                                {getViewBtn(record)}
                                                {getShareBtn(record)}
                                                {getDeleteBtn(record)}
                                            </span>

                                        )}
                                    />
                                </Table>
                            </>

                        )
                        : <Skeleton active />
            }
            <ViewQuestions
                quiz={quiz}
                hideDrawer={closeModal}
                showDrawer={showModal}>
            </ViewQuestions>
            {showDrawer && <AssignQuiz visible={showDrawer} handleClose={handleDraweClose} quiz={quiz}></AssignQuiz>}
        </>

    );
}
export default withRouter(ExamsTable);
