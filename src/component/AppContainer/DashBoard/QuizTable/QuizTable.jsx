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
            ? loadAllQuiz()
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

    const loadAllQuiz = () => {
        api.get("quiz").then(successCallback).catch(failiureCallback);
    }

    const loadUserQuiz = () => {
        api.filter("quizList", user.uid).then(async (quizs) => {
            if (quizs.length > 0) {
                const userQuizs = await mapTouserQuiz(quizs);
                successCallback(userQuizs);
            }
            else {
                successCallback([]);
            }
        }).catch(failiureCallback);
    }

    const mapTouserQuiz = async (quizs)=> {
        const userQuizs = [];
        for (let i = 0; i < quizs.length; i++) {
            const item = quizs[i];
            const quiz = await api.getDoc("quiz", item.quizId);
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
            : <Button type="primary" onClick={loadQuiz(record)}>
                View Quiz
             </Button>
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
                                    <Column title="Topic" dataIndex="quizSynopsis" key="quizSynopsis" />
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
