import React, { useEffect, useState, useContext } from "react";

import { withRouter, RouteComponentProps } from "react-router-dom";
import { Table, Divider, Button, Icon, Skeleton, message, Tooltip, Empty, Alert, Tag } from "antd";

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

const ExamsTable= ({ history }) => {

    const [exams, setExams] = useState([]);

    const [isReady, setIsReady] = useState(false);

    const [showModal, setShowModal] = useState(false);

    const [showDrawer, setShowDrawer] = useState(false);

    const [quiz, setQuiz] = useState(initialQuiz);

    const { isAdmin, hasViewAccess } = useContext(appContext);

    const { user } = useContext(AuthContext);

    useEffect(() => {
        isAdmin
        ? api.get("quiz").then(successCallback).catch(failiureCallback)
        : api.filter("quizList", user.uid).then(successCallback).catch(failiureCallback);
        window.onbeforeunload = function () {
            return "Dude, are you sure you want to leave? Think of the kittens!";
        };
    }, []);

    const preview = (record) => () => {
        setQuiz(record);
        setShowModal(true);
    }

    const loadStudentList = (record) => () => {
        setQuiz(record);
        setShowDrawer(true);
    }

    const successCallback = (exams) => {
        setExams(exams);
        setIsReady(true);
    }

    const failiureCallback = (err) => {
        console.log("Error in Feating Exams :", err);
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
            : <Button type="primary" onClick={() => (history.push("quiz"))}>
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
                                <Table dataSource={exams} scroll={{ y: 400 }} >
                                    <Column title="Title" dataIndex="quizTitle" key="quizTitle" />
                                    <Column title="Toatal Questions" dataIndex="questions" key="questions" render={(text, record) => (
                                        <Tag>{record.questions.length}</Tag>
                                    )} />
                                    <Column title="Topic" dataIndex="quizSynopsis" key="quizSynopsis" />
                                    <Column
                                        title="Status"
                                        key="action"
                                        render={(text, record) => (
                                            <span>
                                                {getViewBtn(record)}
                                                {getShareBtn(record)}
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
            <AssignQuiz visible={showDrawer} handleClose={handleDraweClose} quiz={quiz}></AssignQuiz>
        </>

    );
}
export default withRouter(ExamsTable);
